import SignUp from "@/server/auth/signup";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function SignUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = JSON.parse(req.body);

  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });

  res.status(200).json(await SignUp(username, password));
}
