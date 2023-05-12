import { getServerSession, type DefaultSession } from "next-auth";

import crypto from "crypto";
import { env } from "@/util/env.mjs";
import { baseAuthOptions } from "./nextauth";

export const getServerSideSession = async () =>
  await getServerSession(baseAuthOptions);

export function hashPassword(password: string) {
  const iterations = 10000;
  const keyLength = 64;
  const digest = "sha512";

  return crypto
    .pbkdf2Sync(password, env.HASH_PHRASE, iterations, keyLength, digest)
    .toString("hex");
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      // id: string;
      username: string | null;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  interface User {
    // ...other properties
    // role: UserRole;
    username: string | null;
  }
}
