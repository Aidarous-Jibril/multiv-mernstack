import React from 'react'
import { Link } from 'react-router-dom'
import { navItems } from '../../static/data'
import styles from '../../styles/styles'

const Navbar = ({active}) => {
  return (
    <div className={`block 800px:${styles.normalFlex}`}>
         {
            navItems && navItems.map((item,index) => (
                <div className="flex">
                    <Link to={item.url} key={item.index}
                    className={`${active === index + 1 ? 
                      "text-[red] font-bold" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer}`}
                    >
                    {item.title}
                    </Link>
                </div>
            ))
         }
    </div>
  )
}

export default Navbar
