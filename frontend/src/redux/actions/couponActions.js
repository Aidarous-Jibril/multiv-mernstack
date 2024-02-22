import axios from "axios";

// create coupon
export const createCoupon = ( couponData ) => async (dispatch) => {
    try {
      dispatch({
        type: "couponCreateRequest",
      });

      const config = {
        headers: { "Content-Type": "application/json" },
      }
      const { data } = await axios.post(
          '/api/coupons/create-coupon-code',
          couponData,
          config,
          {withCredentials: true}
        );
      console.log(data)
      dispatch({
        type: "couponCreateSuccess",
        payload: data.coupon,
      });
    } catch (error) {
        console.log(error)
      dispatch({
        type: "couponCreateFail",
        payload: error.response.data.message,
      });
    }
  };

  // get All coupons of a store
export const storeGetAllCoupons = (id) => async (dispatch) => {
    try {
      dispatch({
        type: "getStoreAllCouponsRequest",
      });
  
      const { data } = await axios.get(
        `/api/coupons/${id}`,
        {withCredentials: true}
      );
      dispatch({
        type: "getStoreAllCouponsSuccess",
        payload: data.coupons,
      });
    } catch (error) {
      dispatch({
        type: "getStoreAllCouponsFailed",
        payload: error.response.data.message,
      });
    }
  };



// delete coupon of a shop
export const storeDeleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCouponRequest",
    });

    const { data } = await axios.delete(
      `/api/coupons/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteCouponSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCouponFailed",
      payload: error.response.data.message,
    });
  }
};