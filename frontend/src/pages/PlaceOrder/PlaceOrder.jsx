import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const navigate= useNavigate();

  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 200,
    };
    
    let response= await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url);
    }else{
      toast.error("Errors!")
    }
  };

  useEffect(()=>{
    if(!token){
      toast.error("Please Login first")
      navigate("/cart")
    }
    else if(getTotalCartAmount()===0){
      toast.error("Please Add Items to Cart");
      navigate("/cart")
    }
  },[token])
  return (
    <form className="flex items-start justify-between gap-[50px] mt-[100px] py-20 bg-light w-screen -ml-[calc(50vw-50%)] max-[800px]:flex-col max-[800px]:mt-[50px]" onSubmit={placeOrder}>
      <div className="max-w-[1200px] mx-auto px-5 flex items-start justify-between gap-[50px] max-[800px]:flex-col">
        <div className="w-full max-w-[max(30%,500px)]">
          <p className="text-[30px] font-bold mb-[50px] text-text max-[800px]:text-[27px]">Delivery Information</p>
          <div className="flex gap-2.5">
            <input
              required
              name="firstName"
              value={data.firstName}
              onChange={onChangeHandler}
              type="text"
              placeholder="First name"
              className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
            />
            <input
              required
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              type="text"
              placeholder="Last name"
              className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
            />
          </div>
          <input
            required
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            type="text"
            placeholder="Email Address"
            className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
          />
          <input
            required
            name="street"
            value={data.street}
            onChange={onChangeHandler}
            type="text"
            placeholder="Street"
            className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
          />
          <div className="flex gap-2.5">
            <input
              required
              name="city"
              value={data.city}
              onChange={onChangeHandler}
              type="text"
              placeholder="City"
              className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
            />
            <input
              required
              name="state"
              value={data.state}
              onChange={onChangeHandler}
              type="text"
              placeholder="State"
              className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
            />
          </div>
          <div className="flex gap-2.5">
            <input
              required
              name="zipcode"
              value={data.zipcode}
              onChange={onChangeHandler}
              type="text"
              placeholder="Zip Code"
              className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
            />
            <input
              required
              name="country"
              value={data.country}
              onChange={onChangeHandler}
              type="text"
              placeholder="Country"
              className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
            />
          </div>
          <input
            required
            name="phone"
            value={data.phone}
            onChange={onChangeHandler}
            type="text"
            placeholder="Phone"
            className="mb-4 w-full p-[15px] border-2 border-[#e1e5e9] rounded-lg outline-primary bg-white text-text text-base transition-[border-color] duration-300 ease-in-out focus:border-primary"
          />
        </div>
        <div className="w-full max-w-[max(40%,500px)]">
          <div className="flex-1 flex flex-col gap-5">
            <h2 className="text-2xl font-bold mb-5">Cart Totals</h2>
            <div>
              <div className="flex justify-between text-[#555]">
                <p>Subtotals</p>
                <p>LKR {getTotalCartAmount()}</p>
              </div>
              <hr className="my-2.5" />
              <div className="flex justify-between text-[#555]">
                <p>Delivery Fee</p>
                <p>LKR {getTotalCartAmount() === 0 ? 0 : 200}</p>
              </div>
              <hr className="my-2.5" />
              <div className="flex justify-between text-[#555]">
                <b>Total</b>
                <b>
                  LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}
                </b>
              </div>
            </div>
            <button type="submit" className="mt-8 border-none text-white bg-primary w-full py-3 px-0 rounded-lg cursor-pointer">PROCEED TO PAYMENT</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
