import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import SingleWishListCard from "./SingleWishListCard";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromWishList } from "../../redux/actions/wishListActions";
import { addItemToCart } from "../../redux/actions/cartActions";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishListItems } = useSelector((state) => state.wishList);
  const dispatch = useDispatch();

  const addToCartHandler = (data) => {
    const newData = { ...data, qty: 1 };
    dispatch(addItemToCart(newData));
    setOpenWishlist(false);
  };

  const removeFromWishListHandler = (data) => {
    dispatch(removeItemFromWishList(data));
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 h-full w-[80%] 800px:w-[25%] bg-white flex flex-col overflow-y-scroll justify-between shadow-sm">
        {wishListItems && wishListItems.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3 text-black">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5 className="text-gray-700 font-normal">Wishlist items are empty!</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5 text-black">
                <RxCross1
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500] text-black">
                  {wishListItems && wishListItems.length} items
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishListItems &&
                  wishListItems.map((item, index) => (
                    <SingleWishListCard
                      key={index}
                      data={item}
                      addToCartHandler={addToCartHandler}
                      removeFromWishListHandler={removeFromWishListHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
