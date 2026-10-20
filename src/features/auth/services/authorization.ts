import { can, isRole, resolveActiveRole, type Permission, type Role } from "../policies/roles.ts";

export class AuthorizationError extends Error {
  constructor(public readonly status: 401 | 403, message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class RoleAssignmentError extends Error {}

export type SessionIdentity = { session: { id: string }; user: { id: string } };
export type AccessRecord = {
  id: string;
  activeRole: Role | null;
  user: { id: string; name: string; email: string; roles: Role[] };
};
export type AccessContext = AccessRecord & { role: Role | null };

export type AuthorizationRepository = {
  findAccess: (identity: SessionIdentity) => Promise<AccessRecord | null>;
  selectRole: (context: AccessContext, role: Role) => Promise<void>;
  assignRoles: (userId: string, roles: Role[]) => Promise<void>;
};

// Shared entry point for pages, actions and future route handlers. No trust in
// roles from cookies, form fields or Better Auth's cached user payload.
export function createAuthorizationService(
  getSession: () => Promise<SessionIdentity | null>,
  repository: AuthorizationRepository,
) {
  async function requireContext(): Promise<AccessContext> {
    const identity = await getSession();
    if (!identity) throw new AuthorizationError(401, "Connexion requise.");
    const access = await repository.findAccess(identity);
    if (!access) throw new AuthorizationError(401, "Session expirée ou révoquée.");
    return { ...access, role: resolveActiveRole(access.user.roles, access.activeRole) };
  }

  async function requirePermission(permission: Permission) {
    const context = await requireContext();
    if (!can(context.role, permission)) {
      throw new AuthorizationError(403, "Vous ne disposez pas des droits nécessaires.");
    }
    return context;
  }

  return {
    requireContext,
    requirePermission,
    async selectRole(value: unknown) {
      const context = await requireContext();
      if (!isRole(value) || !context.user.roles.includes(value)) {
        throw new AuthorizationError(403, "Ce rôle ne vous est pas attribué.");
      }
      await repository.selectRole(context, value);
      return value;
    },
    async assignRoles(userId: string, values: unknown[]) {
      // Guard the operation itself, independently of its calling page.
      await requirePermission("roles:manage");
      if (!userId || values.length === 0 || !values.every(isRole)) {
        throw new RoleAssignmentError("Utilisateur et rôles configurés obligatoires.");
      }
      await repository.assignRoles(userId, [...new Set(values as Role[])]);
    },
  };
}
