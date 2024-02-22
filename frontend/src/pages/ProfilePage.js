import React, { useState } from 'react'
import styles from '../styles/styles'
import ProfileSideBar from '../components/profile/ProfileSideBar'
import ProfileContent from '../components/profile/ProfileContent'
import Header from '../components/layout/Header'

const ProfilePage = () => {
  const [active, setActive] = useState(1)

  return (
    <>
        <Header />
        <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
            <div className='w-[50px] 800px:w-[335px]'>
                <ProfileSideBar active={active} setActive={setActive} />
            </div>

            <ProfileContent active={active} />
        </div>
    </>
  )
}

export default ProfilePage