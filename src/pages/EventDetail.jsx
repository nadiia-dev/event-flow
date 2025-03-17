import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";

import { fetchEvent, queryClient } from "../utils/http";
import { useQuery } from "@tanstack/react-query";

function EventDetailPage() {
  const params = useParams();
  const eventId = params.eventId;

  const {
    data: eventData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEvent(eventId),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <EventItem event={eventData} />;
}

export default EventDetailPage;

export async function loader({ params }) {
  const id = params.eventId;
  return queryClient.fetchQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEvent(id),
  });
}
