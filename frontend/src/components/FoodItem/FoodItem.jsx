import { useContext } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext); 

  return (
    <div className="w-full mx-auto rounded-[15px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out animate-fadeIn bg-white overflow-hidden hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
      <div className="relative">
        <img src={url+"/images/"+image} alt="" className="w-full rounded-t-[15px]" />
        {!cartItems[id] ? (
          <img
            className="absolute w-[35px] bottom-[15px] right-[15px] cursor-pointer rounded-full"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=""
          />
        ) : (
          <div className="absolute bottom-[15px] right-[15px] flex items-center gap-2.5 p-1.5 rounded-full bg-white">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" className="w-[30px]" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" className="w-[30px]" />
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-center mb-2.5">
          <p className="text-xl font-semibold text-text">{name}</p>
          <img src={assets.rating_starts} alt="" className="w-[70px]" />
        </div>
        <p className="text-text text-sm leading-normal">{description}</p>
        <p className="text-primary text-[22px] font-medium my-2.5">LKR {price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
