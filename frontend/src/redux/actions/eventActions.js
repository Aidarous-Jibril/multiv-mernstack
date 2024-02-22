import axios from "axios";

// create event
export const createEvent = ( newForm) => async (dispatch) => {
    try {
      dispatch({
        type: "eventCreateRequest",
      });

      const config = {
        headers: {'Content-Type': 'multipart/form-data', },
      }
      const { data } = await axios.post(
        '/api/events/create-event',
        newForm,
        config
      );
      console.log(data)
      dispatch({
        type: "eventCreateSuccess",
        payload: data.event,
      });
    } catch (error) {
        console.log(error)
      dispatch({
        type: "eventCreateFail",
        payload: error.response.data.message,
      });
    }
  };

  // get All Events of a store
export const storeGetAllEvents = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getStoreAllEventsRequest",
      });
  
      const { data } = await axios.get(
        `/api/events/${id}`
      );
      dispatch({
        type: "getStoreAllEventsSuccess",
        payload: data.events,
      });
    } catch (error) {
      dispatch({
        type: "getStoreAllEventsFailed",
        payload: error.response.data.message,
      });
    }
  };



// delete event of a shop
export const storeDeleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `/api/events/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};


// get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });

    const { data } = await axios.get(`/api/events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};