import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { assets } from "../../assets/frontend_assets/assets";

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(
      url + "/api/order/userorders",
      {},
      { headers: { token } }
    );
    if (response.data.success) {
      setData(response.data.data);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div className="my-[50px] py-20 bg-light w-screen -ml-[calc(50vw-50%)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <h2 className="text-3xl font-bold mb-8 text-center">Orders</h2>
        <div className="flex flex-col gap-5 mt-8">
          {data.map((order, index) => {
            return (
              <div key={index} className="grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr] items-center gap-[30px] text-sm p-5 text-text border-2 border-primary bg-white rounded-[10px] shadow-[0_2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.15)] max-[900px]:grid-cols-[1fr_2fr_1fr] max-[900px]:gap-2.5 max-[900px]:text-xs">
                <img src={assets.parcel_icon} alt="" className="w-[50px]" />
                <p>
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " X " + item.quantity;
                    } else {
                      return item.name + " X " + item.quantity + ",";
                    }
                  })}
                </p>
                <p>LKR {order.amount}.00</p>
                <p>items: {order.items.length}</p>
                <p>
                  <span className="text-primary">&#x25cf;</span>
                  <b className="font-semibold text-text"> {order.status}</b>
                </p>
                <button onClick={fetchOrders} className="border-none py-3 px-5 rounded-lg bg-primary cursor-pointer text-white font-semibold transition-all duration-300 ease-in-out hover:bg-primary-dark hover:-translate-y-px max-[900px]:text-[10px]">Track Order</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
