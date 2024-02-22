import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const DropDown = ({ categories, setDropDown }) => {
  const navigate = useNavigate();
  
  const handleSubmit = (i) => {
    navigate(`/products?category=${i.name.toLowerCase()}`);
    setDropDown(false);
    window.location.reload();
  };

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      {categories &&
        categories?.map((item, index) => (
          <div
            key={index}
            className={`${styles.normalFlex}`}
            onClick={() => handleSubmit(item)}
          >
            <img
              src={item.image_Url}
              style={{
                width: "25px",
                height: "25px",
                objectFit: "contain",
                marginLeft: "10px",
                userSelect: "none",
              }}
              alt=""
            />
            <h3 className="m-3 cursor-pointer select-none">{item.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default DropDown;

// import React from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";

// const DropDown = ({ categories, setDropDown }) => {
//   const navigate = useNavigate();

//   const handleSubmit = (category) => {
//     if (category.subcategories && category.subcategories.length > 0) {
//       // If the category has subcategories, recursively render them
//       return (
//         <div key={category._id} className={`${styles.normalFlex}`}>
//           <h3 className="m-3 cursor-pointer select-none">{category.name}</h3>
//           <div className="pl-5">
//             {category.subcategories.map((subcategory) => (
//               <div
//                 key={subcategory._id}
//                 className={`${styles.normalFlex}`}
//                 onClick={() => handleSubmit(subcategory)}
//               >
//                 <h3 className="m-3 cursor-pointer select-none">
//                   {subcategory.name}
//                 </h3>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
//     } else {
//       // If the category doesn't have subcategories, navigate to the category page
//       navigate(`/products?category=${category.name.toLowerCase()}`);
//       setDropDown(false);
//       window.location.reload();
//     }
//   };

//   return (
//     <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
//       {categories &&
//         categories.map((category) => (
//           <div
//             key={category._id}
//             className={`${styles.normalFlex}`}
//             onClick={() => handleSubmit(category)}
//           >
//             <h3 className="m-3 cursor-pointer select-none">{category.name}</h3>
//           </div>
//         ))}
//     </div>
//   );
// };

// // export default DropDown;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";

// const DropDown = ({ categories }) => {
//   const navigate = useNavigate();
//   const [activeCategory, setActiveCategory] = useState(null);

//   const handleMainCategoryClick = (category) => {
//     // Set active category when clicked
//     setActiveCategory(category);
//   };

//   const handleCategoryClick = (category) => {
//     // Navigate to the category page when a category is clicked
//     navigate(`/products?category=${category.name.toLowerCase()}`);
//   };

//   const handleSubCategoryClick = (subcategory) => {
//     // Navigate to the subcategory page when a subcategory is clicked
//     navigate(`/products?subcategory=${subcategory.name.toLowerCase()}`);
//   };

//   const dropdownStyles = {
//     position: 'relative',
//     display: 'inline-block',
//   };

//   const dropdownContentStyles = {
//     display: 'none',
//     position: 'absolute',
//     backgroundColor: '#f9f9f9',
//     minWidth: '160px',
//     boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)',
//     zIndex: '1',
//   };

//   const dropdownLinkStyles = {
//     color: 'black',
//     padding: '12px 16px',
//     textDecoration: 'none',
//     display: 'block',
//   };

//   const handleDropdownHover = () => {
//     setActiveCategory(null);
//   };

//   return (
//     <div style={dropdownStyles} onMouseLeave={handleDropdownHover}>
//       <div style={dropdownContentStyles}>
//         {categories.map((category) => (
//           <div
//             key={category._id}
//             className={`${styles.normalFlex}`}
//             onClick={() => handleMainCategoryClick(category)}
//             onMouseEnter={() => setActiveCategory(category)}
//           >
//             <h3 style={dropdownLinkStyles}>{category.name}</h3>
//           </div>
//         ))}
//       </div>
//       {/* Show subcategories if an active category is set */}
//       {activeCategory && activeCategory.subcategories && (
//         <div style={dropdownContentStyles}>
//           {activeCategory.subcategories.map((subcategory) => (
//             <div
//               key={subcategory._id}
//               className={`${styles.normalFlex}`}
//               onClick={() => handleSubCategoryClick(subcategory)}
//             >
//               <h3 style={dropdownLinkStyles}>{subcategory.name}</h3>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DropDown;
