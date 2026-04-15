import assert from "node:assert/strict";
import test from "node:test";

import { loadServerEnv } from "./server.ts";

const validEnv: NodeJS.ProcessEnv = {
  APP_BASE_URL: "http://localhost:3000",
  BETTER_AUTH_SECRET: "test-secret-value-with-at-least-32-characters",
  BETTER_AUTH_URL: "http://localhost:3000",
  CLUB_NAME: "L4rs0n",
  DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/l4rs0n",
  NODE_ENV: "test",
  SMTP_FROM: "noreply@example.com",
};

test("loadServerEnv accepts a fully configured environment", () => {
  const parsed = loadServerEnv(validEnv);

  assert.equal(parsed.CLUB_NAME, "L4rs0n");
  assert.equal(parsed.APP_BASE_URL, "http://localhost:3000");
});

test("loadServerEnv rejects missing required variables", () => {
  assert.throws(
    () =>
      loadServerEnv({
        ...validEnv,
        BETTER_AUTH_SECRET: undefined,
      }),
    /BETTER_AUTH_SECRET/,
  );
});

test("loadServerEnv rejects the example Better Auth placeholder", () => {
  assert.throws(
    () =>
      loadServerEnv({
        ...validEnv,
        BETTER_AUTH_SECRET: "replace-with-at-least-32-random-characters",
      }),
    /vraie valeur secrete/,
  );
});
