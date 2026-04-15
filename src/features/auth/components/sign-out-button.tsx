"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { authClient } from "@/features/auth/auth-client";

export function SignOutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    setError(null);

    startTransition(async () => {
      const { error: signOutError } = await authClient.signOut();

      if (signOutError) {
        setError(
          signOutError.message ??
            "La deconnexion a echoue. Reessayez dans un instant.",
        );
        return;
      }

      router.replace("/sign-in");
      router.refresh();
    });
  }

  return (
    <div className="space-y-3">
      <button
        className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-border bg-white px-5 py-3 text-base font-semibold text-primary-strong transition hover:bg-surface-contrast disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isPending}
        onClick={handleClick}
        type="button"
      >
        {isPending ? "Deconnexion..." : "Se deconnecter"}
      </button>
      {error ? (
        <p className="text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
