import axios from "axios";

// create category
export const createCategory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "categoryCreateRequest",
    });

    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      "/api/categories/create-category",
      data,
      config
    );
    dispatch({
      type: "categoryCreateSuccess",
      payload: data,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "categoryCreateFail",
      payload: error.response.data.message,
    });
  }
};

// Action creator to get all categories
export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllCategoriesRequest",
    });

    const { data } = await axios.get(`/api/categories`);
    console.log(data)
    dispatch({
      type: "getAllCategoriesSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "getAllCategoriesFailed",
      payload: error.response.data.message,
    });
  }
};

// delete category of a shop
export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCategoryRequest",
    });

    const { data } = await axios.delete(`/api/categories/${id}`, {
      withCredentials: true,
    });

    dispatch({
      type: "deleteCategorySuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCategoryFailed",
      payload: error.response.data.message,
    });
  }
};

// Update category action
export const updateCategory = (categoryData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCategoryRequest",
    });

    const { data } = await axios.put(`/api/categories/${categoryData.id}`, categoryData, {
      withCredentials: true,
    });

    dispatch({
      type: "updateCategorySuccess",
      payload: data.updatedCategory, // Assuming the API returns the updated category
    });
  } catch (error) {
    dispatch({
      type: "updateCategoryFailed",
      payload: error.response.data.message,
    });
  }
};
