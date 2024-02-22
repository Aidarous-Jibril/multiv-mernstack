import React, { useEffect} from 'react'
import StoreLogin from '../components/store/StoreLogin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const StoreLoginPage = () => {
  const navigate = useNavigate();
  const { storeInfo } = useSelector((state) => state.storeLogin);

  useEffect(() => {
    if(storeInfo){
      navigate(`/dashboard`);
    }
  }, [storeInfo])

  
  return (
    <div><StoreLogin /></div>
  )
}

export default StoreLoginPage