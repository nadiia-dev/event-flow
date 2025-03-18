import { Link, useNavigate } from "react-router-dom";
import classes from "./EventItem.module.css";
import { getAuthToken } from "../utils/auth";
import { useMutation } from "@tanstack/react-query";
import { deleteEvent, queryClient } from "../utils/http";
import { dateFormatter } from "../utils/dateFormetter";
import { useState } from "react";
import Modal from "../UI/Modal";
import ErrorBlock from "../UI/ErrorBlock";

function EventItem({ event }) {
  const token = getAuthToken();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const mutation = useMutation({
    mutationFn: (id) => deleteEvent(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("/events");
    },
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  const handleDelete = (eventId) => {
    mutation.mutate(eventId);
  };

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>
            Do you really want to delete this event? This action cannot be
            undone.
          </p>
          <div className={classes.form_actions}>
            {mutation.isPending && <p>Deleting, please wait...</p>}
            {!mutation.isPending && (
              <>
                <button
                  onClick={handleStopDelete}
                  className={classes.button_text}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="button"
                >
                  Delete
                </button>
              </>
            )}
          </div>
          {mutation.isError && (
            <ErrorBlock
              title="Failed to delete event"
              message={
                mutation.error.info?.message ||
                "Failed to delete event, please try again later."
              }
            />
          )}
        </Modal>
      )}
      <article className={classes.event}>
        <img src={event.image} alt={event.title} />
        <h1>{event.title}</h1>
        <time>
          {dateFormatter(event.date)} @ {event.time}
        </time>
        <p>{event.description}</p>
        {token && (
          <menu className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={handleStartDelete}>Delete</button>
          </menu>
        )}
      </article>
    </>
  );
}

export default EventItem;
