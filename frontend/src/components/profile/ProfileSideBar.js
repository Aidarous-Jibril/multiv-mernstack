import React, { useEffect } from 'react'
import { RxPerson } from 'react-icons/rx'
import { AiOutlineMessage, AiOutlineLogout } from 'react-icons/ai'
import { MdPayment } from 'react-icons/md'
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from 'react-icons/hi'
import {
    MdOutlineAdminPanelSettings,
    MdOutlinePassword,
    MdOutlineTrackChanges,
  } from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RiLockPasswordLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/actions/userActions'



const ProfileSideBar = ({ active, setActive }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logoutUser())
        toast.success("User logged out");
        window.location.reload(false)
        navigate("/");
    }

  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] p-4 pt-8">
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(1)}
        >
            <RxPerson size={20} color={active === 1 ? "red": ""} />
            <span className={`${active === 1 ? "text-[red]" : ""} pl-3 hidden  800px:block `} >Profile</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(2)}
        >
            <HiOutlineShoppingBag size={20} color={active === 2 ? "red": ""} />
            <span className={`${active === 2 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Orders</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(3)}
        >
            <MdOutlineTrackChanges size={20} color={active === 3 ? "red": ""} />
            <span className={`${active === 3 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Track Order</span>
        </div>

        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(4)}
        >
            <HiOutlineReceiptRefund size={20} color={active === 4 ? "red": ""} />
            <span className={`${active === 4 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Refunds</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(5)  || navigate("/user/inbox")} 
        >
            <AiOutlineMessage size={20} color={active === 5 ? "red": ""} />
            <span className={`${active === 5 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Inbox</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(6)}
        >
            <RiLockPasswordLine size={20} color={active === 6 ? "red": ""} />
            <span className={`${active === 6 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Change Password</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(7)}
        >
            <TbAddressBook size={20} color={active === 7 ? "red": ""} />
            <span className={`${active === 7 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Address</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(8)}
        >
            <MdPayment size={20} color={active === 8 ? "red": ""} />
            <span className={`${active === 8 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Payment Method</span>
        </div>
        <div
            className="flex items-center cursor-pointer w-full mb-8"
            onClick={() => setActive(9) || logoutHandler()}
        >
            <AiOutlineLogout size={20} color={active === 9 ? "red": ""} />
            <span className={`${active === 9 ? "text-[red]" : ""} pl-3 hidden  800px:block`} >Logout</span>
        </div>
        
    </div>
  )
}

export default ProfileSideBar