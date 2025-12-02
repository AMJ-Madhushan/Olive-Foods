import React, { useContext, useState, useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [bannerVisible, setBannerVisible] = useState(false);
  const { getTotalCartAmount, token, setToken, url, hasHealthProfile } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Update menu based on current path
    switch (location.pathname) {
      case "/":
        setMenu("home");
        break;
      case "/menu":
        setMenu("menu");
        break;
      case "/contact":
        setMenu("contact-us");
        break;
      case "/about-us":
        setMenu("about-us");
        break;
      default:
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    const checkBanner = () => {
      setBannerVisible(document.body.classList.contains('banner-visible'));
    };
    checkBanner();
    const observer = new MutationObserver(checkBanner);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className={`py-3 px-10 flex justify-between items-center fixed top-0 left-0 right-0 w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-[1000] transition-all duration-300 ease-in-out max-[1050px]:px-[30px] max-[900px]:px-5 max-[750px]:px-[15px] ${bannerVisible ? 'top-[var(--banner-height,60px)]' : ''}`}>
      <Link to="/">
        <img src={assets.logo} alt="" className="w-[150px] transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:brightness-110 max-[1050px]:w-[140px] max-[900px]:w-[120px] max-[750px]:w-[100px]" />
      </Link>
      <ul className="flex list-none gap-5 text-text text-lg max-[1050px]:gap-5 max-[1050px]:text-[17px] max-[900px]:gap-4 max-[900px]:text-base max-[750px]:hidden">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={`no-underline text-text font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden ${
            menu === "home" 
              ? "text-primary bg-light border-b-2 border-primary font-semibold shadow-[0_2px_8px_rgba(78,140,1,0.1)]" 
              : "hover:text-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)]"
          }`}
        >
          Home
        </Link>
        <Link
          to="/menu"
          onClick={() => setMenu("menu")}
          className={`no-underline text-text font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden ${
            menu === "menu" 
              ? "text-primary bg-light border-b-2 border-primary font-semibold shadow-[0_2px_8px_rgba(78,140,1,0.1)]" 
              : "hover:text-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)]"
          }`}
        >
          Menu
        </Link>
        <Link
          to="/contact"
          onClick={() => setMenu("contact-us")}
          className={`no-underline text-text font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden ${
            menu === "contact-us" 
              ? "text-primary bg-light border-b-2 border-primary font-semibold shadow-[0_2px_8px_rgba(78,140,1,0.1)]" 
              : "hover:text-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)]"
          }`}
        >
          Contact Us
        </Link>
        <Link
          to="/about-us"
          onClick={() => setMenu("about-us")}
          className={`no-underline text-text font-medium py-2 px-4 rounded-lg transition-all duration-300 ease-in-out relative overflow-hidden ${
            menu === "about-us" 
              ? "text-primary bg-light border-b-2 border-primary font-semibold shadow-[0_2px_8px_rgba(78,140,1,0.1)]" 
              : "hover:text-primary hover:bg-light hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(78,140,1,0.15)]"
          }`}
        >
          About Us
        </Link>
      </ul>
      <div className="flex items-center gap-10 max-[1050px]:gap-[30px] max-[900px]:gap-5">
        {token && hasHealthProfile && (
          <button onClick={() => navigate("/recommendations")} className="bg-gradient-to-br from-primary to-primary-dark text-white border-none py-2.5 px-6 rounded-[10px] text-base font-bold cursor-pointer shadow-[0_4px_15px_rgba(78,140,1,0.3)] transition-all duration-300 ease-in-out animate-[pulse-btn_2s_infinite] hover:bg-gradient-to-br hover:from-primary-dark hover:to-primary-darker hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(78,140,1,0.4)]">
            🎯 Suggest Me
          </button>
        )}
        
        <div className="relative transition-transform duration-300 ease-in-out hover:scale-110">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" className="transition-all duration-300 ease-in-out cursor-pointer hover:brightness-125" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
          </Link>
          {getTotalCartAmount() !== 0 && (
            <div className="absolute min-w-[10px] min-h-[10px] bg-primary rounded-[5px] -top-2 -right-2 animate-[pulse_2s_infinite]"></div>
          )}
        </div>
        
        {!token ? (
          <button onClick={() => setShowLogin(true)} className="bg-transparent font-semibold text-lg text-primary border-2 border-primary py-2.5 px-[30px] rounded-lg cursor-pointer transition-all duration-300 hover:bg-light hover:text-primary hover:-translate-y-0.5 max-[1050px]:py-2 max-[1050px]:px-[25px] max-[900px]:py-[7px] max-[900px]:px-5 max-[900px]:text-[15px]">Sign In</button>
        ) : (
          <div className="relative transition-transform duration-300 ease-in-out hover:scale-105 group">
            <img src={assets.profile_icon} alt="" className="transition-all duration-300 ease-in-out cursor-pointer group-hover:brightness-110" style={{ width: "30px", height: "30px", objectFit: "contain" }}/>
            <ul className="absolute hidden group-hover:flex flex-col gap-2.5 bg-light py-3 px-[25px] rounded-lg border border-primary outline-2 outline-white outline list-none opacity-0 -translate-y-2.5 transition-all duration-300 ease-in-out shadow-[0_8px_25px_rgba(78,140,1,0.15)] right-0 z-[1000] group-hover:opacity-100 group-hover:translate-y-0">
              <li onClick={() => navigate("/health-profile")} className="flex items-center gap-2.5 cursor-pointer py-2 px-3 rounded-md transition-all duration-300 ease-in-out relative overflow-hidden hover:text-primary hover:bg-[rgba(78,140,1,0.1)] hover:translate-x-1">
                <img src={assets.profile_icon} alt="" className="w-5 transition-transform duration-300 ease-in-out hover:scale-110" />
                <p>Update Medical Condition</p>
              </li>
              <hr className="border-none h-px bg-primary" />
              <li onClick={() => navigate("/myorders")} className="flex items-center gap-2.5 cursor-pointer py-2 px-3 rounded-md transition-all duration-300 ease-in-out relative overflow-hidden hover:text-primary hover:bg-[rgba(78,140,1,0.1)] hover:translate-x-1">
                <img src={assets.bag_icon} alt="" className="w-5 transition-transform duration-300 ease-in-out hover:scale-110" />
                <p>Orders</p>
              </li>
              <hr className="border-none h-px bg-primary" />
              <li onClick={logout} className="flex items-center gap-2.5 cursor-pointer py-2 px-3 rounded-md transition-all duration-300 ease-in-out relative overflow-hidden hover:text-primary hover:bg-[rgba(78,140,1,0.1)] hover:translate-x-1">
                <img src={assets.logout_icon} alt="" className="w-5 transition-transform duration-300 ease-in-out hover:scale-110" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
