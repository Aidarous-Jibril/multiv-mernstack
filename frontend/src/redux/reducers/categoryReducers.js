import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const categoryReducer = createReducer(initialState, {
  categoryCreateRequest: (state) => {
    state.isLoading = true;
  },
  categoryCreateSuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
    state.success = true;
  },
  categoryCreateFail: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // get all categories 
  getAllCategoriesRequest: (state) => {
    state.isLoading = true;
  },
  getAllCategoriesSuccess: (state, action) => {
    state.isLoading = false;
    state.categories = action.payload;
  },
  getAllCategoriesFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // delete categories 
  deleteCategoryRequest: (state) => {
    state.isLoading = true;
  },
  deleteCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.message = action.payload;
  },
  deleteCategoryFailed: (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  },

  // update category
  updateCategoryRequest: (state) => {
    state.isLoading = true;
  },
  updateCategorySuccess: (state, action) => {
    state.isLoading = false;
    state.category = action.payload;
  },
  updateCategoryFailed: (state, action) => {
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
