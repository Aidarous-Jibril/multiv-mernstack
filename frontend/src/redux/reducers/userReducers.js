import { createReducer } from "@reduxjs/toolkit";

// initialize userInfo from local storage
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  isLoading: false,
  userInfo: userInfo,
  error: null,
  success: false,
  isAuthenticated: false
};



export const userReducer = createReducer(initialState, {

  getUserRequest: (state) => {
    state.isLoading = true;
  },
  getUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.isLoading = false;
    state.userInfo = action.payload.user;
  },
  getUserFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  //user register
  userRegisterRequest: (state) => {
    state.isLoading = true;
  },
  userRegisterSuccess: (state, action) => {
    state.isLoading = false;
    state.userInfo = action.payload;
    state.success = action.payload.success;
    state.successMessage = action.payload.successMessage;
  },
  userRegisterFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  //user login
  userLoginRequest: (state) => {
    state.isLoading = true;
  },
  userLoginSuccess: (state, action) => {
    state.isLoading = false;
    state.userInfo = action.payload.user;
    state.success = action.payload.success;
    state.successMessage = action.payload.successMessage;
  },
  userLoginFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  //user logout
  userLogoutRequest: (state) => {
    state.isLoading = true;
  },
  userLogoutSuccess: (state, action) => {
    state.isLoading = false;
    state.successMessage = action.payload;
  },
  userLogoutFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // update user information
  updateUserInfoRequest: (state) => {
    state.isLoading = true;
  },
  updateUserInfoSuccess: (state, action) => {
    state.isLoading = false;
    state.userInfo = action.payload.user;
    state.successMessage = action.payload.successMessage;
  },
  updateUserInfoFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  

  // add user address
  addUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  addUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.userInfo = action.payload.user;
  },
  addUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },


  // delete user address
  deleteUserAddressRequest: (state) => {
    state.addressloading = true;
  },
  deleteUserAddressSuccess: (state, action) => {
    state.addressloading = false;
    state.successMessage = action.payload.successMessage;
    state.userInfo = action.payload.user;
  },
  deleteUserAddressFailed: (state, action) => {
    state.addressloading = false;
    state.error = action.payload;
  },
  

  //user get info
  userGetInfoRequest: (state) => {
    state.isLoading = true;
  },
  userGetInfoSuccess: (state, action) => {
    state.isLoading = false;
    state.userInfo = action.payload.user;
    state.success = action.payload.success;
    state.successMessage = action.payload.successMessage;
  },
  userGetInfoFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
    state.success = false;
  },


  clearErrors: (state) => {
    state.error = null;
  },
  clearMessages: (state) => {
    state.successMessage = null;
  },
});
