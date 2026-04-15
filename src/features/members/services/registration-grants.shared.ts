import { createHash, randomBytes } from "node:crypto";

const REGISTRATION_TOKEN_BYTES = 32;

export const REGISTRATION_TOKEN_HEADER = "x-l4rs0n-registration-token";

export function createRegistrationToken() {
  return randomBytes(REGISTRATION_TOKEN_BYTES).toString("hex");
}

export function normalizeRegistrationEmail(email: string) {
  return email.trim().toLowerCase();
}

export function normalizeRegistrationToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const normalizedToken = token.trim().toLowerCase();

  if (!/^[a-f0-9]{32,128}$/.test(normalizedToken)) {
    return null;
  }

  return normalizedToken;
}

export function hashRegistrationToken(token: string) {
  return createHash("sha256")
    .update(token, "utf8")
    .digest("hex");
}
