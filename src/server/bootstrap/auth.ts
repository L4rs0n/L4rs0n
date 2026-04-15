import { loadServerEnv } from "@/lib/env/server";

export type AuthBootstrapConfig = {
  appName: string;
  baseUrl: string;
  secret: string;
  routeBasePath: "/api/auth";
  resetPasswordPath: "/reset-password";
};

export function getAuthBootstrapConfig(): AuthBootstrapConfig {
  const env = loadServerEnv();

  return {
    appName: env.CLUB_NAME,
    baseUrl: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    routeBasePath: "/api/auth",
    resetPasswordPath: "/reset-password",
  };
}
