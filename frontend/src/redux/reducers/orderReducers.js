import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, {
  // get all Orders of shop
  getUserAllOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getUserAllOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getUserAllOrdersFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all Orders of shop
  getStoreAllOrdersRequest: (state) => {
    state.isLoading = true;
  },
  getStoreAllOrdersSuccess: (state, action) => {
    state.isLoading = false;
    state.orders = action.payload;
  },
  getStoreAllOrdersFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get single Order of store/user
  getOrderDetailsRequest: (state) => {
    state.isLoading = true;
  },
  getOrderDetailsSuccess: (state, action) => {
    state.isLoading = false;
    state.order = action.payload;
  },
  getOrderDetailsFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete product of a store
  deleteProductRequest: (state) => {
    state.isLoading = true;
  },
  deleteOrdersuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteProductFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // update order status by store/seller
  updateOrderStatusRequest: (state) => {
    state.isLoading = true;
  },
  updateOrderStatusSuccess: (state, action) => {
    state.isLoading = false;
    state.order = action.payload.order;
    state.successMessage = action.payload.successMessage;
  },
  updateOrderStatusFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // order refund request by User
  refundOrderRequest: (state) => {
    state.isLoading = true;
  },
  refundOrderSuccess: (state, action) => {
    state.isLoading = false;
    state.order = action.payload.order;
    state.successMessage = action.payload.successMessage;
  },
  refundOrderFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // order refune accept by Store
  refundOrderAcceptRequest: (state) => {
    state.isLoading = true;
  },
  refundOrderAcceptSuccess: (state, action) => {
    state.isLoading = false;
    state.order = action.payload.order;
    state.successMessage = action.payload.successMessage;
  },
  refundOrderAcceptFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
