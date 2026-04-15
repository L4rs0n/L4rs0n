import { logger } from "@/lib/logging/logger";

type ResetPasswordEmailInput = {
  email: string;
  resetUrl: string;
};

export async function sendResetPasswordEmail({
  email,
  resetUrl,
}: ResetPasswordEmailInput): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    logger.info("Reset password link generated for local development", {
      email,
      resetUrl,
    });

    return;
  }

  logger.warn("Reset password email requested without configured provider", {
    email,
  });
}
