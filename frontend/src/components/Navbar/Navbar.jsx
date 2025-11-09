import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
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


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </Link>
        <Link
          to="/contact"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </Link>
        <Link
          to="/about-us"
          onClick={() => setMenu("about-us")}
          className={menu === "about-us" ? "active" : ""}
        >
          About Us
        </Link>
      </ul>
      <div className="navbar-right">
        {token && hasHealthProfile && (
          <button onClick={() => navigate("/recommendations")} className="suggest-me-btn">
            🎯 Suggest Me
          </button>
        )}
        
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" style={{ width: "30px", height: "30px", objectFit: "contain" }} />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="" style={{ width: "30px", height: "30px", objectFit: "contain" }}/>
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/health-profile")}>
                <img src={assets.profile_icon} alt="" />
                <p>Update Medical Condition</p>
              </li>
              <hr />
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="" />
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
