import assert from "node:assert/strict";
import test from "node:test";
import { can, resolveActiveRole, roleHome, ROLES, type Role } from "../policies/roles.ts";
import { AuthorizationError, createAuthorizationService, type AccessRecord, type AuthorizationRepository } from "./authorization.ts";

function fixture(roles: Role[] = ["MEMBER"], activeRole: Role | null = null) {
  let record: AccessRecord | null = {
    id: "session",
    activeRole,
    user: { id: "user", email: "member@example.com", name: "Member", roles },
  };
  const writes: unknown[] = [];
  const repository: AuthorizationRepository = {
    findAccess: async () => record,
    selectRole: async (_, role) => { record!.activeRole = role; writes.push(role); },
    assignRoles: async (id, values) => { writes.push({ id, values }); },
  };
  const service = createAuthorizationService(async () => ({ session: { id: "session" }, user: { id: "user" } }), repository);
  return { service, writes, repository, record: record!, revokeSession: () => { record = null; } };
}

for (const role of ROLES) {
  test(`permission matrix for active ${role}`, () => {
    assert.equal(can(role, "member:access"), role === "MEMBER");
    assert.equal(can(role, "pilotage:access"), role !== "MEMBER");
    assert.equal(can(role, "roles:manage"), role === "ADMIN");
  });
}

test("anonymous and deleted/expired sessions fail closed", async () => {
  const f = fixture();
  const anonymous = createAuthorizationService(async () => null, f.repository);
  await assert.rejects(anonymous.requirePermission("pilotage:access"), { status: 401 });
  f.revokeSession();
  await assert.rejects(f.service.requireContext(), { status: 401 });
});

test("a member cannot read pilotage or invoke privileged mutations directly", async () => {
  const f = fixture();
  await assert.rejects(f.service.requirePermission("pilotage:access"), { status: 403 });
  await assert.rejects(f.service.requirePermission("roles:manage"), { status: 403 });
  await assert.rejects(f.service.assignRoles("user", ["ADMIN"]), { status: 403 });
  await assert.rejects(f.service.selectRole("ADMIN"), { status: 403 });
  await assert.rejects(f.service.selectRole("UNKNOWN"), AuthorizationError);
  assert.deepEqual(f.writes, []);
});

test("multiple assigned roles do not union privileges; switching is explicit", async () => {
  const f = fixture(["ADMIN", "MEMBER"]);
  assert.equal((await f.service.requireContext()).role, "MEMBER");
  await assert.rejects(f.service.assignRoles("other", ["ADMIN"]), { status: 403 });
  await f.service.selectRole("ADMIN");
  assert.equal((await f.service.requirePermission("roles:manage")).role, "ADMIN");
  await assert.rejects(f.service.requirePermission("member:access"), { status: 403 });
  await f.service.selectRole("MEMBER");
  await assert.rejects(f.service.requirePermission("pilotage:access"), { status: 403 });
});

test("each responsible profile enters pilotage but only an active admin assigns roles", async () => {
  for (const role of ROLES.filter((role) => role !== "MEMBER")) {
    const f = fixture([role], role);
    await f.service.requirePermission("pilotage:access");
    if (role !== "ADMIN") {
      await assert.rejects(f.service.assignRoles("other", ["ADMIN"]), { status: 403 });
      assert.deepEqual(f.writes, []);
    }
  }
});

test("revoking a role takes effect on the next operation, without trusting session roles", async () => {
  const f = fixture(["MEMBER", "ADMIN"], "ADMIN");
  await f.service.requirePermission("pilotage:access");
  f.record.user.roles = ["MEMBER"];
  await assert.rejects(f.service.requirePermission("pilotage:access"), { status: 403 });
  await assert.rejects(f.service.assignRoles("other", ["ADMIN"]), { status: 403 });
  await f.service.selectRole("MEMBER");
  await f.service.requirePermission("member:access");
});

test("admin validates catalogue and deduplicates multiple assignments", async () => {
  const f = fixture(["ADMIN"], "ADMIN");
  await assert.rejects(f.service.assignRoles("user", []));
  await assert.rejects(f.service.assignRoles("user", ["SUPERADMIN"]));
  await assert.rejects(f.service.assignRoles("", ["ADMIN"]));
  assert.deepEqual(f.writes, []);
  await f.service.assignRoles("user", ["MEMBER", "COACH", "COACH"]);
  assert.deepEqual(f.writes, [{ id: "user", values: ["MEMBER", "COACH"] }]);
});

test("empty assignments and revoked selections have no privileges or redirect loop", () => {
  assert.equal(resolveActiveRole([], null), null);
  assert.equal(resolveActiveRole(["MEMBER"], "ADMIN"), null);
  assert.equal(roleHome(null), "/acces-refuse");
  assert.equal(roleHome("MEMBER"), "/espace");
  assert.equal(roleHome("COACH"), "/pilotage");
  assert.equal(can(null, "pilotage:access"), false);
});
