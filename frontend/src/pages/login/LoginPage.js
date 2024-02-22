import React, {useEffect, useState,} from 'react'
import { useSelector } from 'react-redux';

import SignIn from '../../components/signin/SigIn'
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate(`/profile`);
    }
  }, [userInfo])

  return (
    <div>
        <SignIn />
    </div>
  )
}

export default LoginPage