import {
  Form,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";

import classes from "./EventForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { queryClient, saveEvent } from "../utils/http";
import { useState } from "react";

function EventForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const eventData = useRouteLoaderData("event-detail");
  const [formErrors, setFormErrors] = useState({});

  const mutation = useMutation({
    mutationFn: ({ eventData, method, eventId }) =>
      saveEvent(eventData, method, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate("..");
    },
    onError: (error) => {
      if (error.validationErrors) {
        setFormErrors(error.validationErrors);
      } else {
        alert(error.message);
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const eventData = {
      title: data.get("title"),
      image: data.get("image"),
      date: data.get("date"),
      description: data.get("description"),
    };

    const method = eventId ? "PATCH" : "POST";

    mutation.mutate({ eventData, method, eventId });
  };

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form onSubmit={handleSubmit} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={eventData ? eventData.title : ""}
          required
        />
        {formErrors.title && (
          <span className={classes.error}>{formErrors.title}</span>
        )}
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          defaultValue={eventData ? eventData.image : ""}
          required
        />
        {formErrors.image && (
          <span className={classes.error}>{formErrors.image}</span>
        )}
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          defaultValue={eventData ? eventData.date : ""}
          required
        />
        {formErrors.date && (
          <span className={classes.error}>{formErrors.date}</span>
        )}
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={eventData ? eventData.description : ""}
          required
        />
        {formErrors.description && (
          <span className={classes.error}>{formErrors.description}</span>
        )}
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
