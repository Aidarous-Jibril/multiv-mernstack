import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";

import ProductDetailsInfo from "./ProductDetailsInfo";
import { addItemToCart } from "../../redux/actions/cartActions"
import { addItemToWishList, removeItemFromWishList } from "../../redux/actions/wishListActions";


const ProductDetails = ({ data }) => {
  const { userInfo } = useSelector(state => state.auth)
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [wishList, setWishList] = useState(false);
  const [count, setCount] = useState(1);
  const [select, setSelect] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getAllProductsShop(data && data?.shop._id));
    if (wishListItems && wishListItems.find((i) => i._id === data?._id)) {
      setWishList(true);
    } else {
      setWishList(false);
    }
  }, [ wishListItems]);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addToWishlistHandler = (data) => {
      setWishList(!wishList)
      dispatch(addItemToWishList(data))
  }

  const removeFromWishlistHandler = (data) => {
    setWishList(!wishList)
    dispatch(removeItemFromWishList(data))
  }

  const addToCartHandler = (id) => {
    const isItemExists = cartItems && cartItems.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (data.stock < count) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addItemToCart(cartData));
        toast.success("Item added to cart successfully!");
      }
    }
  };


  const handleMessageSubmit = async () => {
    if(userInfo) {
      const groupTitle = data?._id + userInfo?._id;
      const userId = userInfo?._id;
      const sellerId = data?.storeId;
      try {
        const { data } = await axios.post(`/api/conversations/create-new-conversation`, { 
          groupTitle,
          userId,
          sellerId,
        })
        navigate(`/inbox?${data.conversation._id}`);
      } catch (error) {
        toast.error(error.response.data.msg);
      }
    } else {
      toast.error("Please login to create a conversation");
    }
  } 

  return (
    <div className="bg-white">
      {data ? (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row -mx-4">
              <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                  <img
                    className="w-full h-full object-cover"
                    src={`${data && data.images[0]?.url}`}
                    alt="data Image"
                  />
                </div>
                <div className="flex -mx-2 mb-4">
                  {data &&
                    data.images.map((i, index) => (
                      <div
                        className={`${
                          select === 0 ? "border" : "null"
                        } w-1/2 px-2 cursor-pointer`}
                      >
                        <img src={`${i?.url}`} />
                      </div>
                    ))}
                </div>
              </div>

              <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {data.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{data.description}</p>
                <div className="flex mb-4">
                  <div className=" flex mr-6">
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Price:{" "}
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      ${data.discountPrice}{" "}
                    </span>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? data.originalPrice + "$" : null}
                    </h3>
                  </div>
                  <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">
                      Availability:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {" "}
                      {data.stock} In Stock
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Available Colors:
                  </span>
                  <div className="flex items-center mt-2">
                    <button className="w-6 h-6 rounded-full bg-gray-800 dark:bg-gray-200 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-red-500 dark:bg-red-700 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-blue-500 dark:bg-blue-700 mr-2"></button>
                    <button className="w-6 h-6 rounded-full bg-yellow-500 dark:bg-yellow-700 mr-2"></button>
                  </div>
                </div>
                <div>
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Description:
                  </span>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {data.description}.
                  </p>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <div>
                    {wishList ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={setWishList ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        color={setWishList ? "red" : "#333"}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} !w-full !mt-6 !rounded !h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-white flex items-center ">
                    Add to cart <AiOutlineShoppingCart className="ml-2" />
                  </span>
                </div>

                <div className="flex justify-between items-center my-4 sm:my-12">
                  <Link
                    to={`/store/preview/${data.store._id}`}
                    className="flex"
                  >
                    <img
                      src={`${data?.store?.imageUrl ? data.store.imageUrl : "https://logowik.com/content/uploads/images/shop-app6999.jpg"}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name}`}>
                        {data.store.name}
                      </h3>
                      <h5 className="pb-3text-[15px]">
                        ( {data?.rating} ) Ratings
                      </h5>
                    </div>
                  </Link>
                  <div
                    className={`${styles.button}  mt-4 !rounded !h-11`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-white flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <ProductDetailsInfo data={data} />
         
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetails;
