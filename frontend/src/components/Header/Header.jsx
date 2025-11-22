import React, { useState, useEffect } from "react";
import "./Header.css";

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
    <div className="header">
      <div className="hero-carousel">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="header-contents">
        <h2>{title}</h2>
        <p>{description}</p>
        <button>Order Now</button>
      </div>
      <div className="carousel-indicators">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
