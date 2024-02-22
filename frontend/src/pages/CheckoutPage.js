import React, { useState } from 'react'
import styles from '../styles/styles'
import ProfileSideBar from '../components/profile/ProfileSideBar'
import ProfileContent from '../components/profile/ProfileContent'
import Header from '../components/layout/Header'
import Checkout from '../components/Checkout/Checkout'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Footer from '../components/layout/Footer'

const CheckoutPage = () => {
    const [active, setActive] = useState(1)
  return (
    <>
      {/* <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <CheckoutSteps active={1} />
        <br />
        <br />
        <Checkout />
      </div> */}
       <Header />
        <br />
        <br />
        <CheckoutSteps active={1} />
        <Checkout />
        <br />
        <br />
        <Footer />
    </>
  )
}

export default CheckoutPage