import React from "react";
import DashboardHeader from "../../components/store/layout/DashboardHeader";
import DashboardSideBar from "../../components/store/layout/DashboardSideBar";
import AllEvents from "../../components/store/AllEvents";

const StoreAllEventsPage = () => {
  return (
    <div>
      <DashboardHeader />

      <div className="flex justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSideBar active={5} />
        </div>

        <div className="w-full flex justify-center">
            <AllEvents />
        </div>
      </div>
    </div>
  );
};



export default StoreAllEventsPage