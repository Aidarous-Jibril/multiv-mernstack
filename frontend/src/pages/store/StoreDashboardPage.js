import React, { useState } from 'react'
import DashboardHeader from '../../components/store/layout/DashboardHeader'
import DashboardSideBar from '../../components/store/layout/DashboardSideBar'
import DashboardHero from '../../components/store/layout/DashboardHero'



const StoreDashboardPage = () => {
    const [active, setActive] = useState(1)
  return (
    <>
        <DashboardHeader />

        <div className='w-full flex justify-between items-center' >
          <div className='w-[100px] 800px:w-[330px]'>
            <DashboardSideBar active={1}/>
          </div>
          <DashboardHero />
        </div>
    </>
  )
}

export default StoreDashboardPage