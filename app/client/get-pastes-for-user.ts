import { CallApiResponse, call } from "@/server/api";
import { Paste } from "@prisma/client";

export interface GetUserPastesPayload {
  username: string;
}
type Result = Paste[];

export interface GetUserPastesResponse extends CallApiResponse<Result> {}

export default async function GetUserPastes(
  payload: GetUserPastesPayload
): Promise<GetUserPastesResponse> {
  const response = await call<GetUserPastesPayload, Result>({
    name: "getUserPastes",
    segments: {
      username: payload.username,
    },
  });

  if (!response.ok) {
    console.error("Error retrieving user pastes");
    return response;
  }

  return response;
}
