import SignUpUser, {
  SignUpUserPayload,
  SignUpUserResponse,
} from "./sign-up-user";

// interface ApiEndpoint<Payload, Response> {
//   action: (payload: Payload) => Promise<Response>;
//   method: "GET" | "POST";
//   path: string;
//   headers?: Record<string, string>;
// }

interface ClientApi {
  signUpUser: (payload: SignUpUserPayload) => Promise<SignUpUserResponse>;
}

const ClientApi: ClientApi = {
  signUpUser: SignUpUser,
  // signUpUser: {
  //   action: SignUpUser,
  //   method: "POST",
  //   path: "/api/auth/signup",
  // },
} as const;

export type ApiEndpointName = keyof ClientApi;

export default ClientApi;
