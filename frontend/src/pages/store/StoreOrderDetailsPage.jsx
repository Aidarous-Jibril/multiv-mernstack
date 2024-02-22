import React from 'react'
import DashboardHeader from '../../components/store/layout/DashboardHeader'
import StoreOrderDetails from '../../components/store/StoreOrderDetails'
import Footer from '../../components/layout/Footer'


const StoreOrderDetailsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <StoreOrderDetails/>
        <Footer />
    </div>
  )
}

export default StoreOrderDetailsPage