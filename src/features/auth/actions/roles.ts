"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { authorization, withAccessRedirect } from "@/features/auth/services/access";
import { RoleAssignmentError } from "@/features/auth/services/authorization";
import { roleHome } from "@/features/auth/policies/roles";

export async function switchRole(formData: FormData) {
  const role = await withAccessRedirect(
    () => authorization.selectRole(formData.get("role")),
    "/espace",
  );
  revalidatePath("/", "layout");
  redirect(roleHome(role));
}

export async function assignRoles(formData: FormData) {
  const userId = formData.get("userId");
  try {
    await withAccessRedirect(
      () => authorization.assignRoles(typeof userId === "string" ? userId : "", formData.getAll("roles")),
      "/pilotage/roles",
    );
  } catch (error) {
    if (error instanceof RoleAssignmentError) redirect("/pilotage/roles?error=invalid-roles");
    throw error;
  }
  revalidatePath("/", "layout");
  redirect("/pilotage/roles?updated=1");
}
