import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents, queryClient } from "../utils/http";
import FindEventSection from "../components/FindEventSection";
import Loader from "../UI/Loader";
import ErrorBlock from "../UI/ErrorBlock";

function EventsPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events", { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    initialData: useLoaderData,
  });

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Error while fetching events"}
      />
    );
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
