import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, queryClient } from "../utils/http";
import FindEventSection from "../components/FindEventSection";

function EventsPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    initialData: useLoaderData,
  });

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <FindEventSection />
      <h1 className="heading">Recently added events</h1>
      <EventsList events={data.events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  return queryClient.fetchQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });
}
