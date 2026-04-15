import { loadServerEnv } from "@/lib/env/server";

export type AuthBootstrapConfig = {
  baseUrl: string;
  secret: string;
  routeBasePath: "/api/auth";
};

export function getAuthBootstrapConfig(): AuthBootstrapConfig {
  const env = loadServerEnv();

  return {
    baseUrl: env.BETTER_AUTH_URL,
    secret: env.BETTER_AUTH_SECRET,
    routeBasePath: "/api/auth",
  };
}
