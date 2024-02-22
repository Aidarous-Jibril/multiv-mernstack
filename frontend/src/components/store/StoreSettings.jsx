import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/styles';
import { toast } from 'react-toastify';
import { AiOutlineCamera } from 'react-icons/ai';
import axios from 'axios';
import { updateStoreInformation } from '../../redux/actions/storeActions';

const StoreSettings = () => {
    const { storeInfo, successMessage, error } = useSelector((state) => state.storeLogin);
    const [avatar, setAvatar] = useState("");
    const [name, setName] = useState(storeInfo && storeInfo.name);
    const [description, setDescription] = useState(
      storeInfo && storeInfo.description ? storeInfo.description : ""
    );
    const [address, setAddress] = useState(storeInfo && storeInfo.address);
    const [phoneNumber, setPhoneNumber] = useState(storeInfo && storeInfo.phoneNumber);
    const [zipCode, setZipcode] = useState(storeInfo && storeInfo.zipCode);
  
    const dispatch = useDispatch();

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch({ type: "clearErrors" });
      }
      if (successMessage) {
        toast.success(successMessage);
        dispatch({ type: "clearMessages" });
      }
    }, [dispatch, error, successMessage, storeInfo]);
  
    const updateStoreHandler = (e) => {
      e.preventDefault();
      const id = storeInfo._id;
      dispatch(updateStoreInformation(name, description, address, phoneNumber, zipCode, id));
    };
  
    // update avatar
    const handleImage = async (e) => {
      const id = storeInfo._id;

      const reader = new FileReader();
      reader.onload = () => {

        if (reader.readyState === 2) {
          setAvatar(reader.result);
          axios.put(
              `/api/stores/update-avatar/${id}`,
              { avatar: reader.result },
              {
                withCredentials: true,
              }
            )
            .then((response) => {
              console.log(response)
              localStorage.setItem("storeInfo", JSON.stringify(response.data.store));
              window.location.reload();
              // dispatch(loadUser());
              toast.success(response.data.successMessage);
            })
            .catch((error) => {
              toast.error(error);
            });
        }
      };
      // avatar can't be called here since it's same func
      reader.readAsDataURL(e.target.files[0]);
    };

  return (
    <>
    <div className="w-full">
    <div className="flex justify-center w-full">
      <div className="relative">
        <img
          src={`${storeInfo?.avatar?.url ? storeInfo?.avatar?.url : "https://logowik.com/content/uploads/images/shop-app6999.jpg"}`}
          className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
          al
        />
        <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
          <input
            type="file"
            id="image"
            className="hidden"
            onChange={handleImage}
          />
          <label htmlFor="image">
            <AiOutlineCamera />
          </label>
        </div>
      </div>
    </div>

    <br />
    <br />
    <div className="w-full px-5">
      <form onSubmit={updateStoreHandler} aria-required={true}>
        <div className="w-full 800px:flex block pb-3">
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Name</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Address</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Description</label>
            <input
              type="text"
              className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full 800px:flex block pb-3">
          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className=" w-[100%] 800px:w-[50%]">
            <label className="block pb-2">zip Code</label>
            <input
              type="number"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
        </div>
        <input
          className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Update"
          type="submit"
        />
      </form>
    </div>
    </div>
  </>
  );
};


export default StoreSettings