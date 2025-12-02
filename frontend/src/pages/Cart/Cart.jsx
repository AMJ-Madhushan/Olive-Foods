import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url
  } = useContext(StoreContext);

  const navigate=useNavigate();

  return (
    <div className="mt-[100px] bg-light min-h-screen py-[50px] w-screen -ml-[calc(50vw-50%)]">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="mb-8">
          <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center text-gray-500 text-[max(1vw,12px)]">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr className="h-px bg-[#e2e2e2] border-none" />
          {food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={index}>
                  <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] items-center my-2.5 text-black">
                    <img src={url+"/images/"+item.image} alt="" className="w-[50px]" />
                    <p className="max-[750px]:pl-2.5">{item.name}</p>
                    <p>LKR {item.price}</p>
                    <p>{cartItems[item._id]}</p>
                    <p>LKR {item.price * cartItems[item._id]}</p>
                    <p onClick={() => removeFromCart(item._id)} className="cursor-pointer">
                      x
                    </p>
                  </div>
                  <hr className="h-px bg-[#e2e2e2] border-none" />
                </div>
              );
            }
          })}
        </div>
        <div className="mt-20 flex justify-between gap-[max(12vw,20px)] max-[750px]:flex-col-reverse">
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
                <p>LKR {getTotalCartAmount()===0?0:200}</p>
              </div>
              <hr className="my-2.5" />
              <div className="flex justify-between text-[#555]">
                <b>Total</b>
                <b>LKR {getTotalCartAmount()===0?0:getTotalCartAmount()+200}</b>
              </div>
            </div>
            <button onClick={()=>navigate('/order')} className="border-none text-white bg-primary w-[max(15vw,200px)] py-3 px-0 rounded-lg cursor-pointer">PROCEED TO CHECKOUT</button>
          </div>
          <div className="flex-1 max-[750px]:justify-start">
            <div>
              <p className="text-[#555]">If you have a promocode, Enter it here</p>
              <div className="mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded">
                <input type="text" placeholder="promo code" className="bg-transparent border-none outline-none pl-2.5" />
                <button className="w-[max(10vw,150px)] py-3 px-1.5 bg-black border-none text-white rounded-lg">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
