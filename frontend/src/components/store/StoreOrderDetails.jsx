import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "../../styles/styles";
import { getOrderDetails, refundOrderAccept, updateOrderStatus } from "../../redux/actions/orderActions";


const StoreOrderDetails = () => {
  const { order, successMessage, error} = useSelector((state) => state.orders);
  const [status, setStatus] = useState();
console.log(status)
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [dispatch, id, successMessage]);


  const orderUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(updateOrderStatus(id, status))
    // navigate("/dashboard-orders")
  };
  const refundOrderUpdateHandler = (e) => {
    e.preventDefault();
    dispatch(refundOrderAccept(id, status))
  };


  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{order?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{order?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {order &&
        order?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${item.images[0]?.url}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                ${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>${order?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            <span class="dark:text-gray-400 text-gray-500">Name: </span>{" "}
            {order?.user.name}
          </h4>
          {/* <h4 className=" text-[20px]">{order?.shippingAddress.city}</h4> */}
          <h4 className=" text-[20px]">
            <span class="dark:text-gray-400 text-gray-500">Street: </span>{" "}
            {order?.shippingAddress.street}
          </h4>
          <h4 className=" text-[20px]">
            <span class="dark:text-gray-400 text-gray-500">State: </span>{" "}
            {order?.shippingAddress.state}
          </h4>
          <h4 className=" text-[20px]">
            <span class="dark:text-gray-400 text-gray-500">Country: </span>{" "}
            {order?.shippingAddress.country}
          </h4>
          <h4 className=" text-[20px]">
            <span class="dark:text-gray-400 text-gray-500">Phone Number: </span>{" "}
            {order?.user?.phoneNumber}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            <span class="dark:text-gray-400 text-gray-500">Status: </span>
            {order?.paymentInfo?.status
              ? order?.paymentInfo?.status
              : "Not Paid"}
          </h4>
        </div>
      </div>

      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {order?.status !== "Processing refund" &&
        order?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
              {[
            "Processing",
            "Transferred to delivery partner",
            "Shipped",
            "On the way",
            "Delivered",
          ]
            .slice(
              [
                "Processing",
                "Transferred to delivery partner",
                "Shipped",
                "On the way",
                "Delivered",
              ].indexOf(order?.status)
            ).map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
     
     {order?.status === "Processing refund" || order?.status === "Refund Success" ? (
      <select value={status} 
        onChange={(e) => setStatus(e.target.value)}
        className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
        >
        {[
            "Processing refund",
            "Refund Success",
          ]
            .slice(
              [
                "Processing refund",
                "Refund Success",
              ].indexOf(order?.status)
            )
            .map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
      </select>
        ) : null
      }

      <div
        className={`${styles.button} mt-5 !bg-[#FCE1E6] !rounded-[4px] text-[#E94560] font-[600] !h-[45px] text-[18px]`}
        onClick={order?.status !== "Processing refund" ? orderUpdateHandler : refundOrderUpdateHandler
        }
      >
        Update Status
      </div>
    </div>
  );
};

export default StoreOrderDetails;
