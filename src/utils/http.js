import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchQuery }) {
  let url = "http://localhost:8080/events";

  if (searchQuery) {
    url = `http://localhost:8080/events?search=${searchQuery}`;
  }

  const response = await fetch(url, { signal: signal });

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

export async function fetchEvent(id) {
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw new Error("Could not fetch details for selected event.");
  }
  const resData = await response.json();
  return resData.event;
}

export async function saveEvent(eventData, method, eventId) {
  const token = getAuthToken();
  const url =
    method === "PATCH"
      ? `http://localhost:8080/events/${eventId}`
      : `http://localhost:8080/events`;

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Response({ message: "Could not save event." }, { status: 500 });
  }
}

export async function deleteEvent(id, token) {
  const response = await fetch(`http://localhost:8080/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error("Failed to delete event.");
  }
  return id;
}
