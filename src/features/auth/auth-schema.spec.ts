import test from "node:test";
import assert from "node:assert/strict";

import {
  AUTH_PASSWORD_MIN_LENGTH,
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
} from "./auth-schema.ts";

test("signInSchema accepts valid credentials", () => {
  const parsed = signInSchema.parse({
    email: "member@example.com",
    password: "secret-pass-123",
  });

  assert.equal(parsed.email, "member@example.com");
});

test("forgotPasswordSchema rejects malformed emails", () => {
  assert.throws(() => {
    forgotPasswordSchema.parse({
      email: "not-an-email",
    });
  });
});

test("resetPasswordSchema enforces minimum length and confirmation", () => {
  assert.throws(() => {
    resetPasswordSchema.parse({
      token: "token",
      newPassword: "short",
      confirmPassword: "short",
    });
  }, new RegExp(`${AUTH_PASSWORD_MIN_LENGTH}`));

  assert.throws(() => {
    resetPasswordSchema.parse({
      token: "token",
      newPassword: "long-enough-password",
      confirmPassword: "different-password",
    });
  }, /correspondent pas/);
});
