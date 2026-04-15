import { headers } from "next/headers";

import { auth } from "@/features/auth/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export type AuthSession = NonNullable<Awaited<ReturnType<typeof getSession>>>;
