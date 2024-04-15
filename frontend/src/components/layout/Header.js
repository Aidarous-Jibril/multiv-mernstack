// import React, { useState, useEffect } from "react";
// import styles from "../../styles/styles";
// import { Link } from "react-router-dom";
// import { AiOutlineSearch, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
// import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
// import { BiMenuAltLeft } from "react-icons/bi";
// import { CgProfile } from "react-icons/cg";
// import { RxCross1 } from "react-icons/rx";

// import Navbar from "./Navbar";
// import CategoriesDropdown from "./CategoriesDropdown";
// import Cart from "../cart/Cart";
// import Wishlist from "../wishlist/Wishlist";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllCategories } from "../../redux/actions/categoryActions";

// const Header = ({ activeHeading }) => {
//   const {userInfo} = useSelector(state => state.auth)
//   const {storeInfo} = useSelector(state => state.storeLogin)
//   const { categories } = useSelector((state) => state.categories);
//   const {allProducts} = useSelector((state) => state.products);
//   const {cartItems } = useSelector(state => state.cart)
//   const { wishListItems } = useSelector((state) => state.wishList);

//   const [searchData, setSearchData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [active, setActive] = useState(false)
//   const [dropDown, setDropDown] = useState(false);
//   const [openCart, setOpenCart] = useState(false);
//   const [openWishlist, setOpenWishlist] = useState(false);
//   const [openMobileMenu, setOpenMobileMenu] = useState(false);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllCategories())
//   }, [])
// console.log(categories)
//   const handleSearchChange = (e) => {
//     console.log(e.target.value);
//     setSearchTerm(e.target.value);

//   const filteredProducts =
//     allProducts && allProducts?.filter((product) =>
//       product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setSearchData(filteredProducts);
//     console.log(searchData);
//   };

//   window.addEventListener("scroll", () => {
//     if (window.scrollY > 70) {
//       setActive(true);
//     } else {
//       setActive(false);
//     }
//   });

//   const toggleDropdown = () => {
//     setDropDown(!dropDown);
//   };
//   return (
//     <>
//        {/* Upper header part */}
//       <div className={`${styles.section}`}>
//         <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
//           <div>
//             <Link to="/">
//               <img
//                 src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//                 alt=""
//               />
//             </Link>
//           </div>
//           {/* search box */}
//           <div className="w-[50%] relative">
//             <input
//               type="text"
//               placeholder="Search Product..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
//             />
//             <AiOutlineSearch
//               size={30}
//               className="absolute right-2 top-1.5 cursor-pointer"
//             />
//             {searchData && searchData?.length !== 0 ? (
//               <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
//                 {searchData &&
//                   searchData?.map((item, index) =>  (
//                     <Link to={`/product/${item?._id}`}>
//                       <div className="w-full flex items-start-py-3">
//                         <img
//                           src={`${item?.images[0]?.url}`}
//                           alt=""
//                           className="w-[40px] h-[40px] mr-[10px]"
//                         />
//                         <h1>{item?.name}</h1>
//                       </div>
//                     </Link>
//                     )
//                   )}
//               </div>
//             ) : null}
//           </div>

//           <div className={`${styles.button}`}>
//             <Link to={`${storeInfo ? "/dashboard" : "/store-login"}`}>
//               <h1 className="text-[#fff] flex items-center">
//                 {storeInfo   ? "Go Dashboard" : "Become Seller"}{" "}
//                 <IoIosArrowForward className="ml-1" />
//               </h1>
//             </Link>
//           </div>
//         </div>
//       </div>
//       {/* Lower header part */}
//       <div
//         className={`${
//           active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
//         } transition hidden 800px:flex items-center justify-between w-full bg-[#013220] h-[70px]`}
//       >
//         <div
//           className={`${styles.section} relative ${styles.normalFlex} justify-between`}
//         >
//           {/* categories */}
//           <div onClick={toggleDropdown}>
//           <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
//             <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
//             <button
//               onClick={toggleDropdown}
//               className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
//             >
//               Categories
//             </button>

//             {/* Integrate CategoriesDropdown component here */}
//             <CategoriesDropdown categories={categories} isOpen={dropDown} setIsOpen={setDropDown} />

//             <IoIosArrowDown
//               size={20}
//               className="absolute right-2 top-4 cursor-pointer"
//               onClick={toggleDropdown}
//             />
//           </div>
//         </div>
//           {/* navitems */}
//           <div className={`${styles.normalFlex}`}>
//             <Navbar active={activeHeading} />
//           </div>

//           <div className="flex">
//             <div className={`${styles.normalFlex}`}>
//               <div
//                 className="relative cursor-pointer mr-[15px]"
//                 onClick={() => setOpenWishlist(true)}
//               >
//                 <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
//                 <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
//                   {wishListItems && wishListItems.length}
//                 </span>
//               </div>
//             </div>

//             <div className={`${styles.normalFlex}`}>
//               <div
//                 className="relative cursor-pointer mr-[15px]"
//                 onClick={() => setOpenCart(true)}
//               >
//                 <AiOutlineShoppingCart
//                   size={30}
//                   color="rgb(255 255 255 / 83%)"
//                 />
//                 <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
//                   {cartItems && cartItems.length}
//                 </span>
//               </div>
//             </div>

//             <div className={`${styles.normalFlex}`}>
//               <div className="relative cursor-pointer mr-[15px]">
//                 {userInfo ? (
//                   <Link to="/profile">
//                     <img
//                       src={`${userInfo?.avatar?.url}`}
//                       className="w-[35px] h-[35px] rounded-full"
//                       alt=""
//                     />
//                   </Link>
//                 ) : (
//                   <Link to="/login">
//                     <CgProfile size={30} color="rgb(255 255 255 / 83%)" />
//                   </Link>
//                 )}
//               </div>
//             </div>

//             {/* cart popup */}
//             {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

//             {/* wishlist popup */}
//             {openWishlist ? (
//               <Wishlist setOpenWishlist={setOpenWishlist} />
//             ) : null}
//           </div>
//         </div>
//       </div>

//       {/* mobile header */}
//       <div
//         className={`${
//           active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
//         }
//         w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm 800px:hidden`}
//         >
//         <div className="w-full flex items-center justify-between">
//           <div>
//             <BiMenuAltLeft
//               size={40}
//               className="ml-4"
//               onClick={() => setOpenMobileMenu(true)}
//             />
//           </div>
//           <div>
//             <Link to="/">
//               <img
//                 src="https://shopo.quomodothemes.website/assets/images/logo.svg"
//                 alt=""
//                 className="mt-3 cursor-pointer"
//               />
//             </Link>
//           </div>
//           <div>
//             <div
//               className="relative mr-[20px]"
//               onClick={() => setOpenCart(true)}
//             >
//               <AiOutlineShoppingCart size={30} />
//               <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
//                 {cartItems && cartItems.length}
//               </span>
//             </div>
//           </div>
//           {/* cart popup */}
//           {openCart ? <Cart setOpenCart={setOpenCart} /> : null}

//           {/* wishlist popup */}
//           {openWishlist ? <Wishlist setOpenWishlist={setOpenWishlist} /> : null}
//         </div>

//         {/* header sidebar */}
//         {openMobileMenu && (
//           <div
//             className={`fixed w-full bg-[#0000005f] z-20 h-full top-0 left-0`}
//           >
//             <div className="fixed w-[70%] bg-[#fff] h-screen top-0 left-0 z-10 overflow-y-scroll">
//               <div className="w-full justify-between flex pr-3">
//                 <div>
//                   <div
//                     className="relative mr-[15px]"
//                     onClick={() => setOpenWishlist(true) || setOpenMobileMenu(false)}
//                   >
//                     <AiOutlineHeart size={30} className="mt-5 ml-3" />
//                     <span class="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px]  leading-tight text-center">
//                       {wishListItems && wishListItems.length}
//                     </span>
//                   </div>
//                 </div>
//                 <RxCross1
//                   size={30}
//                   className="ml-4 mt-5"
//                   onClick={() => setOpenMobileMenu(false)}
//                 />
//               </div>

//               <div className="my-8 w-[92%] m-auto h-[40px relative]">
//                 <input
//                   type="search"
//                   placeholder="Search Product..."
//                   className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//                 {searchData && (
//                   <div className="absolute bg-[#fff] z-10 shadow w-full left-0 p-3">
//                     {searchData.map((i) => {
//                       const d = i.name;

//                       const Product_name = d.replace(/\s+/g, "-");
//                       return (
//                         <Link to={`/product/${Product_name}`}>
//                           <div className="flex items-center">
//                             <img
//                               src={i.image_Url[0]?.url}
//                               alt=""
//                               className="w-[50px] mr-2"
//                             />
//                             <h5>{i.name}</h5>
//                           </div>
//                         </Link>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>

//               <Navbar active={activeHeading} />
//               <div className={`${styles.button} ml-4 !rounded-[4px]`}>
//                 <Link to="/store-create">
//                   <h1 className="text-[#fff] flex items-center">
//                     Become Seller <IoIosArrowForward className="ml-1" />
//                   </h1>
//                 </Link>
//               </div>
//               <br />
//               <br />
//               <br />

//               <div className="flex w-full justify-center">
//                 {userInfo ? (
//                   <div>
//                     <Link to="/profile">
//                       <img
//                         src={`${userInfo.avatar?.url}`}
//                         alt=""
//                         className="w-[60px] h-[60px] rounded-full border-[3px] border-[#0eae88]"
//                       />
//                     </Link>
//                   </div>
//                 ) : (
//                   <>
//                     <Link
//                       to="/login"
//                       className="text-[18px] pr-[10px] text-[#000000b7]"
//                     >
//                       Login /
//                     </Link>
//                     <Link
//                       to="/sign-up"
//                       className="text-[18px] text-[#000000b7]"
//                     >
//                       Sign up
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//     </>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import {
  XIcon,
  SearchIcon,
  HeartIcon,
  UserIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/solid";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { motion } from "framer-motion";

import styles from "../../styles/styles";
import Navbar from "./Navbar";
import CategoriesDropdown from "./CategoriesDropdown";
import Cart from "../cart/Cart";
import Wishlist from "../wishlist/Wishlist";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../redux/actions/categoryActions";

import HeaderBottom from "./HeaderBottom";
import HeaderUpper from "./HeaderUpper";

const Header = ({ activeHeading }) => {
  const { storeInfo } = useSelector((state) => state.storeLogin);
  const { categories } = useSelector((state) => state.categories);
  const { allProducts } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);

  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  console.log("ALL_PRODS", allProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  // console.log(categories)

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);

    const filteredProducts =
      allProducts &&
      allProducts?.filter((product) =>
        product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );

    setSearchData(filteredProducts);
    console.log("Searched", searchData);
  };
  // Reset searchData when input is cleared
  useEffect(() => {
    if (searchTerm === "") {
      setSearchData(null);
    }
  }, [searchTerm, setSearchData]);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  return (
    <div className="w-full sticky top-0 z-50">
        {/* HeaderUpper component */}
        <HeaderUpper
          categories={categories}
          handleSearchChange={handleSearchChange}
          searchData={searchData}
          setSearchData={setSearchData}
        />

      {/* Sidebar */}
      {sidebar && (
        <motion.div
          initial={{ x: 0, opacity: 1 }}
          animate={{ x: -500, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-0 right-0 w-[350px] h-full z-50  bg-[#131921] bg-opacity-50 text-white"
        >
          <div className="w-full bg-[#232F3E] text-white py-2 px-6 flex items-center gap-4">
            <h3 className="font-titleFont font-bold text-lg tracking-wide">
              Hello, Sign In
            </h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md">
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="text-white py-1 hover:bg-gray-700 cursor-pointer"
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
          <span
            onClick={() => setSidebar(false)}
            className="absolute top-2 right-2 text-white cursor-pointer"
          >
            <XIcon className="h-5 w-5" />
          </span>
        </motion.div>
      )}

      {/* Adding the HeaderBottom component */}
      <HeaderBottom
        categories={categories}
        active={activeHeading}
        handleSearchChange={handleSearchChange}
        searchData={searchData}
        setSearchData={setSearchData} 
      /> 
    </div>
  );
};

export default Header;
