import { CreatePaste } from "@/server/api/create-paste";

export async function POST(request: Request) {
  return await CreatePaste(request);
}
