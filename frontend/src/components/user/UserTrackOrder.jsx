import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getUserAllOrders } from "../../redux/actions/orderActions";
import { BsFillBagFill } from "react-icons/bs";
import { IoIosArrowRoundBack } from "react-icons/io";
import styles from "../../styles/styles";

const UserTrackOrder = () => {
  const { orders, order } = useSelector((state) => state.orders);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserAllOrders(userInfo._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className={`mt-8  ${styles.section}`}>
         <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-2xl lg:text-3xl font-semibold  text-gray-800">Order Details</h1>
        </div>
        
        <Link to="/profile">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            <IoIosArrowRoundBack size={30} color="crimson" />
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-gray-500">
          Order ID: <span className="text-gray-800 text-xl lg:text3xl">#{order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-gray-500">
          Placed on: <span className="text-gray-800">{order?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {" "}
      <div className="w-full h-[60vh] flex justify-center items-center">
        {data && data?.status === "Processing" ? (
          <h1 className="text-[20px]">Your Order is processing in shop.</h1>
        ) : data?.status === "Transferred to delivery partner" ? (
          <h1 className="text-[20px]">
            Your Order is collected by delivery partner.
          </h1>
        ) : data?.status === "Shipped" ? (
          <h1 className="text-[20px]">
            Your Order is on the way.
          </h1>
        ) : data?.status === "Received" ? (
          <h1 className="text-[20px]">
            Your Order is with your local delivery company.
          </h1>
        ) : data?.status === "On the way" ? (
          <h1 className="text-[20px]">
            Your order is about to be delivered soon.
          </h1>
        ) : data?.status === "Delivered" ? (
          <h1 className="text-[20px]">Your order is delivered!</h1>
        ) : data?.status === "Processing refund" ? (
          <h1 className="text-[20px]">Your refund is processing!</h1>
        ) : data?.status === "Refund Success" ? (
          <h1 className="text-[20px]">Your Refund is success!</h1>
        ) : null}
      </div>
    </div>
  );
};

export default UserTrackOrder