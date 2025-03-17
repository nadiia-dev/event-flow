import {
  Form,
  useNavigate,
  useParams,
  useRouteLoaderData,
} from "react-router-dom";

import classes from "./EventForm.module.css";
import { useMutation } from "@tanstack/react-query";
import { saveEvent } from "../utils/http";

function EventForm() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const eventData = useRouteLoaderData("event-detail");

  const mutation = useMutation({
    mutationFn: ({ eventData, method, eventId }) =>
      saveEvent(eventData, method, eventId),
    onSuccess: () => {
      navigate("..");
    },
    onError: (error) => {
      alert(error.message);
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

  return (
    <Form onSubmit={handleSubmit} className={classes.form}>
      {/* {data && data.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )} */}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={eventData ? eventData.title : ""}
          required
        />
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
      </p>
      <div className={classes.actions}>
        <button type="button">Cancel</button>
        <button>Save</button>
      </div>
    </Form>
  );
}

export default EventForm;
