import React from 'react';
import aboutBg from '../../assets/frontend_assets/about_bg.jpg';

const PageHero = ({ header, title }) => {
  return (
    <div className="relative w-screen -ml-[calc(50vw-50%)] min-h-[320px] flex items-center justify-center overflow-hidden max-[1050px]:h-[350px] max-[768px]:h-[300px] max-[768px]:mt-[60px] max-[480px]:h-[280px]">
      <div className="absolute top-0 left-0 w-full h-full z-[1]">
        <img src={aboutBg} alt="Background" className="w-full h-full object-cover object-center" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[rgba(78,140,1,0.75)] to-[rgba(61,107,1,0.85)] z-[2]"></div>
      </div>
      <div className="relative z-[3] text-center text-white px-5 max-w-[900px] mx-auto max-[480px]:px-4">
        <h1 className="text-[3rem] font-bold mb-5 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)] leading-tight max-[1050px]:text-[2.5rem] max-[768px]:text-[2rem] max-[768px]:mb-4 max-[480px]:text-[1.75rem] max-[480px]:mb-3">{header}</h1>
        <p className="text-xl leading-relaxed text-white drop-shadow-[1px_1px_3px_rgba(0,0,0,0.3)] font-normal max-[1050px]:text-lg max-[768px]:text-base max-[480px]:text-[0.95rem]">{title}</p>
      </div>
    </div>
  );
};

export default PageHero;

