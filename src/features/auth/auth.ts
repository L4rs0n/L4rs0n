import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import {
  AUTH_PASSWORD_MAX_LENGTH,
  AUTH_PASSWORD_MIN_LENGTH,
} from "@/features/auth/auth-schema";
import { sendResetPasswordEmail } from "@/features/auth/services/send-reset-password-email";
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
  advanced: {
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: true,
    autoSignIn: false,
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
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },
});
