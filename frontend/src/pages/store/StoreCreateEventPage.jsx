import React from "react";
import CreateEvent from "../../components/store/CreateEvent";
import DashboardHeader from "../../components/store/layout/DashboardHeader";
import DashboardSideBar from "../../components/store/layout/DashboardSideBar";

const StoreCreateEventPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="w-full flex justify-between items-center">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={6} />
        </div>

        <div className="w-full flex justify-center items-center">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default StoreCreateEventPage;
