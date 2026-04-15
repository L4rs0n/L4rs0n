import test from "node:test";
import assert from "node:assert/strict";

import {
  DEFAULT_AUTHENTICATED_PATH,
  buildSignInHref,
  resolvePostAuthRedirect,
  sanitizeCallbackUrl,
} from "./session.ts";

test("sanitizeCallbackUrl keeps internal callback paths", () => {
  assert.equal(
    sanitizeCallbackUrl("/pilotage?tab=overview"),
    "/pilotage?tab=overview",
  );
});

test("sanitizeCallbackUrl rejects public auth loops", () => {
  assert.equal(sanitizeCallbackUrl("/sign-in"), null);
  assert.equal(sanitizeCallbackUrl("/forgot-password"), null);
});

test("sanitizeCallbackUrl accepts same-origin absolute URLs only", () => {
  assert.equal(
    sanitizeCallbackUrl(
      "https://club.local/espace?from=mail",
      "https://club.local",
    ),
    "/espace?from=mail",
  );
  assert.equal(
    sanitizeCallbackUrl(
      "https://attacker.example/steal",
      "https://club.local",
    ),
    null,
  );
});

test("resolvePostAuthRedirect falls back to default member path", () => {
  assert.equal(resolvePostAuthRedirect(undefined), DEFAULT_AUTHENTICATED_PATH);
  assert.equal(
    resolvePostAuthRedirect("/sign-in"),
    DEFAULT_AUTHENTICATED_PATH,
  );
});

test("buildSignInHref encodes safe callback targets only", () => {
  assert.equal(buildSignInHref("/pilotage"), "/sign-in?callbackURL=%2Fpilotage");
  assert.equal(buildSignInHref("https://attacker.example"), "/sign-in");
});
