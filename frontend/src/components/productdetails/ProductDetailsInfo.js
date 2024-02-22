import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import Ratings from "../product/Ratings";  
import { storeGetAllProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
  
  
const ProductDetailsInfo = ({ data, }) => {
  const { products } = useSelector((state) => state.products);
  const [active, setActive] = useState(1);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(storeGetAllProducts(data && data?.store._id));
    // if (wishlist && wishlist.find((i) => i._id === data?._id)) {
    //   setClick(true);
    // } else {
    //   setClick(false);
    // }
  }, [data]);
  
  console.log(data)

  const totalReviewsLength =
  products &&
  products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
  );

const avg =  totalRatings / totalReviewsLength || 0;

const averageRating = avg.toFixed(1);
  
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded">
        {/* Upper part */}
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>

       {/* Lower part */}
      {active === 1 ? (
        <>
          <p className="py-2 text-[16px] leading-8 pb-10 whitespace-pre-line">
            {data.description}
          </p>
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data?.reviews?.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${item.user.avatar?.url}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={item.rating} key={index}/>
                  </div>
                  <p className="text-gray-500 text-sm" >{item.comment}</p>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data?.reviews?.length === 0 && (
              <h5>No Reviews have for this data!</h5>
            )}
          </div>

        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[70%]">
            <Link to={`/store/preview/${data.store._id}`}>
              <div className="flex items-center">
                <img
                  src={`${data?.store?.imageUrl ? data?.store?.imageUrl : 'https://logowik.com/content/uploads/images/shop-app6999.jpg'} `}
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                  <h3 className={`${styles.shop_name} text-lg`}>{data.store.name}</h3>
                  <h5 className="pb-2 text-[15px]">
                    ({averageRating}/5) Ratings
                  </h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">What matter to us is your satisfaction. We're a razor and grooming company that was featured on Shark Tank.</p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="text-gray-500">
                Joined on:{" "}
                <span className="text-gray-900">
                  {data.createdAt?.slice(0, 10)}
                </span>
              </h5>
              <h5 className="text-gray-500 pt-3">
                Total Products:{" "}
                <span className="text-gray-900">
                  {products && products.length}
                </span>
              </h5>
              <h5 className="text-gray-500 pt-3">
                Total Reviews:{" "}
                <span className="text-gray-900">{totalReviewsLength}</span>
              </h5>
              <Link 
                to={`/store/preview/${data?.store._id}`} >
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsInfo;
