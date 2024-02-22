import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import { Link, useNavigate, useParams } from "react-router-dom";
import { logoutStore } from "../../redux/actions/storeActions";
import { toast } from "react-toastify";

import { getStoreInfo } from "../../redux/actions/storeActions";
import Loader from "../layout/Loader";

const StoreInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const { storeInfo, loading } = useSelector((state) => state.storeLogin);
  
  // console.log("STORE_INFO", storeInfo)
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getStoreInfo(id));
  }, [id]);

  const logoutHandler = () => {
    dispatch(logoutStore());
    toast.success("User logged out successfully");
    window.location.reload(false)
    navigate("/");
  };

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

  const averageRating = totalRatings / totalReviewsLength || 0;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div className="w-full py-5">
            <div className="  flex item-center justify-center">
              <img
                src={`${storeInfo?.avatar?.url ? storeInfo?.avatar?.url : "https://images.assetsdelivery.com/compings_v2/marsono/marsono1804/marsono180400465.jpg" }`}
                alt=""
                className="w-24 h-24 object-cover rounded-full"
              />
            </div>
            <h3 className="text-center py-2 text-[20px]">{storeInfo?.name}</h3>
            <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
              {storeInfo?.description}
            </p>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Address</h5>
            <h4 className="text-[#000000a6]">{storeInfo?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Phone Number</h5>
            <h4 className="text-[#000000a6]">{storeInfo?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Total Products</h5>
            <h4 className="text-[#000000a6]">{products && products.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Shop Ratings</h5>
            <h4 className="text-[#000000b0]">{averageRating}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Joined On</h5>
            <h4 className="text-[#000000b0]">
              {storeInfo?.createdAt?.slice(0, 10)}
            </h4>
          </div>
          {isOwner && (
            <div className="py-3 px-4">
              <Link to="/settings">
                <div
                  className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                >
                  <span className="text-white">Edit Shop</span>
                </div>
              </Link>
              <div
                className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
                onClick={logoutHandler}
              >
                <span className="text-white">Log Out</span>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StoreInfo;
