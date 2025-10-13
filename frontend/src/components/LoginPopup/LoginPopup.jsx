import { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(`${currentState} Successfully`);
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
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
            className="cursor-pointer"
          />
        </div>

        <div className="login-popup-inputs">
          {currentState !== "Login" && (
            <input
              name="name"
              type="text"
              placeholder="Your name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
          <input
            name="password"
            type="password"
            placeholder="Your password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <button type="submit">
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>

        {currentState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span className="cursor-pointer" onClick={() => setCurrentState("Sign Up")}>
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span className="cursor-pointer" onClick={() => setCurrentState("Login")}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

// PropTypes validation to satisfy ESLint
LoginPopup.propTypes = {
  setShowLogin: PropTypes.func.isRequired,
};

export default LoginPopup;
