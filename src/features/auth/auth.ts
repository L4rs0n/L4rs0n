import { APIError, betterAuth } from "better-auth";
import { createAuthMiddleware } from "better-auth/api";
import { prismaAdapter } from "better-auth/adapters/prisma";

import {
  AUTH_PASSWORD_MAX_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
} from "@/features/auth/auth-schema";
import { sendResetPasswordEmail } from "@/features/auth/services/send-reset-password-email";
import {
  assertRegistrationGrantForSignUp,
  consumeRegistrationGrant,
  extractRegistrationTokenFromHeaders,
} from "@/features/members/services/registration-grants";
import { prisma } from "@/lib/db/client";
import { getAuthBootstrapConfig } from "@/server/bootstrap/auth";

const authConfig = getAuthBootstrapConfig();

export const auth = betterAuth({
  appName: authConfig.appName,
  baseURL: authConfig.baseUrl,
  basePath: authConfig.routeBasePath,
  secret: authConfig.secret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  user: {
    additionalFields: {
      memberId: {
        type: "string",
        fieldName: "member_id",
        input: true,
        required: false,
        returned: false,
        unique: true,
      },
    },
  },
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    autoSignIn: true,
    minPasswordLength: AUTH_PASSWORD_MIN_LENGTH,
    maxPasswordLength: AUTH_PASSWORD_MAX_LENGTH,
    resetPasswordTokenExpiresIn: 60 * 60,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendResetPasswordEmail({
        email: user.email,
        resetUrl: url,
      });
    },
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      const body = ctx.body as Record<string, unknown> | undefined;
      const email = typeof body?.email === "string" ? body.email : null;
      const token = ctx.headers
        ? extractRegistrationTokenFromHeaders(ctx.headers)
        : null;

      if (!email || !token) {
        throw new APIError("UNAUTHORIZED", {
          message:
            "Ce lien d'inscription est invalide ou n'autorise plus la creation du compte.",
        });
      }

      const grant = await assertRegistrationGrantForSignUp({
        email,
        token,
      });

      if (!grant) {
        throw new APIError("UNAUTHORIZED", {
          message:
            "Ce lien d'inscription est invalide ou n'autorise plus la creation du compte.",
        });
      }

      return {
        context: {
          ...ctx,
          body: {
            ...body,
            memberId: grant.memberId,
          },
        },
      };
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== "/sign-up/email") {
        return;
      }

      const token = ctx.headers
        ? extractRegistrationTokenFromHeaders(ctx.headers)
        : null;
      const newSession = ctx.context.newSession;

      if (!token || !newSession?.user.email) {
        return;
      }

      await consumeRegistrationGrant({
        email: newSession.user.email,
        token,
      });
    }),
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
});
