// add to wishlist
export const addItemToWishList = (data) => async (dispatch, getState) => {
    dispatch({
      type: "addToWishList",
      payload: data,
    });
  
    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishListItems));
    return data;
  };
  
  // remove from wishlist
  export const removeItemFromWishList = (data) => async (dispatch, getState) => {
    dispatch({
      type: "removeFromWishList",
      payload: data._id,
    });
    localStorage.setItem("wishListItems", JSON.stringify(getState().wishList.wishListItems));
    return data;
  };




