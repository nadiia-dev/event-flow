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
import ImagePicker from "./ImagePicker";

function EventForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const eventData = useRouteLoaderData("event-detail");
  const [formErrors, setFormErrors] = useState({});

  const mutation = useMutation({
    mutationFn: ({ data, method, eventId }) => saveEvent(data, method, eventId),
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

    const method = eventId ? "PATCH" : "POST";

    mutation.mutate({ data, method, eventId });
  };

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form
      onSubmit={(e) => handleSubmit(e)}
      className={classes.form}
      encType="multipart/form-data"
    >
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
      <div className={classes.image_container}>
        <ImagePicker
          label="Pick an image"
          name="image"
          image={eventData && eventData.image}
        />
        {formErrors.image && (
          <span className={classes.error}>{formErrors.image}</span>
        )}
      </div>
      <div className={classes.controls}>
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
          <label htmlFor="time">Time</label>
          <input
            type="time"
            id="time"
            name="time"
            defaultValue={eventData ? eventData.time : ""}
          />
          {formErrors.date && (
            <span className={classes.error}>{formErrors.time}</span>
          )}
        </p>
      </div>
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
