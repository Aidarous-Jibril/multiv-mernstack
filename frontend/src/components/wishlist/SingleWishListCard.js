import React, { useState } from "react";
import { BsCartPlus } from "react-icons/bs";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SingleWishListCard = ({ data, removeFromWishListHandler, addToCartHandler }) => {
  const [value] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4 flex items-center">
      <RiCloseLine
        size={20}
        className="cursor-pointer text-black mr-2"
        title="Remove from wishlist"
        onClick={() => removeFromWishListHandler(data)}
      />

      <Link to={`/product/${data._id}`}>
        <img
          src={data?.images[0]?.url}
          alt=""
          className="w-[130px] h-auto ml-2 mr-2 rounded-[5px]"
        />
      </Link>

      <div className="pl-[5px] flex-1">
        <h1>{data.name}</h1>
        <h4 className="font-[600] pt-3 text-[17px] text-[#d02222] font-Roboto">
          ${totalPrice}
        </h4>
      </div>

      <BsCartPlus
        size={20}
        className="cursor-pointer text-black"
        title="Add to cart"
        onClick={() => addToCartHandler(data)}
      />
    </div>
  );
};

export default SingleWishListCard;
