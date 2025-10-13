import React from "react";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>About TechDoc Solutions</h1>
        <p>We create innovative software and hardware solutions that drive digital transformation.</p>
      </section>

      {/* Company Mission */}
      <section className="mission-section">
        <h2>Our Mission</h2>
        <p>
          At TechDoc Solutions, our mission is to deliver top-notch web, mobile, and AI-driven solutions that empower businesses to grow and innovate. 
          We combine creativity, technology, and expertise to bring your ideas to life.
        </p>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2>Our Core Values</h2>
        <div className="values-cards">
          <div className="value-card">
            <h3>Innovation</h3>
            <p>We constantly push boundaries to create cutting-edge solutions for our clients.</p>
          </div>
          <div className="value-card">
            <h3>Integrity</h3>
            <p>We value transparency and honesty in every project and relationship.</p>
          </div>
          <div className="value-card">
            <h3>Excellence</h3>
            <p>We deliver solutions with high quality and focus on exceeding expectations.</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-cards">
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" />
            <h3>Jane Smith</h3>
            <p>Lead Developer</p>
          </div>
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/56.jpg" alt="Mark Johnson" />
            <h3>Mark Johnson</h3>
            <p>UI/UX Designer</p>
          </div>
        </div>
      </section>
    </div>
  );
}
