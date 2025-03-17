import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";

import { fetchEvent, queryClient } from "../utils/http";
import { useQuery } from "@tanstack/react-query";
import Loader from "../UI/Loader";
import ErrorBlock from "../UI/ErrorBlock";

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

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Error while fetching event"}
      />
    );

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
