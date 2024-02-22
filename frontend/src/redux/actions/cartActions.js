// add to cart
export const addItemToCart = (data) => async (dispatch, getState) => {
    dispatch({
      type: "addToCart",
      payload: data,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    return data;
  };
  
  // remove from cart
  export const removeItemFromCart = (data) => async (dispatch, getState) => {
    dispatch({
      type: "removeFromCart",
      payload: data._id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    return data;
  };


// // add to cart
// export const addItemToCart = (data) => async (dispatch, getState) => {
//     console.log("CART_ACTIONS", data)
//     dispatch({
//       type: "addToCart",
//       payload: data,
//     });
  
//     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
//     return data
//   };
  
//   // remove from cart
//   export const removeItemFromCart = (data) => async (dispatch, getState) => {
//     dispatch({
//       type: "removeFromCart",
//       payload: data._id,
//     });
//     localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
//     return data;
//   };



