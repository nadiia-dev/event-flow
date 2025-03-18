import { QueryClient } from "@tanstack/react-query";
import { getAuthToken } from "./auth";

export const queryClient = new QueryClient();

const apiUrl = import.meta.env.VITE_API_URL;

export async function fetchEvents({ signal, searchQuery, max }) {
  let url = `${apiUrl}/events`;

  if (searchQuery && max) {
    url = `${apiUrl}/events?search=${searchQuery}&max=${max}`;
  } else if (searchQuery) {
    url = `${apiUrl}/events?search=${searchQuery}`;
  } else if (max) {
    url = `${apiUrl}/events?max=${max}`;
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
  const resp = await fetch(`${apiUrl}/${mode}`, {
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
  const response = await fetch(`${apiUrl}/events/${id}`);
  if (!response.ok) {
    throw new Error("Could not fetch details for selected event.");
  }
  const resData = await response.json();
  return resData.event;
}

export async function saveEvent(eventData, method, eventId) {
  const token = getAuthToken();
  const url =
    method === "PATCH" ? `${apiUrl}/events/${eventId}` : `${apiUrl}/events`;

  console.log(eventData);

  const response = await fetch(url, {
    method: method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: eventData,
  });

  if (response.status === 422) {
    return response;
  }

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || "Could not save event");
    error.validationErrors = data.errors;
    throw error;
  }
}

export async function deleteEvent(id, token) {
  const response = await fetch(`${apiUrl}/events/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Failed to delete event.");
    error.info = data;
    throw error;
  }
  return id;
}
