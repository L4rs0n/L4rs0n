import { readdir, readFile } from "node:fs/promises";
import pg from "pg";
import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { spawn, type ChildProcess } from "node:child_process";
import { randomUUID, createHash } from "node:crypto";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { createAuthorizationService } from "../src/features/auth/services/authorization.ts";
import { createAuthorizationRepository } from "../src/features/auth/services/authorization-repository.ts";

// Only runs explicitly against a dedicated, migrated test database.
const databaseUrl = process.env.TEST_DATABASE_URL;
if (!databaseUrl) throw new Error("TEST_DATABASE_URL est obligatoire (base de test dédiée et migrée).");
const db = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });
const origin = `http://127.0.0.1:${process.env.TEST_PORT ?? "3100"}`;
const suffix = randomUUID();
const email = `rbac-${suffix}@example.com`;
const password = "Test-password-rbac-2026!";
const token = randomUUID().replaceAll("-", "").repeat(2);
let server: ChildProcess;
let logs = "";
let cookie = "";
let userId = "";
let memberId = "";

function request(path: string, init: RequestInit = {}) {
  return fetch(`${origin}${path}`, {
    ...init,
    headers: { cookie, origin, ...init.headers },
    redirect: "manual",
  });
}

before(async () => {
  const member = await db.member.create({ data: { email, firstName: "RBAC", lastName: suffix } });
  memberId = member.id;
  await db.registrationGrant.create({ data: {
    memberId, email, tokenHash: createHash("sha256").update(token).digest("hex"),
    type: "INVITATION", expiresAt: new Date(Date.now() + 3600000),
  } });
  server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--hostname", "127.0.0.1", "--port", new URL(origin).port], {
    env: {
      ...process.env, DATABASE_URL: databaseUrl, APP_BASE_URL: origin, BETTER_AUTH_URL: origin,
      BETTER_AUTH_SECRET: "rbac-test-secret-with-at-least-32-characters", CLUB_NAME: "L4rs0n", SMTP_FROM: "noreply@example.com",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout?.on("data", (chunk) => { logs += chunk; });
  server.stderr?.on("data", (chunk) => { logs += chunk; });
  for (let attempt = 0; attempt < 120; attempt++) {
    if (server.exitCode !== null) throw new Error(logs);
    try { if ((await request("/api/health")).ok) return; } catch { /* starting */ }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Serveur indisponible : ${logs}`);
});

after(async () => {
  server?.kill("SIGTERM");
  if (server && server.exitCode === null) await new Promise((resolve) => server.once("exit", resolve));
  await db.user.deleteMany({ where: { email } });
  if (memberId) await db.member.delete({ where: { id: memberId } });
  await db.$disconnect();
});

function actionForm(html: string, field: string, value?: string) {
  const form = [...html.matchAll(/<form\b[^>]*>[\s\S]*?<\/form>/g)].map((m) => m[0]).find((form) =>
    form.includes(`name="${field}"`) && (!value || form.includes(`value="${value}"`)),
  );
  assert.ok(form, `Formulaire ${field} introuvable`);
  const id = form.match(/name="(\$ACTION_ID_[^"]+)"/);
  assert.ok(id, "Identifiant de Server Action introuvable");
  const data = new FormData();
  data.set(id[1], "");
  return data;
}

async function switchRole(role: string, page = "/espace") {
  const html = await (await request(page)).text();
  const data = actionForm(html, "role", role);
  data.set("role", role);
  return request(page, { method: "POST", body: data });
}

test("anonymous pilotage access keeps the sign-in callback", async () => {
  const response = await request("/pilotage");
  assert.equal(response.status, 307);
  assert.equal(response.headers.get("location"), "/sign-in?callbackURL=%2Fpilotage");
});

test("invitation sign-up ignores injected roles and preserves member linkage", async () => {
  const response = await request("/api/auth/sign-up/email", {
    method: "POST",
    headers: { "content-type": "application/json", "x-l4rs0n-registration-token": token },
    body: JSON.stringify({ email, password, name: "RBAC test", roles: ["ADMIN"], activeRole: "ADMIN", memberId: "forged-member" }),
  });
  assert.equal(response.status, 200, `${await response.clone().text()}\n${logs}`);
  const user = await db.user.findUniqueOrThrow({ where: { email } });
  userId = user.id;
  assert.equal(user.memberId, memberId);
  assert.deepEqual(user.roles, ["MEMBER"]);
  // Production cookies are secure: supply them explicitly to our HTTP test client.
  cookie = response.headers.getSetCookie().map((value) => value.split(";", 1)[0]).join("; ");
  assert.ok(cookie);
  assert.equal((await request("/espace")).status, 200);
  assert.equal((await db.registrationGrant.findFirstOrThrow({ where: { memberId } })).status, "CONSUMED");
});

test("member is denied on pilotage, nested role management and direct mutation", async () => {
  for (const path of ["/pilotage", "/pilotage/roles"]) {
    const response = await request(path);
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "/acces-refuse");
  }
  const html = await (await request("/espace")).text();
  assert.ok(!html.includes('href="/pilotage"'));
  const data = actionForm(html, "role", "MEMBER");
  data.set("role", "ADMIN");
  assert.equal((await request("/espace", { method: "POST", body: data })).headers.get("location"), "/acces-refuse");
});

test("multi-role switching persists per session; admin action independently rejects members", async () => {
  await db.user.update({ where: { id: userId }, data: { roles: ["MEMBER", "ADMIN"] } });
  assert.equal((await request("/pilotage")).headers.get("location"), "/acces-refuse");
  assert.equal((await switchRole("ADMIN")).headers.get("location"), "/pilotage");
  assert.equal((await request("/pilotage")).status, 200);
  const html = await (await request("/pilotage/roles")).text();
  const data = actionForm(html, "userId");
  data.set("userId", userId);
  data.set("roles", "ADMIN");
  await switchRole("MEMBER", "/pilotage");
  const response = await request("/pilotage/roles", { method: "POST", body: data });
  assert.equal(response.headers.get("location"), "/acces-refuse");
  assert.deepEqual((await db.user.findUniqueOrThrow({ where: { id: userId } })).roles, ["MEMBER", "ADMIN"]);
  await switchRole("ADMIN");
  const adminResult = await request("/pilotage/roles", { method: "POST", body: data });
  assert.equal(adminResult.headers.get("location"), "/pilotage/roles?updated=1");
  assert.deepEqual((await db.user.findUniqueOrThrow({ where: { id: userId } })).roles, ["ADMIN"]);
});

test("revocation bypasses Better Auth cookie cache; other sessions remain independent", async () => {
  const session = await db.session.findFirstOrThrow({ where: { userId } });
  const second = await db.session.create({ data: { userId, token: randomUUID(), expiresAt: new Date(Date.now() + 3600000) } });
  await db.user.update({ where: { id: userId }, data: { roles: ["MEMBER", "ADMIN"] } });
  const secondService = createAuthorizationService(async () => ({ session: { id: second.id }, user: { id: userId } }), createAuthorizationRepository(db));
  assert.equal((await secondService.requireContext()).role, "MEMBER");
  assert.equal((await db.session.findUniqueOrThrow({ where: { id: session.id } })).activeRole, "ADMIN");
  await db.user.update({ where: { id: userId }, data: { roles: ["MEMBER"] } });
  assert.equal((await request("/pilotage")).headers.get("location"), "/acces-refuse");
  await db.session.update({ where: { id: session.id }, data: { expiresAt: new Date(0) } });
  assert.equal((await request("/espace")).headers.get("location"), "/sign-in?callbackURL=%2Fespace");
});

test("email/password sign-in still creates a member session; sign-out invalidates it", async () => {
  cookie = "";
  const response = await request("/api/auth/sign-in/email", {
    method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, password }),
  });
  assert.equal(response.status, 200, `${await response.clone().text()}\n${logs}`);
  cookie = response.headers.getSetCookie().map((value) => value.split(";", 1)[0]).join("; ");
  assert.equal((await request("/espace")).status, 200);
  const signOut = await request("/api/auth/sign-out", { method: "POST", headers: { "content-type": "application/json" }, body: "{}" });
  assert.equal(signOut.status, 200);
  assert.equal((await request("/espace")).headers.get("location"), "/sign-in?callbackURL=%2Fespace");
});


test("migration backfills only MEMBER and preserves existing account/session data", async () => {
  const client = new pg.Client({ connectionString: databaseUrl });
  const schema = `rbac_${randomUUID().replaceAll("-", "")}`;
  await client.connect();
  try {
    await client.query(`CREATE SCHEMA "${schema}"`);
    await client.query(`SET search_path TO "${schema}"`);
    const migrations = (await readdir("prisma/migrations")).filter((name) => /^\d/.test(name)).sort();
    for (const migration of migrations) {
      if (migration === "20261020140000_add_user_roles") {
        await client.query(`INSERT INTO users (id, email, name, updated_at) VALUES ('legacy', 'legacy@example.com', 'Legacy', now())`);
        await client.query(`INSERT INTO sessions (id, user_id, token, expires_at, updated_at) VALUES ('legacy-session', 'legacy', 'legacy-token', now() + interval '1 day', now())`);
      }
      await client.query(await readFile(`prisma/migrations/${migration}/migration.sql`, "utf8"));
    }
    const result = await client.query(`SELECT u.roles::text AS roles, s.active_role, s.token FROM users u JOIN sessions s ON s.user_id = u.id WHERE u.id = 'legacy'`);
    assert.deepEqual(result.rows, [{ roles: "{MEMBER}", active_role: null, token: "legacy-token" }]);
  } finally {
    await client.query(`DROP SCHEMA "${schema}" CASCADE`);
    await client.end();
  }
});
