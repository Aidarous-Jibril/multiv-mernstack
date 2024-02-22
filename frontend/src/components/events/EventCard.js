import React, { useState } from "react";
import CountDown from "./CountDown";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemToCart } from "../../redux/actions/cartActions";

const EventCard = ({ active, data }) => {
  const {cartItems } = useSelector(state => state.cart)
  const [count, setCount] = useState(1)

  const dispatch = useDispatch()

  const addToCartHandler = (id) => {
    const isItemExists = cartItems && cartItems.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addItemToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };
  return (
    <>
      {/* <div
          className={`w-full block bg-white rounded-lg lg:flex p-4 ${active ? "unset" : "mb-12"}`}
      >
      <div className="w-[50%] object-contain lg:-w[50%] m-auto">
        <img src={`${data?.images[1].url}`} alt="" />
      </div>
      <div className="w-full lg:[w-50%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>APPLE MACBOOK PRO 2022 MNEJ3KS/A 13" 512 GB, RYMDGRÅ</h2>
        <p>MacBook Pro 13 M2 2022 filled with power thanks to the new M2 processor designed for true professionals. It comes with Retina Display with True Tone balancing, P3 support for wide color gamut and super high brightness.</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
            1890$
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
            1690$
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
          120 sold
          </span>
        </div>
        <CountDown  />
        <br />
        <div className="flex items-center">
          <Link to="/">
            <div className={`${styles.button} text-[#fff]`}>See Details</div>
          </Link>
          <div className={`${styles.button} text-[#fff] ml-5`} onClick={() => addToCartHandler()}>Add to cart</div>
        </div>
      </div>
      </div> */}
      <div class="p-4 max-w-md">
        <div class="flex rounded-lg h-full  bg-white p-8 flex-col">
          <Link
            className="relative mx-3 mt-3 flex overflow-hidden rounded-xl cursor-pointer"
            to={`/product/${data._id}?isEvent=true`}
          >
            <img
              className="w-full h-96 object-cover"
              src={`${data?.images?.[0].url}`} 
              alt="product image"
            />
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              30% OFF
            </span>
          </Link>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-slate-900">
                {data?.name}
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-slate-900">
                  ${data?.discountPrice}
                </span>
                <span className="text-md text-[#d55b45] line-through">
                  ${data?.originalPrice}
                </span>
              </p>
              <p> {data?.sold_out} <span className="text-md text-[#44a55e]">Sold out</span>
              </p>
            </div>
            {/* RATINGS TOGO HERE */}
              <div className="flex items-center pb-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-yellow-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  5.0
                </span>
              </div>
              <div className="flex items-center">
                <Link to={`/product/${data._id}?isEvent=true`}>
                  <div className={`${styles.button} text-[#fff] cursor-pointer`}>See Details</div>
                </Link>
              <div className={`${styles.button} text-[#fff] ml-5 cursor-pointer`} onClick={() => addToCartHandler()}>Add to cart</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCard;
