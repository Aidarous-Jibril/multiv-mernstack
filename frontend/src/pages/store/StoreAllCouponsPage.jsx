import React from "react";
import DashboardHeader from "../../components/store/layout/DashboardHeader";
import DashboardSideBar from "../../components/store/layout/DashboardSideBar";
import AllCoupons from "../../components/store/AllCoupons";

const StoreAllCouponsPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>

        <div className="w-full flex justify-center">
            <AllCoupons />
        </div>
      </div>
    </div>
  );
};



export default StoreAllCouponsPage