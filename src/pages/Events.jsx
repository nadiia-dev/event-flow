import { Await, useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, queryClient } from "../utils/http";

function EventsPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialData: useLoaderData(),
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await resolve={data.events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export async function loader() {
  return queryClient.fetchQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}
