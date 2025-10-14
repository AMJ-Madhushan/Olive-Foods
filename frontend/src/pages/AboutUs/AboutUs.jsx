import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>About Olive Foods</h1>
        <p>Your premier destination for delicious, fresh food delivered right to your doorstep. Experience the convenience of modern Olive Foods delivery with quality you can trust.</p>
      </section>

      {/* Application Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At Olive Foods, our mission is to revolutionize the Olive Foods delivery experience by connecting customers with 
          the finest restaurants and culinary experiences. We strive to make quality food accessible, convenient, 
          and enjoyable for everyone, while supporting local businesses and promoting sustainable food practices.
        </p>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-cards">
          <div className="value-card">
            <h3>Quality First</h3>
            <p>We partner only with the finest restaurants and ensure every meal meets our high standards for freshness and taste.</p>
          </div>
          <div className="value-card">
            <h3>Customer Satisfaction</h3>
            <p>Your happiness is our priority. We go above and beyond to ensure every order exceeds your expectations.</p>
          </div>
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We continuously improve our platform with cutting-edge technology to make Olive Foods delivery faster and more convenient.</p>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="team-section">
        <h2>Meet the Developer</h2>
        <p>This application has been designed and developed by:</p>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Janitha Madushan" />
            <h3>Janitha Madushan</h3>
            <p>Full-Stack Developer & UI/UX Designer</p>
            <p>All Rights Reserved © 2024</p>
          </div>
        </div>
      </section>

      {/* Copyright Section */}
      <section className="cta-section">
        <h2>System Rights & Ownership</h2>
        <p>
          This entire Olive Foods delivery system has been designed, developed, and implemented by Janitha Madushan. 
          All code, design elements, functionality, and intellectual property rights are exclusively owned by Janitha Madushan.
        </p>
        <div className="copyright-notice">
          <p><strong>© 2024 Janitha Madushan. All Rights Reserved.</strong></p>
          <p>This system is proprietary software developed with modern web technologies including React, Node.js, and MongoDB.</p>
        </div>
      </section>
    </div>
  );
}
