import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

// Components
import Ratings from "./Ratings";
import ProductDetailsCard from "./ProductDetailsCard";
import styles from "../../styles/styles";
import { addItemToCart } from "../../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addItemToWishList, removeItemFromWishList } from "../../redux/actions/wishListActions";

const ProductCard = ({ data, isEvent }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  
  const [openModal, setOpenModal] = useState(false);
  const [addToWishList, setAddToWishList] = useState(false);
  const [count, setCount] = useState(1)

  const dispatch = useDispatch()

  useEffect(() => {
    if(wishListItems && wishListItems.find((item) => item._id === data._id)) {
      setAddToWishList(true)
    } else {
      setAddToWishList(false)
    }
  }, [wishListItems])

  const removeFromWishlistHandler = (data) => {
    setAddToWishList(!addToWishList)
    dispatch(removeItemFromWishList(data))
 }
 const addToWishlistHandler = (data) => {
  console.log("addToWishlistHandler")
     setAddToWishList(!addToWishList)
     dispatch(addItemToWishList(data))
 }
  
  const addToCartHandler = (id) => {
    const isItemExists = cartItems && cartItems.find((i) => i._id === id);
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
      <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link
          to={`${
            isEvent === true
              ? `/product/${data?._id}?isEvent=true`
              : `/product/${data?._id}`
          }`}
        >
          {" "}
          <img
            src={`${data?.images && data?.images[0]?.url}`}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to={`/store/preview/${data?.store?._id}`}>
          <h5 className={`${styles.shop_name}`}>{data?.store?.name}</h5>
        </Link>
        <Link
          to={`${
            isEvent === true
              ? `/data/${data._id}?isEvent=true`
              : `/data/${data._id}`
          }`}
        >
          <h4 className="pb-3 font-[500]">
            {data?.name?.length > 40
              ? data?.name?.slice(0, 40) + "..."
              : data?.name}
          </h4>

          <div className="flex">
            <Ratings rating={data?.rating} />
          </div>

          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.dataDiscountPrice}`}>
                {data?.originalPrice === 0
                  ? data?.originalPrice
                  : data?.discountPrice}
                $
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? data.originalPrice + " $" : null}
              </h4>
            </div>
            <span className="font-[400] text-[17px] text-[#68d284]">
              {data?.sold_out} sold
            </span>
          </div>
        </Link>

        {/* side options */}
        <div>
          {addToWishList ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(data)}
              color={addToWishList ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(data)}
              color={addToWishList ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpenModal(!openModal)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(data._id)}
            color="#444"
            title="Add to cart"
          />
          {openModal ? (
            <ProductDetailsCard setOpenModal={setOpenModal} data={data} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
