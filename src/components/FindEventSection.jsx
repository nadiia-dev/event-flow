import { useRef, useState } from "react";
import classes from "./FindEventSection.module.css";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../utils/http";
import EventsList from "./EventsList";
import Loader from "../UI/Loader";
import ErrorBlock from "../UI/ErrorBlock";

function FindEventSection() {
  const [searchQuery, setSearchQuery] = useState();
  const searchElement = useRef();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["events", { search: searchQuery }],
    queryFn: ({ signal }) => fetchEvents({ signal, searchQuery }),
    enabled: searchQuery !== undefined,
  });

  function handleSubmit(event) {
    event.preventDefault();
    setSearchQuery(searchElement.current.value);
  }

  let content = <p>Please enter a search term and to find events.</p>;

  if (isLoading) {
    content = <Loader />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title="An error occured"
        message={error.info?.message || "Error while fetching event"}
      />
    );
  }

  if (data) {
    content = <EventsList events={data.events} />;
  }

  return (
    <section className={classes.content_section} id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} className={classes.search_form}>
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}

export default FindEventSection;
