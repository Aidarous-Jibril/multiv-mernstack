import React from 'react'
import DashboardHeader from '../../components/store/layout/DashboardHeader'
import DashboardSideBar from '../../components/store/layout/DashboardSideBar'
import DashboardMessages from '../../components/store/DashboardMessages'

const StoreMessagesPage = () => {
  return (
    <div>
    <DashboardHeader />
    <div className="flex items-start justify-between w-full">
      <div className="w-[80px] 800px:w-[330px]">
        <DashboardSideBar active={8} />
      </div>
       <DashboardMessages />
    </div>
  </div>
  )
}

export default StoreMessagesPage