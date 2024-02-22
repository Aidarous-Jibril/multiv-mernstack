import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getStoreAllOrders } from '../../redux/actions/orderActions';
import styles from '../../styles/styles';

const StoreWithDrawMoney = () => {
    const { orders } = useSelector((state) => state.orders);
    const { storeInfo } = useSelector((state) => state.storeLogin);
    const [deliveredOrders, setDeliveredOrders] = useState(null)
    const dispatch = useDispatch();
  
    useEffect(() => {
       dispatch(getStoreAllOrders(storeInfo._id));
  
       const orderData = orders && orders.filter(ord => ord.status === "Refund Success")
       setDeliveredOrders(orderData)
    }, [dispatch]);
  
    // const availableBalance = 99
         const totalEarningWithoutTax = deliveredOrders && deliveredOrders.reduce((tot, item) => tot + item.totalPrice, 0 );
       const serviceCharge = totalEarningWithoutTax * 0.05;
       const availableBalance =  totalEarningWithoutTax - serviceCharge.toFixed(2);;

       
  return (
    <div className='w-full h-[90vh] p-8'>
        <div className='w-full h-full bg-white flex flex-col justify-center items-center'>
           <h1 className='text-gray-600 text-2xl pb-4'>Available Balance: <span className='text-black'>${availableBalance}</span></h1>
           <div className={`${styles.button} text-white !h-[44px]`}>
                Withdraw
           </div>
        </div>
    </div>
  )
}

export default StoreWithDrawMoney