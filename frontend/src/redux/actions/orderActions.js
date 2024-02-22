import axios from "axios";

// // create product
// export const createProduct = ( newForm) => async (dispatch) => {
//     try {
//       dispatch({
//         type: "productCreateRequest",
//       });

//       const config = {
//         headers: {'Content-Type': 'multipart/form-data', },
//       }
//       const { data } = await axios.post(
//         '/api/products/create-product',
//         newForm,
//         config
//       );
//       console.log(data)
//       dispatch({
//         type: "productCreateSuccess",
//         payload: data,
//       });
//     } catch (error) {
//         console.log(error)
//       dispatch({
//         type: "productCreateFail",
//         payload: error.response.data.message,
//       });
//     }
//   };



// // delete product of a shop
// export const storeDeleteProduct = (id) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "deleteProductRequest",
//     });

//     const { data } = await axios.delete(
//       `/api/products/${id}`,
//       {
//         withCredentials: true,
//       }
//     );

//     dispatch({
//       type: "deleteProductSuccess",
//       payload: data.message,
//     });
//   } catch (error) {
//     dispatch({
//       type: "deleteProductFailed",
//       payload: error.response.data.message,
//     });
//   }
// };

// get all orders of user
export const getUserAllOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserAllOrdersRequest",
    });

    const { data } = await axios.get(`/api/orders/get-user-orders/${userId}`);
    dispatch({
      type: "getUserAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getUserAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};

// get all orders of store
export const getStoreAllOrders = (storeId) => async (dispatch) => {
  console.log(storeId)
  try {
    dispatch({
      type: "getStoreAllOrdersRequest",
    });

    const { data } = await axios.get(`/api/orders/get-store-orders/${storeId}`);
    dispatch({
      type: "getStoreAllOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getStoreAllOrdersFailed",
      payload: error.response.data.message,
    });
  }
};


// get all orders details. both user & store 
export const getOrderDetails = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: "getOrderDetailsRequest",
    });

    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch({
      type: "getOrderDetailsSuccess",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "getOrderDetailsFailed",
      payload: error.response.data.message,
    });
  }
};


// update order status by Store/seller
export const updateOrderStatus = (orderId, status) => async (dispatch) => {
  console.log(orderId)
  try {
    dispatch({
      type: "updateOrderStatusRequest",
    });

    const { data } = await axios.put(`/api/orders/update-order-status/${orderId}`, {status}, { withCredentials: true });
    dispatch({
      type: "updateOrderStatusSuccess",
      payload: {
        successMessage: data.msg,
        order: data.order
      }
    });
  } catch (error) {
    dispatch({
      type: "updateOrderStatusFailed",
      payload: error.response.data.message,
    });
  }
};


// update order status by Store/seller
export const refundOrderRequest = ({orderId, status}) => async (dispatch) => {
  console.log(orderId, status)
  try {
    dispatch({
      type: "refundOrderRequest",
    });

    const { data } = await axios.put(`/api/orders/request-order-refund/${orderId}`, {status}, { withCredentials: true });
    dispatch({
      type: "refundOrderSuccess",
      payload: {
        successMessage: data.msg,
        order: data.order
      }
    });
  } catch (error) {
    dispatch({
      type: "refundOrderFailed",
      payload: error.response.data.message,
    });
  }
};

// accept refund order by Store/seller
export const refundOrderAccept = (orderId, status) => async (dispatch) => {
  try {
    dispatch({
      type: "refundOrderAcceptRequest",
    });

    const { data } = await axios.put(`/api/orders/accept-order-refund/${orderId}`, {status}, { withCredentials: true });
    dispatch({
      type: "refundOrderAcceptSuccess",
      payload: {
        successMessage: data.msg,
        order: data.refundedOrder
      }
    });
  } catch (error) {
    dispatch({
      type: "refundOrderAcceptFailed",
      payload: error.response.data.message,
    });
  }
};