import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";

import { getAuthOptions } from "@/server/auth/nextauth";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  /* eslint-disable-next-line */
  return await NextAuth(req, res, getAuthOptions(req, res));
}
