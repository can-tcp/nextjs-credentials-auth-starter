import { GetUserPastes } from "@/server/api/get-user-pastes";

export async function GET() {
  return await GetUserPastes();
}
