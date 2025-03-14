import { redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ params }) {
  const id = params.eventId;

  const resp = await fetch(`http://localhost:8080/events/${id}`);

  if (!resp.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch events" }), {
      status: 500,
    });
  } else {
    return resp;
  }
}

export async function action({ request, params }) {
  const id = params.eventId;

  const resp = await fetch(`http://localhost:8080/events/${id}`, {
    method: request.method,
  });

  if (!resp.ok) {
    throw new Response(JSON.stringify({ message: "Could not delete event" }), {
      status: 500,
    });
  } else {
    return redirect("/events");
  }
}
