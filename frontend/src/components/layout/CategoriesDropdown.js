// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";

// const DropDown = ({ categories, setDropDown }) => {
//   console.log(categories)
//   const navigate = useNavigate();
  
//   const handleSubmit = (i) => {
//     navigate(`/products?category=${i.name.toLowerCase()}`);
//     setDropDown(false);
//     window.location.reload();
//   };

//   return (
//     <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
//       {categories &&
//         categories?.map((item, index) => (
//           <div
//             key={index}
//             className={`${styles.normalFlex}`}
//             onClick={() => handleSubmit(item)}
//           >
//             <img
//               src={item.image_Url}
//               style={{
//                 width: "25px",
//                 height: "25px",
//                 objectFit: "contain",
//                 marginLeft: "10px",
//                 userSelect: "none",
//               }}
//               alt=""
//             />
//             <h3 className="m-3 cursor-pointer select-none">{item.name}</h3>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default DropDown;

// import React, { useState } from 'react';
// import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

// const CategoriesDropdown = ({ categories, isOpen }) => {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [selectedSubSubcategory, setSelectedSubSubcategory] = useState(null);

//   const handleCategoryClick = (event, category) => {
//     event.stopPropagation();
//     setSelectedCategory(selectedCategory === category ? null : category);
//     setSelectedSubcategory(null);
//     setSelectedSubSubcategory(null);
//   };

//   const handleSubcategoryClick = (event, subcategory) => {
//     event.stopPropagation();
//     setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory);
//     setSelectedSubSubcategory(null);
//   };

//   const handleSubSubcategoryClick = (event, subsubcategory) => {
//     event.stopPropagation();
//     setSelectedSubSubcategory(selectedSubSubcategory === subsubcategory ? null : subsubcategory);
//   };

//   return (
//     <div className="absolute left-0 top-[calc(100%+5px)] mt-1 w-64 bg-white shadow-lg rounded-lg z-10 px-4">
//     {/* <div className="absolute left-0 top-full -mt-1 w-64 bg-white shadow-lg rounded-lg z-10 px-4"> */}
//       {/* // <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm"> */}
//       {isOpen &&
//         categories.map((category, index) => (
//           <div key={index}>
//             <div
//               onClick={(event) => handleCategoryClick(event, category)}
//               className="flex items-center justify-between cursor-pointer mb-3"
//             >
//               <h3>{category.name}</h3>
//               {selectedCategory === category ? (
//                 <ChevronUpIcon className="w-5 h-5 text-gray-500" />
//               ) : (
//                 <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//               )}
//             </div>
//             {selectedCategory === category && (
//               <ul>
//                 {category.subcategories.map((subcategory, subIndex) => (
//                   <li key={subIndex} className="ml-4 mb-2">
//                     <div
//                       onClick={(event) => handleSubcategoryClick(event, subcategory)}
//                       className="flex items-center justify-between cursor-pointer"
//                     >
//                       <h3>{subcategory.name}</h3>
//                       {selectedSubcategory === subcategory ? (
//                         <ChevronUpIcon className="w-5 h-5 text-gray-500" />
//                       ) : (
//                         <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//                       )}
//                     </div>
//                     {selectedSubcategory === subcategory && (
//                       <ul className="ml-4">
//                         {subcategory.subsubcategories.map((subsubcategory, subsubIndex) => (
//                           <li key={subsubIndex} className="mb-1">
//                             <div
//                               onClick={(event) => handleSubSubcategoryClick(event, subsubcategory)}
//                               className="flex items-center justify-between cursor-pointer"
//                             >
//                               <h3>{subsubcategory.name}</h3>
//                               {/* Handle sub-subcategory icon here */}
//                             </div>
//                             {/* Handle sub-sub-subcategories here if needed */}
//                           </li>
//                         ))}
//                       </ul>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// };

// export default CategoriesDropdown;

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const CategoriesDropdown = ({ categories, isOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState(null);

  const handleCategoryClick = (event, category) => {
    event.stopPropagation();
    setSelectedCategory(selectedCategory === category ? null : category);
    setSelectedSubcategory(null);
    setSelectedSubSubcategory(null);
  };

  const handleSubcategoryClick = (event, subcategory) => {
    event.stopPropagation();
    setSelectedSubcategory(selectedSubcategory === subcategory ? null : subcategory);
    setSelectedSubSubcategory(null);
  };

  const handleSubSubcategoryClick = (event, subsubcategory) => {
    event.stopPropagation();
    setSelectedSubSubcategory(selectedSubSubcategory === subsubcategory ? null : subsubcategory);
  };

  return (
    <div className="relative">

    {isOpen && (
      <div className="absolute left-0 top-full mt-0 w-80 bg-white shadow-lg rounded-lg rounded-t-none z-10 px-4">

        {/* Dropdown content */}
        {categories.map((category, index) => (
          <div key={index} className="my-6">
            <div
              onClick={(event) => handleCategoryClick(event, category)}
              className="flex items-center justify-between cursor-pointer mb-4"
            >
              <h3>{category.name}</h3>
              {selectedCategory === category ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-500" />
              )}
            </div>
            {selectedCategory === category && (
              <ul>
                {category.subcategories.map((subcategory, subIndex) => (
                  <li key={subIndex} className="ml-4 mb-4">
                    <div
                      onClick={(event) => handleSubcategoryClick(event, subcategory)}
                      className="flex items-center justify-between cursor-pointer mb-3"
                    >
                      <h3>{subcategory.name}</h3>
                      {selectedSubcategory === subcategory ? (
                        <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    {selectedSubcategory === subcategory && (
                      <ul className="ml-4">
                        {subcategory.subsubcategories.map((subsubcategory, subsubIndex) => (
                          <li key={subsubIndex} className="mb-3">
                            <div
                              onClick={(event) => handleSubSubcategoryClick(event, subsubcategory)}
                              className="flex items-center justify-between cursor-pointer"
                            >
                              <h3>{subsubcategory.name}</h3>
                              {/* Handle sub-subcategory icon here */}
                            </div>
                            {/* Handle sub-sub-subcategories here if needed */}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    )}
  </div>
  
  );
};

export default CategoriesDropdown;
