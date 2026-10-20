export const ROLES = ["MEMBER", "ADMIN", "TREASURER", "EVENT_MANAGER", "COACH"] as const;
export type Role = (typeof ROLES)[number];
export type Permission = "member:access" | "pilotage:access" | "roles:manage";

export const ROLE_LABELS: Record<Role, string> = {
  MEMBER: "Adhérent",
  ADMIN: "Administrateur",
  TREASURER: "Trésorier / responsable budget",
  EVENT_MANAGER: "Responsable événements",
  COACH: "Coach / responsable d’activité",
};

const PERMISSIONS: Record<Role, readonly Permission[]> = {
  MEMBER: ["member:access"],
  ADMIN: ["pilotage:access", "roles:manage"],
  TREASURER: ["pilotage:access"],
  EVENT_MANAGER: ["pilotage:access"],
  COACH: ["pilotage:access"],
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && ROLES.some((role) => role === value);
}

export function can(activeRole: Role | null, permission: Permission): boolean {
  return activeRole !== null && isRole(activeRole) && PERMISSIONS[activeRole].includes(permission);
}

export function roleHome(role: Role | null): string {
  if (can(role, "member:access")) return "/espace";
  if (can(role, "pilotage:access")) return "/pilotage";
  return "/acces-refuse";
}

export function resolveActiveRole(roles: readonly Role[], selected: Role | null): Role | null {
  // Revoked explicit selections never inherit another role's privileges.
  if (selected !== null) return roles.includes(selected) ? selected : null;
  return ROLES.find((role) => roles.includes(role)) ?? null;
}
