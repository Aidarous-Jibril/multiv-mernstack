import React from "react";
import DashboardHeader from "../../components/store/layout/DashboardHeader";
import DashboardSideBar from "../../components/store/layout/DashboardSideBar";
import CreateProduct from "../../components/store/CreateProduct";

const StoreCreateProductPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between items-center">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={4} />
        </div>

        <div className="w-full flex justify-center items-center">
            <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default StoreCreateProductPage;
