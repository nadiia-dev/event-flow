import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function fetchEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    const data = await response.json();
    return data;
  }
}

export async function authenticate(authData, mode) {
  const resp = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(authData),
  });

  if (resp.status === 422 || resp.status === 401) {
    return resp;
  }

  if (!resp.ok) {
    throw new Response(
      { message: "Could not authenticate user" },
      { status: 500 }
    );
  }

  const resData = await resp.json();
  return resData.token;
}
