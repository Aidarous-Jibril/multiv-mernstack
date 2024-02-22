import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import ProductCard from "../product/ProductCard";
import { useSelector } from "react-redux";

const SuggestedProducts = ({ data }) => {
  const {allProducts} = useSelector((state) => state.products);
  const [productsData, setProductsData] = useState();

  useEffect(() => {
    if (data && allProducts) {
      const filteredProducts = allProducts.filter((item) =>
        compareCategories(item, data)
      );
      setProductsData(filteredProducts);
    }
  }, [data, allProducts]);

  // Helper function to compare category IDs
  const compareCategories = (item, data) => {
    console.log("SAME_CAT", item, data)
    return (
      item.mainCategory === data.mainCategory &&
      item.subCategory === data.subCategory &&
      item.subSubCategory === data.subSubCategory
    );
  };

  return (
    <>
      {data ? (
        <div className={`${styles.section} p-4`}>
          <h2
            className={`${styles.heading} text-[24px] font-[500] border-b mb-5`}
          >
            Related Products
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
            {productsData &&
              productsData?.map((item, index) => (
                <ProductCard data={item} key={index} />
              ))}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SuggestedProducts;
