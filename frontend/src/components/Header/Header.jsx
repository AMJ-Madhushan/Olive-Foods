import React, { useState, useEffect } from "react";

import bg_1 from "../../assets/frontend_assets/bg_1.jpg";
import bg_2 from "../../assets/frontend_assets/bg_2.jpg";
import bg_3 from "../../assets/frontend_assets/bg_3.jpg";


const heroSlides = [
  {
    image: bg_1,
    title: "Healthy Eating Starts\nHere With Olive Foods",
    description:
      "Order chef-crafted dishes made with seasonal ingredients and enjoy restaurant-quality food at home.",
  },
  {
    image: bg_2,
    title: "Explore Bold New Tastes\nFrom Local Kitchens"  ,
    description:
      "Know exactly when your meal will arrive with live order updates from kitchen to doorstep.",
  },
  {
    image: bg_3,
    title: "Fresh Flavors Daily\nFrom Local Restaurants",
    description:
      "Discover nearby restaurants, save your go-to meals, and reorder in seconds with Olive Foods.",
  },
];

const Header = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const { title, description } = heroSlides[currentSlide];

  return (
    <div className="h-screen w-screen relative flex items-center justify-center overflow-hidden -ml-[calc(50vw-50%)]">
      <div className="absolute top-0 left-0 w-full h-full z-[1]">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-[2]" />
      <div className="relative flex flex-col items-start gap-8 w-full max-w-[1200px] mx-auto px-10 z-[3] animate-fadeIn">
        <h2 className="font-extrabold text-primary text-[3.5rem] leading-tight mb-4 whitespace-pre-line max-w-[700px] max-[1050px]:text-[2.5rem] max-[750px]:text-[2rem]">{title}</h2>
        <p className="text-black text-xl leading-relaxed max-w-[600px] opacity-95 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)] max-[1050px]:text-lg max-[750px]:text-base">{description}</p>
        <button className="border-none text-white font-semibold py-[15px] px-[30px] bg-primary text-lg rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.3)] max-[750px]:py-3 max-[750px]:px-6 max-[750px]:text-base">Order Now</button>
      </div>
      <div className="absolute bottom-[30px] left-1/2 -translate-x-1/2 flex gap-2.5 z-[4]">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full border border-primary transition-all duration-300 ease-in-out cursor-pointer ${
              index === currentSlide 
                ? "bg-primary scale-125" 
                : "bg-transparent hover:bg-[rgba(78,140,1,0.7)]"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
