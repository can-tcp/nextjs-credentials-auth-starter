import { CallApiResponse, call } from "@/server/api";
import { User } from "@prisma/client";

export interface SignUpUserPayload {
  username: string;
  password: string;
}

type Result = Pick<User, "id" | "username">;

export interface SignUpUserResponse extends CallApiResponse<Result> {}

export default async function SignUpUser(
  payload: SignUpUserPayload
): Promise<SignUpUserResponse> {
  const response = await call<SignUpUserPayload, Result>({
    name: "signUpUser",
    payload,
  });

  const { ok } = response;

  if (!ok) {
    console.error("Error signing up user");
    return response;
  }

  return response;
}
