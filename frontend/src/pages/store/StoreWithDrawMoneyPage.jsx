import React from 'react'
import StoreWithDrawMoney from '../../components/store/StoreWithDrawMoney'
import DashboardHeader from '../../components/store/layout/DashboardHeader'
import DashboardSideBar from '../../components/store/layout/DashboardSideBar'

const StoreWithDrawMoneyPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={7} />
            </div>
            <StoreWithDrawMoney />
        </div>
    </div>
  )
}

export default StoreWithDrawMoneyPage