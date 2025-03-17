import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";

import { fetchEvent } from "../utils/http";
import { useQuery } from "@tanstack/react-query";

function EventDetailPage() {
  const params = useParams();
  const eventId = params.eventId;

  const {
    data: event,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEvent(eventId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <EventItem event={event} />;
}

export default EventDetailPage;

// export async function action({ request, params }) {
//   const id = params.eventId;
//   console.log(id);
//   const token = getAuthToken();

//   const resp = await fetch(`http://localhost:8080/events/${id}`, {
//     method: request.method,
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!resp.ok) {
//     throw new Response(JSON.stringify({ message: "Could not delete event" }), {
//       status: 500,
//     });
//   } else {
//     return redirect("/events");
//   }
// }
