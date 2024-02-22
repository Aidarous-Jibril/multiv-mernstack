import axios from "axios";


// load user
export const loadUser = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserRequest",
    });
    const { data } = await axios.get(`/api/users/get-user`, {id}, {
      withCredentials: true,
    });
    console.log(data)
    dispatch({
      type: "getUserSuccess",
      payload: {
        successMessage: data.msg,
        user: data.user,
      }
    });
  } catch (error) {
    dispatch({
      type: "getUserFail",
      payload: error.response.data.message,
    });
  }
};


// user register
export const registerUser = (credentials) => async (dispatch) => {
  console.log(credentials)
  try {
    dispatch({
      type: "userRegisterRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/register",
      credentials,
      config
    );
    console.log(data);
    dispatch({
      type: "userRegisterSuccess",
      payload: {
        successMessage: data.msg,
        user: data.user,
      }
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "userRegisterFail",
      payload: error.response.data.error,
    });
  }
};


// user login
export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: "userLoginRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", credentials, config);
    console.log(data);
    dispatch({
      type: "userLoginSuccess",
      payload: {
        successMessage: data.msg,
        user: data.user,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data?.user));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "userLoginFail",
      payload: error.response.data.error,
    });
  }
};


// user logout
export const logoutUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "userLogoutRequest",
    });

    const { data } = await axios.get("/api/users/logout",  { withCredentials: true });
    console.log(data.msg);
    dispatch({
      type: "userLogoutSuccess",
      payload: data.msg,
    });
    localStorage.removeItem("userInfo");
    dispatch({ type: "userLogoutRequest" });
    localStorage.removeItem("cartItems");
    localStorage.removeItem("wishListItems");
  } catch (error) {
    console.log(error);
    dispatch({
      type: "userLogoutFail",
      payload: error.response.data.error,
    });
  }
};

// user update information
export const updateUserInformation = ( name, email, phoneNumber, password, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserInfoRequest",
    });

    const { data } = await axios.put(
      "/api/users/update-user-info",
      {
        name,
        email,
        phoneNumber,
        password,
        id,
      },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    dispatch({
      type: "updateUserInfoSuccess",
      payload: {
        successMessage: data.msg,
        user: data.user
      }

    });
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: "updateUserInfoFailed",
      payload: error.response.data.message,
    });
  }
};

// add user address
export const addUserAddress = ( country, state, street, zipCode, addressType ) => async (dispatch) => {
    try {
      dispatch({
        type: "addUserAddressRequest",
      });

      const { data } = await axios.post(
        "/api/users/add-address",
        {
          country, state, street, zipCode, addressType
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );
      // console.log(data)
      dispatch({
        type: "addUserAddressSuccess",
        payload: {
          successMessage: data.msg,
          user: data.user,
        }

      });
      localStorage.setItem("userInfo", JSON.stringify(data.user));
    } catch (error) {
      console.log(error)
      dispatch({
        type: "addUserAddressFailed",
        payload: error.response.data.error,
      });
    }
  };


// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `/api/users/delete-user-address/${id}`,
      { withCredentials: true }
    );
    console.log(data)
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: data.msg,
        user: data.user,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};


// user login
export const getUserInfo = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "userGetInfonRequest",
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.get( `/api/users/get-user-info/${id}`, config);
    // console.log(data);
    dispatch({
      type: "userGetInfonSuccess",
      payload: {
        successMessage: data.msg,
        user: data.user,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(data?.user));
  } catch (error) {
    console.log(error);
    dispatch({
      type: "userGetInfonFail",
      payload: error.response.data.error,
    });
  }
};