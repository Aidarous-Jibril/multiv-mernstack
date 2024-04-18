import React, { useEffect, useState } from "react";
import { XIcon} from "@heroicons/react/solid";
import { motion } from "framer-motion";

import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../redux/actions/categoryActions";

import HeaderBottom from "./HeaderBottom";
import HeaderUpper from "./HeaderUpper";

const Header = ({ activeHeading }) => {
  const { categories } = useSelector((state) => state.categories);
  const { allProducts } = useSelector((state) => state.products);

  const [searchData, setSearchData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [active, setActive] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

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
      <div className={active === true ? "w-full shadow-sm fixed top-0 left-0 z-10" : null} >
        <HeaderUpper
          categories={categories}
          handleSearchChange={handleSearchChange}
          searchData={searchData}
          setSearchData={setSearchData}
        />
      </div>

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
        setActive={setActive}
        handleSearchChange={handleSearchChange}
        searchData={searchData}
        setSearchData={setSearchData}
      />
    </div>
  );
};

export default Header;
