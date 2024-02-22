import { createReducer } from "@reduxjs/toolkit";

// initialize userInfo from local storage
const storeInfo = localStorage.getItem("storeInfo")
  ? JSON.parse(localStorage.getItem("storeInfo"))
  : null;

const initialState = {
  isLoading: false,
  storeInfo: storeInfo,
  error: null,
  success: false,
};


export const storeReducer = createReducer(initialState, {

  //user register
  storeRegisterRequest: (state) => {
    state.isLoading = true;
  },
  storeRegisterSuccess: (state, action) => {
    state.isLoading = false;
    state.storeInfo = action.payload.store;
    state.success = action.payload.success;
    state.successMessage = action.payload.successMessage;
  },
  storeRegisterFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  //store login
  storeLoginRequest: (state) => {
    state.isLoading = true;
  },
  storeLoginSuccess: (state, action) => {
    state.isLoading = false;
    state.storeInfo = action.payload.store;
    state.success = action.payload.success;
    state.successMessage = action.payload.successMessage;
  },
  storeLoginFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  //store logout
  storeLogoutRequest: (state) => {
    state.isLoading = true;
  },
  storeLogoutSuccess: (state, action) => {
    state.isLoading = false;
    // state.storeInfo = action.payload.store;
    state.successMessage = action.payload;
  },
  storeLogoutFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },


  //store get info
  storeGetInfoRequest: (state) => {
    state.isLoading = true;
  },
  storeGetInfoSuccess: (state, action) => {
    state.isLoading = false;
    state.storeInfo = action.payload.store;
    state.success = action.payload.success;
    state.successMessage = action.payload.successMessage;
  },
  storeGetInfoFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },

    // update user information
    updateStoreInfoRequest: (state) => {
      state.isLoading = true;
    },
    updateStoreInfoSuccess: (state, action) => {
      state.isLoading = false;
      state.storeInfo = action.payload.store;
      state.successMessage = action.payload.successMessage;
    },
    updateStoreInfoFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    clearErrors: (state) => {
      state.error = null;
    },
    clearMessages: (state) => {
      state.successMessage = null;
    },
})