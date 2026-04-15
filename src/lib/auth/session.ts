export const DEFAULT_AUTHENTICATED_PATH = "/espace";
export const SIGN_IN_PATH = "/sign-in";

const AUTH_PUBLIC_PATHS = new Set([
  SIGN_IN_PATH,
  "/forgot-password",
  "/reset-password",
]);

function normalizeInternalPath(value: string): string | null {
  if (!value.startsWith("/")) {
    return null;
  }

  try {
    const url = new URL(value, "http://localhost");
    if (AUTH_PUBLIC_PATHS.has(url.pathname)) {
      return null;
    }

    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export function sanitizeCallbackUrl(
  callbackUrl?: string | null,
  origin?: string,
): string | null {
  if (!callbackUrl) {
    return null;
  }

  if (callbackUrl.startsWith("/")) {
    return normalizeInternalPath(callbackUrl);
  }

  if (!origin) {
    return null;
  }

  try {
    const base = new URL(origin);
    const candidate = new URL(callbackUrl);

    if (candidate.origin !== base.origin) {
      return null;
    }

    return normalizeInternalPath(
      `${candidate.pathname}${candidate.search}${candidate.hash}`,
    );
  } catch {
    return null;
  }
}

export function resolvePostAuthRedirect(
  callbackUrl?: string | null,
  origin?: string,
): string {
  return sanitizeCallbackUrl(callbackUrl, origin) ?? DEFAULT_AUTHENTICATED_PATH;
}

export function buildSignInHref(
  callbackUrl?: string | null,
  origin?: string,
): string {
  const safeCallbackUrl = sanitizeCallbackUrl(callbackUrl, origin);

  if (!safeCallbackUrl) {
    return SIGN_IN_PATH;
  }

  const params = new URLSearchParams({
    callbackURL: safeCallbackUrl,
  });

  return `${SIGN_IN_PATH}?${params.toString()}`;
}
