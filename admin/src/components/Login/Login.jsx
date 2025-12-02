import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import {useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";

const Login = ({ url }) => {
  const navigate=useNavigate();
  const {admin,setAdmin,token, setToken } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const onLogin = async (event) => {
    event.preventDefault();
    const response = await axios.post(url + "/api/user/login", data);
    if (response.data.success) {
      if (response.data.role === "admin") {
        setToken(response.data.token);
        setAdmin(true);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", true);
        toast.success("Login Successfully");
        navigate("/add")
      }else{
        toast.error("You are not an admin");
      }
    } else {
      toast.error(response.data.message);
    }
  };
  useEffect(()=>{
    if(admin && token){
       navigate("/add");
    }
  },[])
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-light via-white to-light p-5 relative max-[650px]:p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[rgba(78,140,1,0.05)] to-[rgba(78,140,1,0.02)] pointer-events-none"></div>
      
      {/* Logo Section */}
      <div className="mb-8 relative z-[1] flex justify-center items-center max-[650px]:mb-6">
        <img 
          className="w-[200px] transition-all duration-300 ease-in-out hover:scale-105 hover:brightness-110 max-[650px]:w-[160px] max-[480px]:w-[140px]" 
          src={assets.logo} 
          alt="Olive Foods Logo" 
        />
      </div>

      {/* Login Form */}
      <form onSubmit={onLogin} className="border-[3px] border-primary w-full max-w-[450px] text-text bg-white flex flex-col gap-8 py-10 px-9 rounded-[20px] text-base animate-fadeIn shadow-[0_15px_35px_rgba(78,140,1,0.2)] relative z-[1] backdrop-blur-[10px] max-[650px]:w-full max-[650px]:p-8 max-[650px]:px-6 max-[650px]:max-w-[400px] max-[480px]:p-6 max-[480px]:px-5 max-[480px]:gap-6">
        <div className="flex flex-col items-center text-primary mb-2 relative">
          <h2 className="text-[2.5rem] font-bold text-primary text-center m-0 relative max-[650px]:text-[2rem] max-[480px]:text-[1.8rem]">Admin Login</h2>
          <p className="text-gray-600 text-sm mt-2 text-center max-[480px]:text-xs">Sign in to access the admin panel</p>
        </div>
        
        <div className="flex flex-col gap-6 max-[480px]:gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-text font-semibold text-sm text-primary">Email Address</label>
            <input
              id="email"
              name="email"
              onChange={onChangeHandler}
              value={data.email}
              type="email"
              placeholder="Enter your email"
              className="outline-none border-2 border-gray-300 py-[15px] px-5 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text font-medium focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-0.5 placeholder:text-[#999] placeholder:font-normal max-[650px]:py-3 max-[650px]:px-4 max-[650px]:text-[0.95rem]"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-text font-semibold text-sm text-primary">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                onChange={onChangeHandler}
                value={data.password}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="outline-none border-2 border-gray-300 py-[15px] px-5 pr-14 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text font-medium focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-0.5 placeholder:text-[#999] placeholder:font-normal max-[650px]:py-3 max-[650px]:px-4 max-[650px]:text-[0.95rem] w-full"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 active:scale-95"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.906 1.238l-1.387-1.387zm5.196 5.196a3 3 0 013.414 3.414l-3.414-3.414zM6.343 6.343L4.93 4.93A9.98 9.98 0 003.055 7.06l1.288 1.288a7.007 7.007 0 011.999-2.005zM2.13 2.13l1.415 1.415A9.98 9.98 0 001.458 10c1.274 4.057 5.064 7 9.542 7a9.958 9.958 0 005.83-1.916l1.415 1.415a1 1 0 001.414-1.414l-14-14a1 1 0 00-1.414 0zm6.343 9.657l-1.415-1.415a3 3 0 011.415-1.415l1.415 1.415a3 3 0 01-1.415 1.415zm-2.829-2.828l-1.288-1.288A7.007 7.007 0 004.93 10.93l1.288-1.288a7.007 7.007 0 011.999-2.005z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full border-none py-[15px] px-[30px] rounded-xl text-white bg-gradient-to-br from-primary to-secondary text-lg font-bold cursor-pointer transition-all duration-300 ease-in-out uppercase tracking-[1px] shadow-[0_4px_15px_rgba(78,140,1,0.3)] relative overflow-hidden hover:bg-gradient-to-br hover:from-secondary hover:to-tertiary hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)] active:-translate-y-0.5 active:shadow-[0_4px_15px_rgba(78,140,1,0.3)] max-[650px]:py-3 max-[650px]:px-6 max-[650px]:text-base"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
