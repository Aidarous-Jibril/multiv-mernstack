import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { SearchIcon } from "@heroicons/react/solid";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";

const HeaderUpper = ({ handleSearchChange, searchData}) => {
  const {userInfo} = useSelector(state => state.auth)
  const {cartItems } = useSelector(state => state.cart)
  const { wishListItems } = useSelector((state) => state.wishList);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {windowWidth >= 768 && (
        <div className={`${windowWidth >= 768 ? "w-full bg-[#131921] text-white px-4 py-2 flex justify-between flex-wrap items-center gap-4" : "py-0"}`}>
          <div className="headerHover">
          <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>

          {/* Search */}
          <div className="h-10 rounded-md flex flex-grow relative mx-4">
            <div className="flex items-center justify-center w-1/2 lg:w-2/3">
              <input
                onChange={(e) => handleSearchChange(e)}
                className="h-full text-base text-[#131921] flex-grow outline-none border-none px-2"
                type="text"
                placeholder="Search products..."
              />
              <span className="w-12 h-full flex items-center justify-center bg-[#febd69] hover:bg-[#f3a847] duration-300 text-[#131921] cursor-pointer rounded-tr-md rounded-br-md">
                <SearchIcon width={24} />
              </span>
            </div>
            {/* Adjusted here to show searched item perfectly */}
            {searchData && searchData?.length !== 0 ? (
              <div className="absolute w-full bg-slate-50 shadow-sm z-50 mt-12 p-4">
                {searchData &&
                  searchData?.map((item, index) => (
                    <Link to={`/product/${item?._id}`} key={index}>
                      <div className="w-full flex items-start py-3">
                        <img
                          src={`${item?.images[0]?.url}`}
                          alt=""
                          className="w-[40px] h-[40px] mr-[20px]"
                        />
                        <h1 className="text-[#000]">{item?.name}</h1>
                      </div>
                    </Link>
                  ))}
              </div>
            ) : null}
          </div>

          <div className="flex gap-4">
            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {wishListItems && wishListItems.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart
                  size={30}
                  color="rgb(255 255 255 / 83%)"
                />
                <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                  {cartItems && cartItems.length}
                </span>
              </div>
            </div>

            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-[15px]">
                {userInfo ? (
                  <Link to="/profile">
                    <img
                      src={`${userInfo?.avatar?.url}`}
                      className="w-[35px] h-[35px] rounded-full"
                      alt=""
                    />
                  </Link>
                ) : (
                  <Link to="/login">
                    <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
                  </Link>
                )}
              </div>
            </div>

            {/* cart popup */}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderUpper;

