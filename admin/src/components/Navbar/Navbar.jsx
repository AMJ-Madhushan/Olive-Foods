import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import {useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate=useNavigate();
  const {token, admin, setAdmin, setToken } = useContext(StoreContext);
  const logout=()=>{
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setToken("");
    setAdmin(false);
    toast.success("Logout Successfully")
    navigate("/");
  }
  return (
    <div className="py-5 px-5 flex justify-between items-center relative z-[100] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] mb-0 max-[1050px]:px-5 max-[900px]:px-5 max-[750px]:py-4 max-[750px]:px-0">
      <img className="w-[150px] transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:brightness-110 max-[1050px]:w-[140px] max-[900px]:w-[120px] max-[750px]:w-[100px] max-[600px]:w-[80px]" src={assets.logo} alt="" />
      <div className="flex items-center gap-5">
        {token && admin ? (
          <p className="text-lg font-semibold text-primary py-2.5 px-5 border-2 border-primary rounded-lg bg-transparent cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden hover:bg-light hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)] max-[1050px]:py-2 max-[1050px]:px-4 max-[1050px]:text-base max-[900px]:py-[7px] max-[900px]:px-3.5 max-[900px]:text-sm max-[750px]:py-1.5 max-[750px]:px-3 max-[750px]:text-xs max-[600px]:py-1.5 max-[600px]:px-2.5 max-[600px]:text-[0.75rem]" onClick={logout}>Logout</p>
        ) : (
          <p className="text-lg font-semibold text-primary py-2.5 px-5 border-2 border-primary rounded-lg bg-transparent cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden hover:bg-light hover:text-primary hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)] max-[1050px]:py-2 max-[1050px]:px-4 max-[1050px]:text-base max-[900px]:py-[7px] max-[900px]:px-3.5 max-[900px]:text-sm max-[750px]:py-1.5 max-[750px]:px-3 max-[750px]:text-xs max-[600px]:py-1.5 max-[600px]:px-2.5 max-[600px]:text-[0.75rem]" onClick={()=>navigate("/")}>Login</p>
        )}
      </div>
    </div>
  );
};

export default Navbar;
