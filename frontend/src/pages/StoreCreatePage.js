import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StoreCreate from '../components/store/StoreCreate'
import { useSelector } from 'react-redux';

const StoreCreatePage = () => {
  const navigate = useNavigate();
  const { storeInfo } = useSelector((state) => state.storeRegister);
console.log(storeInfo)

  useEffect(() => {
    if(storeInfo){
      navigate("/");
    }
  }, [storeInfo])
  
  return (
    <div>
      <StoreCreate />
    </div>
  )
}

export default StoreCreatePage