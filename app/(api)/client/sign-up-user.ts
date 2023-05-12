import { ApiResponse, call } from "@/server/api";
import { User } from "@prisma/client";

export interface SignUpUserPayload {
  username: string;
  password: string;
}

type Result = Pick<User, "id" | "username">;

export interface SignUpUserResponse extends ApiResponse<Result> {}

export default async function SignUpUser(
  payload: SignUpUserPayload
): Promise<SignUpUserResponse> {
  return await call<SignUpUserPayload, Result>({
    endpoint: "signUpUser",
    payload,
  });
}
