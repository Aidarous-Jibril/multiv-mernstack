import axios from "axios";

// user register
export const registerStore = (credentials) => async (dispatch) => {
  console.log(credentials)
  try {
    dispatch({
      type: "storeRegisterRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/stores/register",
      credentials,
      config
    );
    console.log(data);
    dispatch({
      type: "storeRegisterSuccess",
      payload: {
        successMessage: data.msg,
        store: data.store,
      }
    });
    localStorage.setItem("storeInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "storeRegisterFail",
      payload: error.response.data.error,
    });
  }
};


// store login
export const loginStore = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: "storeLoginRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/stores/login", credentials, config);
    console.log(data);
    dispatch({
      type: "storeLoginSuccess",
      payload: {
        store: data.store,
        successMessage: data.msg,
        success: data.success,
      },
    });
    localStorage.setItem("storeInfo", JSON.stringify(data?.store));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "storeLoginFail",
      payload: error.response.data.error,
    });
  }
};


// store logout
export const logoutStore = () => async (dispatch) => {
  try {
    dispatch({
      type: "storeLogoutRequest",
    });

    const { data } = await axios.get("/api/stores/logout",  { withCredentials: true });
    console.log(data.msg);
    dispatch({
      type: "storeLogoutSuccess",
      payload: data.msg,
    });
    localStorage.removeItem("storeInfo");
    dispatch({ type: "storeLogoutRequest" });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishListItems");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "storeLogoutFail",
      payload: error.response.data.error,
    });
  }
};

// store login
export const getStoreInfo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "storeGetInfonRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get( `/api/stores/get-store-info/${id}`, config);
    // console.log(data);
    dispatch({
      type: "storeGetInfonSuccess",
      payload: {
        successMessage: data.msg,
        store: data.store,
      },
    });
    localStorage.setItem("storeInfo", JSON.stringify(data?.store));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "storeGetInfonFail",
      payload: error.response.data.error,
    });
  }
};

// update store information
export const updateStoreInformation = (name, description, address, phoneNumber, zipCode, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateStoreInfoRequest",
    });

    const { data } = await axios.put(
      "/api/stores/update-store-info",
      { name, description, address, phoneNumber, zipCode, id},
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    dispatch({
      type: "updateStoreInfoSuccess",
      payload: {
        store: data.store,
        successMessage: data.msg,
      }
    });
    localStorage.setItem("storeInfo", JSON.stringify(data.store));
  } catch (error) {
    dispatch({
      type: "updateStoreInfoFailed",
      payload: error.response.data.message,
    });
  }
};