import test from "node:test";
import assert from "node:assert/strict";

import {
  AUTH_PASSWORD_MIN_LENGTH,
  forgotPasswordSchema,
  registerSchema,
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

test("registerSchema validates token, password strength and confirmation", () => {
  const parsed = registerSchema.parse({
    confirmPassword: "strong-password-123",
    email: "member@example.com",
    name: "Alex Martin",
    password: "strong-password-123",
    token: "a".repeat(64),
  });

  assert.equal(parsed.email, "member@example.com");
  assert.equal(parsed.name, "Alex Martin");

  assert.throws(() => {
    registerSchema.parse({
      confirmPassword: "different-password",
      email: "member@example.com",
      name: "Alex Martin",
      password: "strong-password-123",
      token: "invalid token",
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
