import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

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
    <div className="fixed top-0 left-0 right-0 w-full bg-gradient-to-br from-primary to-primary-dark z-[1001] py-3 px-10 shadow-[0_2px_10px_rgba(0,0,0,0.15)] animate-slideDown max-[1050px]:px-[30px] max-[900px]:px-5 max-[750px]:py-2.5 max-[750px]:px-[15px]" ref={bannerRef}>
      <div className="max-w-[1200px] mx-auto flex justify-between items-center gap-5 relative max-[900px]:gap-4 max-[750px]:flex-col max-[750px]:gap-2.5 max-[750px]:text-center">
        <p className="text-white text-base font-medium m-0 flex-1 leading-normal max-[1050px]:text-[15px] max-[900px]:text-sm max-[750px]:text-[13px]">
          Complete your health profile, Then we'll Suggest you foods as per your condition!..
        </p>
        <button className="bg-transparent text-white border-2 border-white py-2.5 px-6 rounded-lg font-semibold text-[15px] cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap flex-shrink-0 outline-none shadow-[0_0_0_0_rgba(255,255,255,0)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white hover:border-white hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.2)] focus:outline-2 focus:outline-[rgba(255,255,255,0.5)] focus:outline-offset-2 active:translate-y-0 active:shadow-[0_2px_6px_rgba(255,255,255,0.15)] max-[1050px]:py-2 max-[1050px]:px-5 max-[1050px]:text-sm max-[900px]:py-2 max-[900px]:px-[18px] max-[900px]:text-[13px] max-[750px]:w-full max-[750px]:py-2.5 max-[750px]:px-5" onClick={handleClick}>
          Click here
        </button>
      </div>
    </div>
  );
};

export default Banner;

