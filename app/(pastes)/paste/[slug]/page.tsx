import { prisma } from "@/server/db";
import React from "react";

interface PasteViewPageProps {
  params: {
    slug: string;
  };
}

export default async function PasteViewPage({ params }: PasteViewPageProps) {
  const { slug } = params;

  const paste = await prisma.paste.findUnique({
    where: {
      slug,
    },
  });

  if (!paste) {
    return <div>Paste not found</div>;
  }

  return paste.content;
}
