import "server-only";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/client";
import { buildSignInHref } from "@/lib/auth/session";
import { getSession } from "@/features/auth/services/get-session";
import { createAuthorizationService, AuthorizationError } from "./authorization";
import { createAuthorizationRepository } from "./authorization-repository";
import type { Permission } from "../policies/roles";

export const authorization = createAuthorizationService(getSession, createAuthorizationRepository(prisma));

export async function withAccessRedirect<T>(operation: () => Promise<T>, callbackUrl: string): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof AuthorizationError) {
      if (error.status === 401) redirect(buildSignInHref(callbackUrl));
      redirect("/acces-refuse");
    }
    throw error;
  }
}

export function requireAccess(permission: Permission, callbackUrl: string) {
  return withAccessRedirect(() => authorization.requirePermission(permission), callbackUrl);
}

export function requireAccessContext(callbackUrl: string) {
  return withAccessRedirect(() => authorization.requireContext(), callbackUrl);
}
