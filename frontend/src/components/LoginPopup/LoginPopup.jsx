import { useContext, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, refreshHealthProfileStatus } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();

    const endpoint = currentState === "Login" ? "/api/user/login" : "/api/user/register";
    const newUrl = `${url}${endpoint}`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.success) {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem("token", newToken);
        toast.success(`${currentState} Successfully`);
        // Trigger health profile status check immediately after login
        // The useEffect in StoreContext will also trigger, but this ensures it happens
        setTimeout(() => {
          refreshHealthProfileStatus();
        }, 100);
        setShowLogin(false);
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Login/Register error:", error);
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <div className="fixed top-0 left-0 z-[10000] w-full h-full bg-[#00000090] grid">
      <form onSubmit={onLogin} className="place-self-center w-[max(23vw,330px)] max-w-[450px] text-text bg-white flex flex-col gap-6 py-8 px-8 rounded-[20px] text-base animate-[fadeIn_0.5s] shadow-[0_15px_35px_rgba(78,140,1,0.2)] border-[3px] border-primary relative">
        {/* Header with Title and Close Button */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex flex-col">
            <h2 className="text-[2rem] font-bold text-primary m-0 max-[480px]:text-[1.75rem]">
              {currentState === "Login" ? "User Login" : "Create Account"}
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-[480px]:text-xs">
              {currentState === "Login" 
                ? "Sign in to access your account" 
                : "Join us to start your journey"}
            </p>
          </div>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity"
          />
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-5">
          {currentState !== "Login" && (
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-text font-semibold text-sm text-primary">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={data.name}
                onChange={onChangeHandler}
                className="outline-none border-2 border-gray-300 py-3 px-4 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text font-medium focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-0.5 placeholder:text-[#999] placeholder:font-normal"
                required
              />
            </div>
          )}
          
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-text font-semibold text-sm text-primary">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={onChangeHandler}
              className="outline-none border-2 border-gray-300 py-3 px-4 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text font-medium focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-0.5 placeholder:text-[#999] placeholder:font-normal"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-text font-semibold text-sm text-primary">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={data.password}
                onChange={onChangeHandler}
                className="outline-none border-2 border-gray-300 py-3 px-4 pr-14 rounded-xl text-base transition-all duration-300 ease-in-out bg-white text-text font-medium focus:border-primary focus:shadow-[0_0_0_3px_rgba(78,140,1,0.1)] focus:-translate-y-0.5 placeholder:text-[#999] placeholder:font-normal w-full"
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

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full border-none py-3 px-6 rounded-xl text-white bg-gradient-to-br from-primary to-black text-base font-bold cursor-pointer transition-all duration-300 ease-in-out uppercase tracking-[1px] shadow-[0_4px_15px_rgba(78,140,1,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)] active:-translate-y-0.5"
        >
          {currentState === "Sign Up" ? "Create Account" : "Sign In"}
        </button>

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 -mt-2">
          <input 
            type="checkbox" 
            id="terms"
            className="mt-1.5 cursor-pointer" 
            required 
          />
          <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
            By continuing, I agree to the terms of use & privacy policy.
          </label>
        </div>

        {/* Toggle between Login and Sign Up */}
        <div className="text-center text-sm">
          {currentState === "Login" ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <span 
                className="text-primary font-semibold cursor-pointer hover:underline transition-all" 
                onClick={() => setCurrentState("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <span 
                className="text-primary font-semibold cursor-pointer hover:underline transition-all" 
                onClick={() => setCurrentState("Login")}
              >
                Sign In
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

// PropTypes validation to satisfy ESLint
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
