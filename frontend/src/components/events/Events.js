import React, { useState } from "react";
import styles from "../../styles/styles";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

const Events = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  // console.log("ALL_EVENTS", allEvents);

  return (
    <div>
      {!isLoading && (
        <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
            <h1>Popular Events</h1>
          </div>

          {/* <div className="w-full grid"> */}
          <div class="flex flex-wrap justify-center mt-4 cursor-pointer">
            {allEvents &&
              allEvents.map((data) => (
                <EventCard data={data} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
