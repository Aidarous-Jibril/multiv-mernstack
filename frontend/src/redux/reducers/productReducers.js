import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, {
  productCreateRequest: (state) => {
    state.isLoading = true;
  },
  productCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.product = action.payload;
    state.success = true;
  },
  productCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    // state.success = false;
  },

  // get all products of shop
  getStoreAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getStoreAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.products = action.payload;
  },
  getStoreAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a shop
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteProductSuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all products
  getAllProductsRequest: (state) => {
    state.isLoading = true;
  },
  getAllProductsSuccess: (state, action) => {
    state.isLoading = false;
    state.allProducts = action.payload;
  },
  getAllProductsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // update user information
  productReviewRequest: (state) => {
    state.isLoading = true;
  },
  productReviewSuccess: (state, action) => {
    state.isLoading = false;
    state.successMessage = action.payload.successMessage;
  },
  productReviewFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.clearMessages = null;
  },
});
