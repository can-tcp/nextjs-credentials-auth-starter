import { env } from "./env.mjs";

export const THIRTY_DAYS_IN_SECS = 60 * 60 * 24 * 30;

export const DEFAULT_SESSION_MAX_AGE = THIRTY_DAYS_IN_SECS;

export const BASE_URL =
  (env.VERCEL_URL && `https://${env.VERCEL_URL}`) || env.NEXTAUTH_URL;

export const SITE_SECURE = BASE_URL.startsWith("https");

const SECURE_COOKIE_PREFIX = "__Secure-";

export const SESSION_TOKEN_COOKIE_NAME = `${
  SITE_SECURE ? SECURE_COOKIE_PREFIX : ""
}next-auth.session-token`;
