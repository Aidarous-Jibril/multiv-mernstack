import React from "react";
import DashboardHeader from "../../components/store/layout/DashboardHeader";
import DashboardSideBar from "../../components/store/layout/DashboardSideBar";
import StoreAllOrders from "../../components/store/StoreAllOrders";

const StoreAllOrdersPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <StoreAllOrders />
        </div>
      </div>
    </div>
  );
};

export default StoreAllOrdersPage;
