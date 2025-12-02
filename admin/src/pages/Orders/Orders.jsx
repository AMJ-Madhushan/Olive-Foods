import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Orders = ({ url }) => {
  const navigate = useNavigate();
  const { token, admin } = useContext(StoreContext);
  const [orders, setOrders] = useState([]);

  const fetchAllOrder = async () => {
    const response = await axios.get(url + "/api/order/list", {
      headers: { token },
    });
    if (response.data.success) {
      setOrders(response.data.data);
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      url + "/api/order/status",
      {
        orderId,
        status: event.target.value,
      },
      { headers: { token } }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchAllOrder();
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(() => {
    if (!admin && !token) {
      toast.error("Please Login First");
      navigate("/");
    }
    fetchAllOrder();
  }, []);

  return (
    <div className="w-[70%] ml-[max(5vw,25px)] mt-[50px] text-text text-base animate-fadeIn max-[1000px]:w-[90%] max-[1000px]:ml-[5%]">
      <h3 className="text-primary text-[2rem] font-bold mb-8 text-center">Manage Orders</h3>
      <div className="flex flex-col gap-5">
        {orders.map((order, index) => (
          <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr] items-start gap-[30px] border-2 border-primary rounded-[15px] p-6 m-0 text-base text-text bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out relative overflow-hidden hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.15)] hover:border-primary-dark max-[1000px]:text-sm max-[1000px]:grid-cols-[0.5fr_2fr_1fr] max-[1000px]:p-5 max-[1000px]:px-4 max-[1000px]:gap-5 max-[768px]:grid-cols-1 max-[768px]:gap-4 max-[768px]:text-center max-[600px]:p-4 max-[600px]:px-2.5">
            <img src={assets.parcel_icon} alt="" className="w-[60px] h-[60px] rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] max-[1000px]:w-[50px] max-[1000px]:h-[50px] max-[768px]:justify-self-center max-[600px]:w-[40px] max-[600px]:h-[40px]" />
            <div className="max-[768px]:order-1">
              <p className="font-semibold text-text text-lg mb-2.5 leading-snug text-primary max-[1000px]:text-base max-[600px]:text-base">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="mt-4 mb-2.5 text-lg text-text font-semibold max-[1000px]:text-base max-[600px]:text-base">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="mb-4 text-[#666] leading-snug">
                <p className="m-0.5 text-sm">{order.address.street + ","}</p>
                <p className="m-0.5 text-sm">
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="text-primary font-semibold text-base">{order.address.phone}</p>
            </div>
            <p className="bg-light text-primary py-2 px-4 rounded-[20px] font-semibold text-center text-sm self-center max-[768px]:order-2 max-[768px]:justify-self-center">Items: {order.items.length}</p>
            <p className="text-primary font-bold text-xl text-center self-center max-[768px]:order-2 max-[768px]:justify-self-center max-[1000px]:text-lg">LKR {order.amount}</p>
            <select
              onChange={(event) => statusHandler(event, order._id)}
              value={order.status}
              className="bg-gradient-to-br from-light to-white border-2 border-primary rounded-[10px] w-full max-w-[200px] py-3 px-4 outline-none text-base font-semibold text-text cursor-pointer transition-all duration-300 ease-in-out self-center focus:border-primary-dark focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-px hover:bg-light hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)] max-[1000px]:py-2.5 max-[1000px]:px-3 max-[1000px]:text-sm max-[1000px]:max-w-[150px] max-[768px]:order-2 max-[768px]:justify-self-center max-[768px]:max-w-[200px]"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
