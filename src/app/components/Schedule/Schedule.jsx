import React from "react";
import "./Schedule.css";
import EventCard from "../Card/EventCard";

function Schedule() {
  return (
    <div className="wrapper">
      <div className="section-header">
        <h1>Schedule</h1>
      </div>
      <div className="schedule-content">
        <div className="timeline">
          <div className="timeline-rule"></div>
          <div className="timeline-pip-container">
            <p>6:30 AM</p><div className="timeline-pip"></div>
          </div>
          <div className="timeline-pip-container">
            <div className="timeline-pip"></div>
          </div>
          <div className="timeline-pip-container">
            <div className="timeline-pip"></div>
          </div>
        </div>
        <div className="event-card-list">
          <EventCard
            title="Tea ceremony"
            attendees="Immediate family only"
            time="6:30 AM"
            locationName="Stepahnie's house"
            address="6 Orchard Street, Epping NSW, 2020"
            eventLink="https://calendar.google.com/calendar/r/eventedit?text=My+Custom+Event&dates=20180512T230000Z/20180513T030000Z&details=For+details,+link+here:+https://example.com/tickets-43251101208&location=Garage+Boston+-+20+Linden+Street+-+Allston,+MA+02134"
          />
          <EventCard
            title="Church ceremony"
            attendees="Wedding party"
            time="12:30 PM"
            locationName="Saint Brigids Marrickville"
            address="392 Marrickville Rd, Marrickville NSW 2204"
            eventLink="https://calendar.google.com/calendar/r/eventedit?text=My+Custom+Event&dates=20180512T230000Z/20180513T030000Z&details=For+details,+link+here:+https://example.com/tickets-43251101208&location=Garage+Boston+-+20+Linden+Street+-+Allston,+MA+02134"
          />
          <EventCard
            title="Wedding reception"
            attendees="Wedding party"
            time="6:30 PM"
            locationName="The Sky Ballroom"
            address="Level 3/462 Chapel Rd, Bankstown NSW 2200"
            eventLink="https://calendar.google.com/calendar/r/eventedit?text=My+Custom+Event&dates=20180512T230000Z/20180513T030000Z&details=For+details,+link+here:+https://example.com/tickets-43251101208&location=Garage+Boston+-+20+Linden+Street+-+Allston,+MA+02134"
          />
        </div>
      </div>
    </div>
  );
}

export default Schedule;
