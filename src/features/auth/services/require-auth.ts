import { redirect } from "next/navigation";

import { buildSignInHref } from "@/lib/auth/session";
import { getSession } from "@/features/auth/services/get-session";

export async function requireAuth(callbackUrl?: string) {
  const session = await getSession();

  if (!session) {
    redirect(buildSignInHref(callbackUrl));
  }

  return session;
}
