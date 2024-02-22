import axios from "axios";

// create product
export const createProduct = ( newForm) => async (dispatch) => {
    try {
      dispatch({
        type: "productCreateRequest",
      });

      const config = {
        headers: {'Content-Type': 'multipart/form-data', },
      }
      const { data } = await axios.post(
        '/api/products/create-product',
        newForm,
        config
      );
      console.log(data)
      dispatch({
        type: "productCreateSuccess",
        payload: data,
      });
    } catch (error) {
        console.log(error)
      dispatch({
        type: "productCreateFail",
        payload: error.response.data.message,
      });
    }
  };

  // get All Products of a store
export const storeGetAllProducts = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getStoreAllProductsRequest",
      });
  
      const { data } = await axios.get(
        `/api/products/${id}`
      );
      dispatch({
        type: "getStoreAllProductsSuccess",
        payload: data.products,
      });
    } catch (error) {
      dispatch({
        type: "getStoreAllProductsFailed",
        payload: error.response.data.message,
      });
    }
  };


// delete product of a shop
export const storeDeleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `/api/products/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFailed",
      payload: error.response.data.message,
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`/api/products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFailed",
      payload: error.response.data.message,
    });
  }
};


// get all products
export const reviewProduct = ( {user, rating, comment, productId, orderId} ) => async (dispatch) => {
  try {
    dispatch({
      type: "productReviewRequest",
    });

    const { data } = await axios.put( "/api/products/create-product-review",
      {user, rating, comment, productId, orderId },
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );
    dispatch({
      type: "productReviewSuccess",
      payload: {
        successMessage: data.msg,
      }

    });
  } catch (error) {
    dispatch({
      type: "productReviewFailed",
      payload: error.response.data.msg,
    });
  }
};