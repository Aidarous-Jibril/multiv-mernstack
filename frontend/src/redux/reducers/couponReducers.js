import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const couponReducer = createReducer(initialState, {
  couponCreateRequest: (state) => {
    state.isLoading = true;
  },
  couponCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.coupon = action.payload;
    state.success = true;
  },
  couponCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

  // get all coupons of shop
  getStoreAllCouponsRequest: (state) => {
    state.isLoading = true;
  },
  getStoreAllCouponsSuccess: (state, action) => {
    state.isLoading = false;
    state.coupons = action.payload;
  },
  getStoreAllCouponsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete coupon of a shop
  deleteCouponRequest: (state) => {
    state.isLoading = true;
  },
  deleteCouponSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteCouponFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  }
});