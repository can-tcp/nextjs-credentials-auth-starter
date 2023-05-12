import { ApiEndpointName } from "@/(api)/client";

export interface Endpoint {
  method: "GET" | "POST";
  path: string;
  headers?: Record<string, string>;
}

const Endpoints: Record<ApiEndpointName, Endpoint> = {
  signUpUser: {
    method: "POST",
    path: "/api/auth/signup",
  },
};

export default Endpoints;
