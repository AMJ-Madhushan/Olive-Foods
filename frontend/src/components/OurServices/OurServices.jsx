import React from "react";
import "./OurServices.css";

export default function OurServices() {
  const services = [
    {
      id: 1,
      title: "Fast Olive Foods Delivery",
      description: "Get your favorite meals delivered to your doorstep in 30 minutes or less. Our network of delivery partners ensures quick and reliable service.",
      icon: "🚚",
      features: ["30-minute delivery", "Real-time tracking", "Fresh food guarantee"]
    },
    {
      id: 2,
      title: "Restaurant Partnerships",
      description: "We partner with top-rated restaurants and local eateries to bring you the best dining options in your area.",
      icon: "🍽️",
      features: ["Premium restaurants", "Local favorites", "Quality assurance"]
    },
    {
      id: 3,
      title: "24/7 Customer Support",
      description: "Our dedicated support team is available round the clock to assist you with orders, tracking, and any concerns.",
      icon: "📞",
      features: ["24/7 availability", "Multi-language support", "Quick resolution"]
    },
    {
      id: 4,
      title: "AI-Driven Olive Foods Prediction",
      description: "Get personalized food recommendations based on your medical conditions and health status. Our AI analyzes your health profile to suggest the most suitable meals for your well-being.",
      icon: "🤖",
      features: ["Health-based recommendations", "Medical condition analysis", "Personalized meal plans"]
    },
    {
      id: 5,
      title: "Loyalty Program",
      description: "Earn points with every order and redeem them for discounts, free delivery, and exclusive offers.",
      icon: "⭐",
      features: ["Points system", "Exclusive offers", "Free delivery rewards"]
    },
    {
      id: 6,
      title: "Group Orders",
      description: "Perfect for offices and events. Place large orders with multiple items from different restaurants.",
      icon: "👥",
      features: ["Bulk ordering", "Split payments", "Event catering"]
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "200+", label: "Partner Restaurants" },
    { number: "1M+", label: "Orders Delivered" },
    { number: "4.8★", label: "Average Rating" }
  ];

  return (
    <div className="our-services-section">
      {/* <h2>Our Services</h2> */}
      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.number}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>What We Offer</h2>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Browse & Select</h3>
            <p>Browse through our extensive menu of restaurants and select your favorite dishes.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Place Order</h3>
            <p>Add items to your cart, customize your order, and proceed to checkout with secure payment.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Track Delivery</h3>
            <p>Get real-time updates on your order status and track your delivery in real-time.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Enjoy Your Meal</h3>
            <p>Receive your fresh, hot meal and enjoy the delicious food delivered to your doorstep.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
