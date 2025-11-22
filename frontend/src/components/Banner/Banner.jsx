import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import "./Banner.css";

const Banner = () => {
  const { token, hasHealthProfile } = useContext(StoreContext);
  const navigate = useNavigate();
  const bannerRef = useRef(null);

  // Only show banner if user is logged in and hasn't completed health profile
  // hasHealthProfile is true when hasCompletedHealthProfile is true
  // So we show banner when token exists AND hasHealthProfile is false
  const shouldShowBanner = token && !hasHealthProfile;

  useEffect(() => {
    // Add/remove class to body to adjust navbar position
    if (shouldShowBanner && bannerRef.current) {
      document.body.classList.add("banner-visible");
      // Set CSS variable for dynamic height
      const height = bannerRef.current.offsetHeight;
      document.documentElement.style.setProperty('--banner-height', `${height}px`);
    } else {
      document.body.classList.remove("banner-visible");
      document.documentElement.style.setProperty('--banner-height', '0px');
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("banner-visible");
      document.documentElement.style.setProperty('--banner-height', '0px');
    };
  }, [shouldShowBanner]);

  if (!shouldShowBanner) {
    return null;
  }

  const handleClick = () => {
    navigate("/health-profile");
  };

  return (
    <div className="health-profile-banner" ref={bannerRef}>
      <div className="banner-content">
        <p className="banner-text">
          Complete your health profile, Then we'll Suggest you foods as per your condition!..
        </p>
        <button className="banner-button" onClick={handleClick}>
          Click here
        </button>
      </div>
    </div>
  );
};

export default Banner;

