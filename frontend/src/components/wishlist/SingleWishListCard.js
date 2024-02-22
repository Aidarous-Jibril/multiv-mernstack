import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { Link } from "react-router-dom";

const SingleWishListCard = ({ data,removeFromWishListHandler,addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full 800px:flex items-center justify-between">
        <RxCross1 className="cursor-pointer 800px:mb-['unset'] 800px:ml-['unset'] mb-2 ml-2"
        onClick={() => removeFromWishListHandler(data)}
        />
        <Link to={`/product/${data._id}`} >
          <img
            src={`${data?.images[0]?.url}`}
            alt=""
            className="w-[130px] h-min ml-2 mr-2 rounded-[5px]"
          />
        
        </Link>

        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className="font-[600] pt-3 800px:pt-[3px] text-[17px] text-[#d02222] font-Roboto">
            ${totalPrice}
          </h4>
        </div>
        <div>
          <BsCartPlus size={20} className="cursor-pointer" tile="Add to cart"
           onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleWishListCard;