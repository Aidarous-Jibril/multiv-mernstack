import React, { useEffect } from 'react'
import SignUp from '../../components/signup/SignUp'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate("/");
    }
  }, [userInfo])
  
  return (
    <div>
      <SignUp />
    </div>
  )
}

export default RegisterPage