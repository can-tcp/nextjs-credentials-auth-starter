import { prisma } from "@/server/db";
import { getServerSideSession } from "../auth/helper";

export async function GetUserPastes() {
  const session = await getServerSideSession();

  const username = session?.user.username ?? "anonymous";

  if (username === "anonymous") {
    return new Response("You are not logged in!");
  }

  const pastes = await prisma.paste.findMany({
    where: {
      user: {
        username: username,
      },
    },
  });

  return new Response(JSON.stringify(pastes));
}
