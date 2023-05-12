import { randomUUID } from "crypto";
import { hashPassword } from "./helper";
import { prisma } from "../db";

export default async function SignUp(username: string, password: string) {
  const createUserPayload = {
    name: username,
    username: username,
    password: hashPassword(password),
    email: randomUUID(),
  };

  const user = await prisma.user.create({
    data: {
      ...createUserPayload,
      preferences: {
        create: {
          theme: "light",
          language: "en",
        },
      },
    },
  });

  const { id: userId } = user;

  const createAccountPayload = {
    userId: userId,
    type: "credentials",
    provider: "credentials",
    providerAccountId: userId,
  };

  await prisma.account.create({
    data: createAccountPayload,
  });

  return {
    id: userId,
    username: user.username,
  };
}
