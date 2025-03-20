import EventsList from "../components/EventsList";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../utils/http";
import FindEventSection from "../components/FindEventSection";
import Loader from "../UI/Loader";
import ErrorBlock from "../UI/ErrorBlock";

function EventsPage() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["events", { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    staleTime: 3000,
  });

  return (
    <>
      <FindEventSection />
      <h1 className="heading">Recently added events</h1>
      {isPending ? (
        <Loader />
      ) : isError ? (
        <ErrorBlock
          title="An error occurred"
          message={error.info?.message || "Error while fetching events"}
        />
      ) : (
        <EventsList events={data.events} />
      )}
    </>
  );
}

export default EventsPage;
