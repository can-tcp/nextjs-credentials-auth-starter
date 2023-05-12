import { CallApiResponse, call } from "@/server/api";
import { Paste } from "@prisma/client";

export interface CreatePastePayload {
  title: string | null;
  content: string;
}

export interface CreatePasteResponse extends CallApiResponse<Paste> {}

export default async function CreatePaste(
  payload: CreatePastePayload
): Promise<CreatePasteResponse> {
  const response = await call<CreatePastePayload, Paste>({
    name: "createPaste",
    payload,
  });

  const { ok } = response;

  if (!ok) {
    console.error("Error creating paste");
    return response;
  }

  return response;
}
