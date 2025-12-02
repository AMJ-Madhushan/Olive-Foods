import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-black bg-light flex flex-col items-center gap-5 py-5 pt-20 mt-[100px] w-screen -ml-[calc(50vw-50%)] px-[8vw]" id="footer">
      <div className="max-w-[1200px] mx-auto px-5 w-full">
        <div className="w-full grid grid-cols-[2fr_1fr_1fr] gap-20 max-[750px]:flex max-[750px]:flex-col max-[750px]:gap-9">
          <div className="flex flex-col items-start gap-5">
            <img src={assets.logo} alt="" className="w-[120px] h-auto mb-4" />
            <p className="text-black">
              Olive Foods connects you with top local restaurants to deliver fresh,
              delicious meals to your door. Fast service, quality ingredients, and
              a seamless ordering experience—every time.
            </p>
            <div className="flex">
              <img src={assets.facebook_icon} alt="" className="w-10 mr-4 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110" />
              <img src={assets.twitter_icon} alt="" className="w-10 mr-4 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110" />
              <img src={assets.linkedin_icon} alt="" className="w-10 mr-4 transition-transform duration-300 ease-in-out cursor-pointer hover:scale-110" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-black font-bold mb-4">Company</h2>
            <ul className="list-none">
              <li className="mb-2.5 cursor-pointer text-primary font-semibold"><Link to="/">Home</Link></li>
              <li className="mb-2.5 cursor-pointer text-primary font-semibold"><Link to="/about-us">About Us</Link></li>
              <li className="mb-2.5 cursor-pointer text-primary font-semibold"><Link to="/menu">Menu</Link></li>
              <li className="mb-2.5 cursor-pointer text-primary font-semibold"><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="flex flex-col items-start gap-5">
            <h2 className="text-black font-bold mb-4">Get in touch</h2>
            <ul className="list-none">
              <li className="mb-2.5 cursor-pointer text-primary font-semibold">+92-308-4900522</li>
              <li className="mb-2.5 cursor-pointer text-primary font-semibold">contact@olive-foods.com</li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="w-full h-0.5 my-5 bg-[rgba(255,255,255,0.3)] border-none" />
      <p className="text-center max-[750px]:text-center">
        Copyright 2025 @ Olive-Foods.com - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
