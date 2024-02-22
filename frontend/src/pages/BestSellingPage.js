import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import styles from "../styles/styles";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/product/ProductCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [data, setData] = useState([]);
console.log(allProducts)
  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    setData(sortedData);
  }, [allProducts]);
  console.log("SORTED_DATGA", data)

  return (
    <>
      {isLoading ? (
        <h4>Laoding...</h4>
      ) : (
        <div>
          <Header activeHeading={3} />
          <br />
          <br />
          <div className={`${styles.section}`}>
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
              {data &&
                data.map((item, index) => (
                  <ProductCard data={item} key={index} />
                ))}
            </div>
            {data && data.length === 0 ? (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No products Found!
              </h1>
            ) : null}
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;
