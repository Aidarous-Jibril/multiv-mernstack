import React, { useState } from 'react'
import Loader from '../components/layout/Loader';
import { useSelector } from 'react-redux';

//components
import Header from '../components/layout/Header'
import EventCard from '../components/events/EventCard'
import styles from '../styles/styles';

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);

    return (
    <>
        {isLoading ? (
            <Loader />
            ) : (
            <div>
                <Header activeHeading={4} />
                  <div class="flex flex-wrap justify-center mt-4 cursor-pointer">
                    { allEvents && allEvents.map((data) => (
                      <EventCard active={true} data={data} />
                    ))}
                    </div>
            </div>
            )}
    </>
  )
}

export default EventsPage