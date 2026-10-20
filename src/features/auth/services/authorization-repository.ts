import type { PrismaClient } from "@prisma/client";
import type { AuthorizationRepository } from "./authorization.ts";

export function createAuthorizationRepository(db: PrismaClient): AuthorizationRepository {
  return {
    findAccess(identity) {
      return db.session.findFirst({
        where: {
          id: identity.session.id,
          userId: identity.user.id,
          expiresAt: { gt: new Date() },
        },
        select: {
          id: true,
          activeRole: true,
          user: { select: { id: true, name: true, email: true, roles: true } },
        },
      });
    },
    async selectRole(context, role) {
      // Recheck membership at write time, including concurrent revocations.
      const result = await db.session.updateMany({
        where: {
          id: context.id,
          userId: context.user.id,
          expiresAt: { gt: new Date() },
          user: { roles: { has: role } },
        },
        data: { activeRole: role },
      });
      if (result.count !== 1) throw new Error("Session ou rôle révoqué.");
    },
    async assignRoles(userId, roles) {
      await db.user.update({ where: { id: userId }, data: { roles } });
    },
  };
}
