import { ApiEndpointName } from "@/(api)/client";
import Endpoints from "./endpoints";

export interface CallApiProps<Payload> {
  endpoint: ApiEndpointName;
  payload?: Payload;
  segments?: { [key: string]: string };
}

export interface ApiResponse<Result> {
  ok: boolean;
  status: number;
  result: Result;
}

function replaceSegments(path: string, segments: { [key: string]: string }) {
  return Object.keys(segments).reduce((acc, key) => {
    return acc.replace(`:${key}`, segments[key]);
  }, path);
}

export async function call<Payload, Result>({
  endpoint: name,
  payload,
  segments,
}: CallApiProps<Payload>): Promise<ApiResponse<Result>> {
  const endpoint = Endpoints[name];

  if (!endpoint) {
    throw new Error(`No endpoint found for ${endpoint}`);
  }

  if (segments) {
    endpoint.path = replaceSegments(endpoint.path, segments);
  }

  const fetchOptions: RequestInit = {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json",
      ...endpoint.headers,
    },
  };

  if (payload) {
    fetchOptions.body = JSON.stringify(payload);
  }

  const response = await fetch(endpoint.path, fetchOptions);

  const result = await response.json();

  return {
    ok: response.ok,
    status: response.status,
    result,
  };
}
