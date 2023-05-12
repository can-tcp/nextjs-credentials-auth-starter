import ClientApi, { ApiEndpointName } from "@/client/api";

interface CallApiProps<Payload> {
  name: ApiEndpointName;
  payload?: Payload;
  segments?: { [key: string]: string };
}

export interface CallApiResponse<Result> {
  ok: boolean;
  status: number;
  result: Result | null | undefined;
  error?: string | null;
}

export async function call<Payload, Result>({
  name,
  payload,
  segments,
}: CallApiProps<Payload>): Promise<CallApiResponse<Result>> {
  const route = ClientApi[name];

  if (segments) {
    route.path = Object.keys(segments).reduce((acc, key) => {
      return acc.replace(`:${key}`, segments[key]);
    }, route.path);
  }

  const fetchOptions: RequestInit = {
    method: route.method,
    headers: route.headers,
    body: route.method === "GET" ? null : JSON.stringify(payload),
  };

  const response = await fetch(route.path, fetchOptions);

  const result = await response.json().catch((err) => {
    const errorMessage = `Error parsing response from ${route.path}`;

    return {
      ok: false,
      status: response.status,
      result: null,
      error: errorMessage,
    };
  });

  if (!response.ok || response.status >= 400) {
    console.error(`Error calling ${name} at ${route.path}: ${result.error}`);

    return {
      ok: false,
      status: response.status,
      result: null,
      error: result,
    };
  }

  return {
    ok: response.ok,
    status: response.status,
    result: result,
  };
}
