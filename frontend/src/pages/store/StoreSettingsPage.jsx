import React from 'react'
import StoreSettings from '../../components/store/StoreSettings'
import DashboardHeader from '../../components/store/layout/DashboardHeader'
import DashboardSideBar from '../../components/store/layout/DashboardSideBar'

const StoreSettingsPage = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
            <DashboardSideBar active={11} />
            </div>
            <StoreSettings />
        </div>
    </div>
  )
}

export default StoreSettingsPage