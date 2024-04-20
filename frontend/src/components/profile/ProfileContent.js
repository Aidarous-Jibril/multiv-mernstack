import React, { useEffect, useState } from "react";
import {
  AiOutlineCamera,
  AiOutlineArrowRight,
  AiOutlineDelete,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx"
import { MdOutlineTrackChanges, MdTrackChanges } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";

// installed tailwind dependencies
import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { addUserAddress, deleteUserAddress, updateUserInformation } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserAllOrders } from "../../redux/actions/orderActions";

//Socket.IO
import io from 'socket.io-client';
const socket = io('http://localhost:3000');



const ProfileContent = ({ active }) => {
  const { userInfo, error, success, successMessage, } = useSelector( (state) => state.auth );
  // console.log("MSG", successMessage);
  const [name, setName] = useState(userInfo && userInfo.name);
  const [email, setEmail] = useState(userInfo && userInfo.email);
  const [phoneNumber, setPhoneNumber] = useState(
    userInfo && userInfo.phoneNumber
  );
  const [password, setPassword] = useState(userInfo && userInfo.password);
  const [avatar, setAvatar] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = userInfo._id;
    dispatch(updateUserInformation(name, email, phoneNumber, password, id));
  };

  // update avatar
  const handleImage = async (e) => {
    const id = userInfo._id;
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatar(reader.result);
        axios
          .put(
            `/api/users/update-avatar/${id}`,
            { avatar: reader.result },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            localStorage.setItem("userInfo", JSON.stringify(response.data.user));
            window.location.reload();
            console.log(response)
            // dispatch(loadUser());
            toast.success(response.data.msg);
          })
          .catch((error) => {
            toast.error(error.response.data.error);
          });
      }
    };
    // avatar can't be called here since it's same func
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <div className="w-full">
        {/* profile page */}
        {active === 1 && (
          <>
            <div className="flex justify-center w-full">
              <div className="relative">
                <img
                  src={`${userInfo?.avatar?.url}`}
                  className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                  al
                />
                <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                  <input
                    type="file"
                    id="image"
                    className="hidden"
                    onChange={handleImage}
                  />
                  <label htmlFor="image">
                    <AiOutlineCamera />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <br />
            <div className="w-full px-5">
              <form onSubmit={handleSubmit} aria-required={true}>
                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Full Name</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Email Address</label>
                    <input
                      type="text"
                      className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full 800px:flex block pb-3">
                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Phone Number</label>
                    <input
                      type="number"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>

                  <div className=" w-[100%] 800px:w-[50%]">
                    <label className="block pb-2">Enter your password</label>
                    <input
                      type="password"
                      className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <input
                  className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
                  required
                  value="Update"
                  type="submit"
                />
              </form>
            </div>
          </>
        )}

        {/* orders */}
        {active === 2 && (
          <div>
            <AllOrders />
          </div>
        )}
        {/* all orders */}
        {active === 3 && (
          <div>
            <TrackOrder />
          </div>
        )}
        {/* refund orders */}
        {active === 4 && (
          <div>
            <AllRefundOrders />
          </div>
        )}
        {/* user inbox */}
        {active === 5 && (
          <div>
            <Inbox />
          </div>
        )}
        {/* change user password */}
        {active === 6 && (
          <div>
            <ChangePassword />
          </div>
        )}
        {/* user address */}
        {active === 7 && (
          <div>
            <Address />
          </div>
        )}
        {/* inbox */}
        {active === 8 && (
          <div>
            <PaymentMethod />
          </div>
        )}
      </div>
    </>
  );
};

const AllOrders = () => {
  const { userInfo } = useSelector( (state) => state.auth );
  const { orders } = useSelector( (state) => state.orders );
// console.log(orders)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAllOrders(userInfo._id));
  }, []);

  const columns = [
    // table headers
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders?.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1 flex">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};


const TrackOrder = () => {
  const { userInfo } = useSelector( (state) => state.auth );
  const { orders } = useSelector( (state) => state.orders );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAllOrders(userInfo._id));
  }, []);

  const columns = [
    // table headers
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders?.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1 flex">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { userInfo } = useSelector( (state) => state.auth );
  const { orders, successMessage } = useSelector( (state) => state.orders );
  const dispatch = useDispatch();
  console.log(orders)
  useEffect(() => {
    dispatch(getUserAllOrders(userInfo._id));
  }, []);
  
  //get all refund olders
  const refundOrders = orders && orders.filter((item) => item.status === "Refund Success");
  console.log("REFUNDED_ORDERS", refundOrders)

  const columns = [
    // table headers
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  refundOrders &&
    refundOrders?.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item?.cart?.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
      });
    });
  return (
    <div className="pl-8 pt-1 flex">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};


const Inbox = () => {
  const { userInfo} = useSelector( (state) => state.auth );
  const { storeInfo} = useSelector( (state) => state.storeLogin );
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    const data = {
      sender: userInfo,
      receiver: storeInfo,
      message,
    };

    // Emit the message to the server
    socket.emit('chat', data);

    // Update the local state
    setMessages((prevMessages) => [...prevMessages, data]);
    setMessage('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};


const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios.put(
        `/api/users/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.msg);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  }

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div> 
  )
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState();
  const [street, setStreet] = useState("");
  const [addressType, setAddressType] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  // console.log(userInfo)
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault()
    if (addressType === "" || country === "" || state === "") {
      toast.error("Please fill all the fields!");
    } else {
      dispatch(
        addUserAddress(country, state, street, zipCode, addressType)
      );
      setOpen(false);
      setCountry("");
      setState("");
      setStreet("")
      setZipCode(null);
      setAddressType("");
    }
  }

  // delete address
  const handleDelete = (addressId) => {
    dispatch(deleteUserAddress(addressId))
  } 

  return (
    <div className="w-full px-5">
      {/* pop up modal */}
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[35%] h-[80vh] bg-white rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">State/Region</label>
                    <select
                      name=""
                      id=""
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        choose your state
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Street</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">Zip Code</label>
                    <input
                      type="number"
                      className={`${styles.input}`}
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                    />
                  </div>

                  <div className="w-full pb-2 mb-4">
                    <label className="block pb-1">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 px-4">My Addressess</h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white" onClick={() => setOpen(true)}>Add New</span>
        </div>
      </div>
      <br />

     { userInfo && userInfo?.addresses.map((item, index) => (
        <div className="w-full flex  justify-between items-center bg-white h-[80px] rounded-[4px] px-3 pr-10 shadow ">
          <div className="flex items-center">
            <h5 className="text-sm sm:text-md font-bold pl-5">{item.addressType}</h5>
          </div>
          <div className="flex items-center pl-8">
            <h6 className="text-sm sm:text-md ">{item.street} </h6>
            <h5 className="text-sm sm:text-md text-bold pl-6">
            {item.setZipCode} + {item.state}
            </h5>
          </div>
          <div className="text-sm sm:text-md flex items-center pl-8">
            <h6>{userInfo.phoneNumber}</h6>
          </div>
          <div>
            <AiOutlineDelete size={25} className="cursor-pointer text-[red]" onClick={() => handleDelete(item._id)}/>
          </div>
          <hr/>
        </div>
     ))}
      {userInfo && userInfo.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-xl font-bold text-slate-800 px-4">
          Payment Methods
        </h1>
        <div className={`${styles.button} !rounded-md`}>
          <span className="text-white" >Add New</span>
        </div>
      </div>
      <br />

      <div className="w-full flex justify-between items-center bg-white h-[90px] rounded-[4px] px-3 pr-10 shadow ">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 50 50"
          >
            <path d="M 5 7 C 2.25 7 0 9.25 0 12 L 0 38 C 0 40.75 2.25 43 5 43 L 45 43 C 47.75 43 50 40.75 50 38 L 50 12 C 50 9.25 47.75 7 45 7 Z M 5 9 L 45 9 C 46.667969 9 48 10.332031 48 12 L 48 38 C 48 39.667969 46.667969 41 45 41 L 5 41 C 3.332031 41 2 39.667969 2 38 L 2 12 C 2 10.332031 3.332031 9 5 9 Z M 29.6875 19.40625 C 26.585938 19.40625 25 20.933594 25 22.875 C 25 26.386719 29.0625 25.914063 29.0625 27.71875 C 29.0625 28.023438 28.828125 28.75 27.125 28.75 C 25.417969 28.75 24.3125 28.09375 24.3125 28.09375 L 23.78125 30.46875 C 23.78125 30.46875 24.886719 31.09375 27 31.09375 C 29.113281 31.09375 32.03125 29.476563 32.03125 27.125 C 32.03125 24.296875 27.96875 24.074219 27.96875 22.8125 C 27.96875 22.167969 28.46875 21.6875 29.9375 21.6875 C 30.890625 21.6875 31.96875 22.40625 31.96875 22.40625 L 32.46875 19.96875 C 32.46875 19.96875 31.050781 19.40625 29.6875 19.40625 Z M 16.46875 19.625 L 13.78125 27.5625 C 13.78125 27.5625 13.597656 26.886719 13.53125 26.46875 C 11.996094 23.023438 9.5 21.75 9.5 21.75 L 11.875 30.75 L 15.125 30.75 L 19.625 19.625 Z M 20.78125 19.625 L 19.03125 30.75 L 22 30.75 L 23.78125 19.625 Z M 36.8125 19.625 L 31.96875 30.75 L 34.90625 30.75 L 35.5 29.15625 L 39.1875 29.15625 L 39.5 30.75 L 42.1875 30.75 L 39.90625 19.625 Z M 6.25 19.65625 C 6.25 19.65625 12.054688 21.453125 13.40625 25.8125 L 12.40625 20.75 C 12.40625 20.75 11.976563 19.65625 10.8125 19.65625 Z M 37.9375 22.84375 L 38.75 27.03125 L 36.3125 27.03125 Z"></path>
          </svg>
          <h5 className="text-sm sm:text-md font-md pl-5">John Doe</h5>
        </div>
        <div className="text-sm sm:text-md flex items-center pl-8">
          <h6>1234 **** *** ****</h6>
          <h5 className="text-sm sm:text-md text-bold pl-6">10/2023</h5>
        </div>
        <div>
          <AiOutlineDelete size={25} className="cursor-pointer text-[red]" />
        </div>
      </div>
    </div>
  );
};
export default ProfileContent;
