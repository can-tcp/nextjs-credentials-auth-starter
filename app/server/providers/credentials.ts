import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../db";
import { hashPassword } from "../auth/helper";

const credentialsProvider = CredentialsProvider({
  name: "Credentials",
  credentials: {
    username: { label: "Username", type: "text", placeholder: "Username" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials) {
    if (!credentials?.username || !credentials?.password) {
      return null;
    }

    const { username, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user || !user.password) {
      return null;
    }

    const isPasswordCorrect = user.password === hashPassword(password);

    if (!isPasswordCorrect) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
    };
  },
});

export default credentialsProvider;
