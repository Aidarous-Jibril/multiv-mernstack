import React, { useState } from "react";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';


const SingleCartCard = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [value, setValue] = useState(data.qty);
  const totalPrice = data.discountPrice * value;

  const increment = () => {
    if (data.stock < value + 1) {
      toast.error("Product stock limited!");
    } else {
      setValue(value + 1);
      quantityChangeHandler({ ...data, qty: value + 1 });
    }
  };

  const decrement = () => {
    if (value === 1) {
      removeFromCartHandler(data);
    } else {
      setValue(value - 1);
      quantityChangeHandler({ ...data, qty: value - 1 });
    }
  };

  return (
    <div className="border-b p-4 flex items-center">
      <div className="flex items-center">
        <div className="flex flex-col items-center">
          <div
            className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={increment}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="px-2 text-gray-700">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={decrement}
          >
            <HiOutlineMinus size={16} color="#000" />
          </div>
        </div>
        <Link to={`/product/${data._id}`}>
          <img
            src={data?.images[0]?.url}
            alt=""
            className="w-[130px] h-auto ml-2 mr-2 rounded-[5px]"
          />
        </Link>
        <div className="pl-[5px]">
          <h1>{data.name.slice(0, 10)}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${data.discountPrice} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            ${totalPrice}
          </h4>
        </div>
      </div>
      <RxCross1
        className="cursor-pointer ml-auto text-black"
        onClick={() => removeFromCartHandler(data)}
      />
    </div>
  );
};

export default SingleCartCard;
