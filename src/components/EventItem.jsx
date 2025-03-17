import { Link, useNavigate } from "react-router-dom";
import classes from "./EventItem.module.css";
import { getAuthToken } from "../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { deleteEvent } from "../utils/http";

function EventItem({ event }) {
  const token = getAuthToken();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (id) => deleteEvent(id, token),
    onSuccess: () => {
      navigate("/events");
    },
  });

  const handleDelete = (eventId) => {
    mutation.mutate(eventId);
  };

  function startDeleteHandler() {
    const proceed = window.confirm("Are you sure?");
    if (proceed) {
      handleDelete(event._id);
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
