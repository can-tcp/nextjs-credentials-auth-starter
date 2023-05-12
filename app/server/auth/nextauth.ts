import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";

import { type NextAuthOptions } from "next-auth";
import { randomUUID } from "crypto";
import { decode, encode } from "next-auth/jwt";
import {
  DEFAULT_SESSION_MAX_AGE,
  SESSION_TOKEN_COOKIE_NAME,
} from "@/util/constants";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "../providers/credentials";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const baseAuthOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        // id: user.id,
        username: user.username,
      },
    }),
  },
  adapter: PrismaAdapter(prisma),
  providers: [CredentialsProvider],
};

export function getAuthOptions(
  req: NextApiRequest,
  res: NextApiResponse
): NextAuthOptions {
  const authOptionsWithContext: NextAuthOptions = {
    ...baseAuthOptions,
    callbacks: {
      async signIn({ user }) {
        const query = req.query.nextauth;

        const credentialsAuthFlow =
          query?.includes("callback") &&
          query?.includes("credentials") &&
          req.method === "POST";

        if (!credentialsAuthFlow) return true;
        if (!user) return false;

        const sessionToken = generateSessionToken();
        const sessionExpiry = fromDate(
          baseAuthOptions.session?.maxAge || DEFAULT_SESSION_MAX_AGE
        );

        await prisma.session.create({
          data: {
            userId: user.id,
            expires: sessionExpiry,
            sessionToken,
          },
        });

        res.setHeader("Set-Cookie", [
          createSessionTokenCookie(
            sessionToken,
            baseAuthOptions.session?.maxAge || DEFAULT_SESSION_MAX_AGE
          ),
        ]);

        return true;
      },
      session({ session, user }) {
        return {
          ...session,
          user: {
            id: user.id,
            username: user.username,
          },
        };
      },
    },
    jwt: {
      encode: async ({ token, secret, maxAge }) => {
        const query = req.query.nextauth;

        const credentialsCallback =
          query?.includes("callback") &&
          query?.includes("credentials") &&
          req.method === "POST";

        if (!credentialsCallback) {
          return await encode({ token, secret, maxAge });
        }

        const sessionToken = getSessionToken(req);

        if (!sessionToken) return "";

        return sessionToken;
      },
      decode: async ({ token, secret }) => {
        const query = req.query.nextauth;

        const credentialsCallback =
          query?.includes("callback") &&
          query?.includes("credentials") &&
          req.method === "POST";

        if (credentialsCallback) return null;

        return await decode({ token, secret });
      },
    },
  };

  return authOptionsWithContext;
}

const generateSessionToken = () => {
  return randomUUID();
};

const fromDate = (time: number, date = Date.now()) => {
  return new Date(date + time * 1000);
};

function getSessionToken(req: NextApiRequest) {
  const cookie = req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith(SESSION_TOKEN_COOKIE_NAME));

  return cookie?.split("=")[1];
}

function createSessionTokenCookie(token: string, maxAge: number) {
  return `${SESSION_TOKEN_COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Secure; Expires=${fromDate(
    maxAge
  ).toUTCString()}`;
}
