export interface AuthRegisterPayload {
  name: string;
  age: number;
  email: string;
  password: string;
}

export interface AuthLoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token?: string;
  accessToken?: string;
  email?: string;
  name?: string;
  user?: {
    id?: string;
    email?: string;
    name?: string;
    age?: number;
  };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function requestAuth(
  path: string,
  payload: Record<string, unknown> | AuthRegisterPayload | AuthLoginPayload,
): Promise<AuthResponse> {
  if (!apiUrl) {
    throw new Error("A variável NEXT_PUBLIC_API_URL não está configurada.");
  }

  const response = await fetch(`${apiUrl}/auth/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error || "Não foi possível autenticar.";
    throw new Error(message);
  }

  return data as AuthResponse;
}

export async function registerAuth(payload: AuthRegisterPayload) {
  return requestAuth("register", payload);
}

export async function loginAuth(payload: AuthLoginPayload) {
  return requestAuth("login", payload);
}
