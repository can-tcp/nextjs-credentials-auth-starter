import CreatePaste, {
  CreatePastePayload,
  CreatePasteResponse,
} from "./create-paste";
import GetUserPastes, {
  GetUserPastesPayload,
  GetUserPastesResponse,
} from "./get-pastes-for-user";
import SignUpUser, {
  SignUpUserPayload,
  SignUpUserResponse,
} from "./sign-up-user";

interface ApiEndpoint<Payload, Response> {
  action: (payload: Payload) => Promise<Response>;
  method: "GET" | "POST";
  path: string;
  headers?: Record<string, string>;
}

interface ClientApi {
  createPaste: ApiEndpoint<CreatePastePayload, CreatePasteResponse>;
  getUserPastes: ApiEndpoint<GetUserPastesPayload, GetUserPastesResponse>;
  signUpUser: ApiEndpoint<SignUpUserPayload, SignUpUserResponse>;
}

const ClientApi: ClientApi = {
  createPaste: {
    action: CreatePaste,
    method: "POST",
    path: "/api/pastes/create",
  },
  getUserPastes: {
    action: GetUserPastes,
    method: "GET",
    path: "/api/pastes/get/:username",
  },
  signUpUser: {
    action: SignUpUser,
    method: "POST",
    path: "/api/auth/signup",
  },
} as const;

export type ApiEndpointName = keyof ClientApi;

export default ClientApi;
