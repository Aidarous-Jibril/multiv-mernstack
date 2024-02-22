import React from 'react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import CheckoutSteps from '../components/Checkout/CheckoutSteps'
import Payment from '../components/payment/Payment'

const PaymentPage = () => {
  return (
    <div>
        <Header />
       <br />
       <br />
       <CheckoutSteps active={2} />
       <Payment />
       <br />
       <br />
       <Footer />
    </div>
  )
}

export default PaymentPage