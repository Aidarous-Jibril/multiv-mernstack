import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { toast } from "react-toastify";

import styles from "../../styles/styles";
import { getOrderDetails, getUserAllOrders, refundOrderRequest } from "../../redux/actions/orderActions";
import { IoIosArrowRoundBack } from "react-icons/io";
import { reviewProduct } from "../../redux/actions/productActions";

const UserOrderDetails = () => {
  const { order, successMessage: successMessageOrder, error: errorOrder } = useSelector((state) => state.orders);
  const { successMessage, error } = useSelector((state) => state.products);
  const { userInfo } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);

console.log(successMessageOrder)
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOrderDetails(id));

    if(successMessage || successMessageOrder){
      toast.success(successMessage || successMessageOrder)
      dispatch({ type: "clearMessages" });
    };
    if(error || errorOrder){
      toast.error(error || errorOrder)
      dispatch({ type: "clearErrors" });
    };
  }, [dispatch, id, successMessage, error, successMessageOrder, errorOrder]);


  const reviewHandler = async () => {
    dispatch(reviewProduct({
      user: userInfo,
      rating,
      comment,
      productId: selectedItem?._id,
      orderId: id,
    }))
  }
  const refundHandler = async () => {
    dispatch(refundOrderRequest( {orderId: id, status: "Processing refund"}))
    dispatch(getUserAllOrders(userInfo._id));
  }

  return (

<div className={`py-4 min-h-screen ${styles.section}`}>
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

      {/* order items */}
      <br />
      <br />
      {order &&
        order?.cart.map((item, index) => {
          return (
            <div className="w-full flex items-start mb-5" key={index}>
              <img
                src={`${item.images[0]?.url}`}
                alt=""
                className="w-[80x] h-[80px]"
              />
              <div className="w-full">
                <h5 className="pl-3 text-[20px]">{item.name}</h5>
                <h5 className="pl-3 text-[20px] text-[#00000091]">
                {item.qty}  x ${item.originalPrice}{" "} <span className="text-red-300 line-through">${item.discountPrice}</span>
                </h5>
              </div>
              {order?.status === "Delivered" ?  <div
                className={`${styles.button} text-[#fff]`}
                onClick={() => setOpen(true) || setSelectedItem(item)}
              >
                Write a review
              </div> : (
             null
            )}
            </div>
            
          );
        })}

      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Give a Review
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${selectedItem?.images[0]?.url}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">{selectedItem?.name}</div>
                <h4 className="pl-3 text-[20px]">
                  ${selectedItem?.discountPrice} x {selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Give a Rating <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Write a comment
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How was your product? write your expresion about it!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} text-white text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px] text-gray-800">
          Total Price: <strong>${order?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />

      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[50%]">
          
          <h4 className="pt-3 text-[20px] font-semibold text-gray-800">Your Details:</h4>
          <h4 className="pt-3 text-[20px]">
          <span className="dark:text-gray-400 text-gray-500">Street: </span>{" "} {order?.user.name}
          </h4>
          {/* <h4 className=" text-[20px]"><span class="dark:text-gray-400 text-gray-500">Country: </span>{" "}{order?.shippingAddress.state}</h4> */}
          <h4 className=" text-[20px]"><span className="dark:text-gray-400 text-gray-500">Full Name: </span>{" "}{order?.user.name}</h4>
          <h4 className=" text-[20px]"><span className="dark:text-gray-400 text-gray-500">Email: </span>{" "}{order?.user.email}</h4>
          <h4 className=" text-[20px]"><span className="dark:text-gray-400 text-gray-500">Phone Number: </span>{" "}{order?.user.phoneNumber}</h4>
        
        </div>
        <div className="w-full 800px:w-[50%]">
        <h4 className="pt-3 text-[20px] font-semibold text-gray-800">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
          <span className="dark:text-gray-400 text-gray-500">Street: </span>{" "} {order?.shippingAddress.street}
          </h4>
          {/* <h4 className=" text-[20px]"><span class="dark:text-gray-400 text-gray-500">Country: </span>{" "}{order?.shippingAddress.state}</h4> */}
          <h4 className=" text-[20px]"><span className="dark:text-gray-400 text-gray-500">State: </span>{" "}{order?.shippingAddress.state}</h4>
          <h4 className=" text-[20px]"><span className="dark:text-gray-400 text-gray-500">Country: </span>{" "}{order?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]"><span className="dark:text-gray-400 text-gray-500">Payment Status: </span>{" "}{order?.paymentInfo?.status ? order?.paymentInfo?.status : "Not Paid"}</h4>
          <br />
           {
            order?.status === "Delivered" && (
              <div className={`${styles.button} text-white`}
              onClick={refundHandler}
              >Give a Refund</div>
            )
           }
        </div>
      </div>
      <br />
      <Link to="/">
        <div className={`${styles.button} text-white`}>Send Message</div>
      </Link>
      <br />
      <br />
    </div>

  );
};

export default UserOrderDetails;
