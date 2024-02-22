import React from 'react'
import Header from '../../components/layout/Header'
import Footer from '../../components/layout/Footer'
import UserTrackOrder from '../../components/user/UserTrackOrder'

const UserTrackOrderPage = () => {
  return (
    <div>
      <Header />
        <UserTrackOrder />
        <Footer />
    </div>
  )
}

export default UserTrackOrderPage