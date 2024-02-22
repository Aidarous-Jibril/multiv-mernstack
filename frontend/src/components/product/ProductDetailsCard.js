import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage, AiOutlineShoppingCart } from 'react-icons/ai';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../redux/actions/cartActions';
import { addItemToWishList, removeItemFromWishList } from '../../redux/actions/wishListActions';
import axios from 'axios';


const ProductDetailsCard = ({setOpenModal, data }) => {
  const { userInfo } = useSelector(state => state.auth)
  // const [select, setSelect] = useState(false)
  const { cartItems } = useSelector((state) => state.cart);
  const { wishListItems } = useSelector((state) => state.wishList);
  const [addToWishList, setAddToWishList] = useState(false)
  const [count, setCount] = useState(0)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  useEffect(() => {
    if(wishListItems && wishListItems.find((item) => item._id === data._id)) {
      setAddToWishList(true)
    } else {
      setAddToWishList(false)
    }
  }, [wishListItems])

  const removeFromWishlistHandler = (data) => {
    setAddToWishList(!addToWishList)
    dispatch(removeItemFromWishList(data))
 }
 const addToWishlistHandler = (data) => {
  console.log("addToWishlistHandler")
     setAddToWishList(!addToWishList)
     dispatch(addItemToWishList(data))
 }

 const addToCartHandler = (id) => {
  const isItemExists = cartItems && cartItems.find((i) => i._id === id);
  if (isItemExists) {
    toast.error("Item already in cart!");
  } else {
    if (data.stock < count) {
      toast.error("Product stock limited!");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addItemToCart(cartData));
      toast.success("Item added to cart successfully!");
    }
  }
};

const handleMessageSubmit = async () => {
  if(userInfo) {
    const groupTitle = data?._id + userInfo?._id;
    const userId = userInfo?._id;
    const sellerId = data?.storeId;
    try {
      const { data } = await axios.post(`/api/conversations/create-new-conversation`, { 
        groupTitle,
        userId,
        sellerId,
      })
      navigate(`/inbox?${data.conversation._id}`);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  } else {
    toast.error("Please login to create a conversation");
  }
}  

  return (
    <div className="bg-[#fff]">
    {data ? (
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50"
            onClick={() => setOpenModal(false)}
          />

          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <img src={`${data.images && data.images[0]?.url}`} alt="" />
              <div className="flex my-4">
                <Link to={`/store/preview/${data.store._id}`} className="flex">
                  <img
                    src={`${data.images && data.images[0]?.url}`}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {data.store.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">{data?.ratings} Ratings</h5>
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                onClick={handleMessageSubmit}
              >
                <span className="text-[#fff] flex items-center">
                  Contact seller <AiOutlineMessage className="ml-1" />
                </span>
              </div>
              <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
            </div>

            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
              <h1 className={`${styles.dataTitle} text-[20px]`}>
                {data.name}
              </h1>
              <p>{data.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.dataDiscountPrice}`}>
                  {data.discountPrice}$
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + "$" : null}
                </h3>
              </div>
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <div>
                  {addToWishList ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => removeFromWishlistHandler(data)}
                      color={addToWishList ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addToWishlistHandler(data)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                onClick={() => addToCartHandler(data._id)}
              >
                <span className="text-[#fff] flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null}
  </div>

  )
}

export default ProductDetailsCard