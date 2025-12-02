import React from "react";

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

  ];

  const stats = [
    { number: "50K+", label: "Happy Customers" },
    { number: "200+", label: "Partner Restaurants" },
    { number: "1M+", label: "Orders Delivered" },
    { number: "4.8★", label: "Average Rating" }
  ];

  return (
    <div className="font-manrope text-text leading-relaxed bg-white">
      {/* Stats Section */}
      <section className="bg-white py-20 w-screen -ml-[calc(50vw-50%)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[30px] max-w-[1200px] mx-auto max-[768px]:grid-cols-2 max-[480px]:grid-cols-1">
            {stats.map((stat, index) => (
              <div key={index} className="text-center py-[30px] px-5 bg-light rounded-[15px] shadow-[0_5px_15px_rgba(78,140,1,0.1)] transition-transform duration-300 ease-in-out hover:-translate-y-1">
                <h3 className="text-[2.5rem] text-primary mb-2.5 font-bold">{stat.number}</h3>
                <p className="text-text text-lg font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-light w-screen -ml-[calc(50vw-50%)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-[2.5rem] mb-[50px] text-text max-[768px]:text-[2rem]">What We Offer</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-[30px] max-w-[1200px] mx-auto max-[768px]:grid-cols-1">
            {services.map((service) => (
              <div key={service.id} className="bg-white p-10 px-[30px] rounded-[20px] text-center transition-all duration-300 ease-in-out border-2 border-transparent shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:-translate-y-2.5 hover:border-primary hover:shadow-[0_20px_40px_rgba(78,140,1,0.1)] max-[768px]:p-8 max-[768px]:px-5">
                <div className="text-[3rem] mb-5">{service.icon}</div>
                <h3 className="text-2xl mb-4 text-text font-semibold">{service.title}</h3>
                <p className="text-text mb-5 leading-relaxed">{service.description}</p>
                <ul className="list-none p-0 text-left">
                  {service.features.map((feature, index) => (
                    <li key={index} className="py-2 text-text relative pl-6 before:content-['✓'] before:absolute before:left-0 before:text-primary before:font-bold">{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white py-20 w-screen -ml-[calc(50vw-50%)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-center text-[2.5rem] mb-[50px] text-text max-[768px]:text-[2rem]">How It Works</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[30px] max-w-[1200px] mx-auto max-[768px]:grid-cols-1">
            <div className="bg-light p-10 px-[30px] rounded-[20px] text-center relative transition-transform duration-300 ease-in-out hover:-translate-y-1 max-[768px]:p-8 max-[768px]:px-5">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">1</div>
              <h3 className="text-xl mb-4 text-text font-semibold">Browse & Select</h3>
              <p className="text-text leading-relaxed">Browse through our extensive menu of restaurants and select your favorite dishes.</p>
            </div>
            <div className="bg-light p-10 px-[30px] rounded-[20px] text-center relative transition-transform duration-300 ease-in-out hover:-translate-y-1 max-[768px]:p-8 max-[768px]:px-5">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">2</div>
              <h3 className="text-xl mb-4 text-text font-semibold">Place Order</h3>
              <p className="text-text leading-relaxed">Add items to your cart, customize your order, and proceed to checkout with secure payment.</p>
            </div>
            <div className="bg-light p-10 px-[30px] rounded-[20px] text-center relative transition-transform duration-300 ease-in-out hover:-translate-y-1 max-[768px]:p-8 max-[768px]:px-5">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">3</div>
              <h3 className="text-xl mb-4 text-text font-semibold">Track Delivery</h3>
              <p className="text-text leading-relaxed">Get real-time updates on your order status and track your delivery in real-time.</p>
            </div>
            <div className="bg-light p-10 px-[30px] rounded-[20px] text-center relative transition-transform duration-300 ease-in-out hover:-translate-y-1 max-[768px]:p-8 max-[768px]:px-5">
              <div className="w-[60px] h-[60px] bg-gradient-to-br from-primary to-primary-dark text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-5">4</div>
              <h3 className="text-xl mb-4 text-text font-semibold">Enjoy Your Meal</h3>
              <p className="text-text leading-relaxed">Receive your fresh, hot meal and enjoy the delicious food delivered to your doorstep.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
