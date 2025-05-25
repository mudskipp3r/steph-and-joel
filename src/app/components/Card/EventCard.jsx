import React from "react";
import "./EventCard.css";
import OutlineButton from "../Button/OutlineButton";
import PrimaryButton from "../Button/PrimaryButton";

function EventCard(props) {
  const { title, attendees, time, locationName, address, eventLink } = props;
  return (
    <div className="scheduled-event">
      <h3>
       {title}
      </h3>
      <p>{time}</p>
      <p className="attendee">{attendees}</p>
      <p className="location-title">{locationName}</p>
      <p>{address}</p>
      <div className="button-group">
        <PrimaryButton>Google maps</PrimaryButton>
        <OutlineButton href={eventLink}>
          Add to calendar
        </OutlineButton>
      </div>
    </div>
  );
}

export default EventCard;