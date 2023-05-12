import SignUp from "@/api/signup";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function SignUpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body; /* eslint-disable-line */

  if (!username || !password)
    return res.status(400).json({ error: "Missing username or password" });

  res
    .status(200)
    .json(await SignUp(username, password)); /* eslint-disable-line */
}
