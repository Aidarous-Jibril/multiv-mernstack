

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishListItems: localStorage.getItem("wishListItems")
    ? JSON.parse(localStorage.getItem("wishListItems"))
    : [],
};

export const wishListReducer = createReducer(initialState, {
  addToWishList: (state, action) => {
    const item = action.payload;
    const isItemExist = state.wishListItems.find((i) => i._id === item._id);
    if (isItemExist) {
      return {
        ...state,
        wishListItems: state.wishListItems.map((i) => (i._id === isItemExist._id ? item : i)),
      };
    } else {
      return {
        ...state,
        wishListItems: [...state.wishListItems, item],
      };
    }
  },

  removeFromWishList: (state, action) => {
    return {
      ...state,
      wishListItems: state.wishListItems.filter((i) => i._id !== action.payload),
    };
  },
});