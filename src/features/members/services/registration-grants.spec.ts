import assert from "node:assert/strict";
import test from "node:test";

import {
  hashRegistrationToken,
  normalizeRegistrationEmail,
  normalizeRegistrationToken,
} from "./registration-grants.shared.ts";

test("normalizeRegistrationEmail trims and lowercases addresses", () => {
  assert.equal(
    normalizeRegistrationEmail("  Member@Example.com "),
    "member@example.com",
  );
});

test("normalizeRegistrationToken accepts hex tokens only", () => {
  const token = "a".repeat(64);

  assert.equal(normalizeRegistrationToken(token), token);
  assert.equal(normalizeRegistrationToken("not a token"), null);
});

test("hashRegistrationToken is deterministic", () => {
  const token = "b".repeat(64);

  assert.equal(hashRegistrationToken(token), hashRegistrationToken(token));
  assert.notEqual(hashRegistrationToken(token), token);
});
