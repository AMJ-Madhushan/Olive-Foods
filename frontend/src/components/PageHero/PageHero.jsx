import React from 'react';
import './PageHero.css';
import aboutBg from '../../assets/frontend_assets/about_bg.jpg';

const PageHero = ({ header, title }) => {
  return (
    <div className="page-hero">
      <div className="hero-background">
        <img src={aboutBg} alt="Background" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content">
        <h1>{header}</h1>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default PageHero;

