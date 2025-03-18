import { Link } from "react-router-dom";
import classes from "./EventsList.module.css";
import { dateFormatter } from "../utils/dateFormetter";

const apiUrl = import.meta.env.VITE_API_URL;

function EventsList({ events }) {
  return (
    <div className={classes.events}>
      <ul className={classes.list}>
        {events.map((event) => (
          <li key={event._id} className={classes.item}>
            <Link to={event._id}>
              <img src={`${apiUrl}${event.image}`} alt={event.title} />
              <div className={classes.content}>
                <h2>{event.title}</h2>
                <time>
                  {dateFormatter(event.date)} @ {event.time}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventsList;
