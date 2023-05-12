import { getServerSideSession } from "@/server/auth/helper";
import { prisma } from "@/server/db";
import { Paste } from "@prisma/client";

export async function CreatePaste(request: Request) {
  const session = await getServerSideSession();

  const username = session?.user.username ?? "anonymous";

  if (username === "anonymous") {
    return new Response("You are not logged in!");
  }

  const body = await request.json();

  const { title, content } = body;

  if (!content) {
    // return with error code and message
    return new Response("No content provided!", {
      status: 400,
    });
  }

  const generateSlug = () => {
    const characters = "abdefghrt23456789";

    let slug = "";
    for (let i = 0; i < 6; i++) {
      slug += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return slug;
  };

  const createPasteWithUniqueSlug = async (
    title: string,
    content: string,
    username: string
  ): Promise<Paste> => {
    const slug = generateSlug();

    try {
      const paste = await prisma.paste.create({
        data: {
          title,
          content,
          slug,
          user: {
            connect: {
              username: username,
            },
          },
        },
      });

      return paste;
    } catch (error: any) {
      if (error.code === "P2002" && error.meta.target.includes("slug")) {
        // If the error is due to a duplicate slug, try again
        return createPasteWithUniqueSlug(title, content, username);
      }

      throw error;
    }
  };

  return new Response(
    JSON.stringify(await createPasteWithUniqueSlug(title, content, username))
  );
}
