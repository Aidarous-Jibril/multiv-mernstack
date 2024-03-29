import React from "react";
import DashboardHeader from "../../components/store/layout/DashboardHeader";
import DashboardSideBar from "../../components/store/layout/DashboardSideBar";
import AllProducts from "../../components/store/AllProducts";

const StoreAllProductsPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={3} />
        </div>

        <div className="w-full flex justify-center">
            <AllProducts />
        </div>
      </div>
    </div>
  );
};



export default StoreAllProductsPage