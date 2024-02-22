import React from 'react'
import DashboardHeader from '../../components/store/layout/DashboardHeader';
import DashboardSideBar from '../../components/store/layout/DashboardSideBar';
import StoreAllRefundOrders from '../../components/store/StoreAllRefundOrders';

const StoreAllRefundsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-full justify-center flex">
          <StoreAllRefundOrders />
        </div>
      </div>
    </div>
  );
}

export default StoreAllRefundsPage