import React from "react";
import PageHero from "../../components/PageHero/PageHero";
import { assets } from "../../assets/frontend_assets/assets";

export default function AboutUs() {
  return (
    <div className="font-manrope text-text leading-relaxed bg-white">
      {/* Hero Section */}
      <PageHero 
        header="About Olive Foods"
        title="Your premier destination for delicious, fresh food delivered right to your doorstep. Experience the convenience of modern Olive Foods delivery with quality you can trust."
      />

      {/* Application Mission */}
      <section className="text-center py-20 bg-white w-screen -ml-[calc(50vw-50%)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-[2.5rem] mb-5 max-[768px]:text-[2rem]">Our Mission</h2>
          <p className="max-w-[800px] mx-auto text-lg text-text max-[768px]:text-base">
            At Olive Foods, our mission is to revolutionize the Olive Foods delivery experience by connecting customers with 
            the finest restaurants and culinary experiences. We strive to make quality food accessible, convenient, 
            and enjoyable for everyone, while supporting local businesses and promoting sustainable food practices.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative w-screen -ml-[calc(50vw-50%)] bg-light flex justify-center items-center flex-col min-h-[60vh] py-20 text-center">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-[2.5rem] mb-10 max-[768px]:text-[2rem]">Our Core Values</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-[30px] max-[768px]:flex max-[768px]:flex-col max-[768px]:items-center">
            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-full transition-transform duration-300 ease-in-out hover:-translate-y-2.5">
              <div className="text-[48px] leading-none mb-6">⭐</div>
              <h3 className="text-2xl mb-2.5">Quality First</h3>
              <p className="text-text">
                We partner only with the finest restaurants and ensure every meal
                meets our high standards for freshness and taste.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-full transition-transform duration-300 ease-in-out hover:-translate-y-2.5">
              <div className="text-[48px] leading-none mb-6">😊</div>
              <h3 className="text-2xl mb-2.5">Customer Satisfaction</h3>
              <p className="text-text">
                Your happiness is our priority. We go above and beyond to ensure
                every order exceeds your expectations.
              </p>
            </div>

            <div className="bg-white p-[30px] rounded-[15px] shadow-[0_10px_25px_rgba(0,0,0,0.1)] w-full transition-transform duration-300 ease-in-out hover:-translate-y-2.5">
              <div className="text-[48px] leading-none mb-6">💡</div>
              <h3 className="text-2xl mb-2.5">Innovation</h3>
              <p className="text-text">
                We continuously improve our platform with cutting-edge technology
                to make Olive Foods delivery faster and more convenient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="bg-white text-center py-20 w-screen -ml-[calc(50vw-50%)]">
        <div className="max-w-[1200px] mx-auto px-5">
          <h2 className="text-[2.5rem] mb-2.5 max-[768px]:text-[2rem]">Meet the Developer</h2>
          <p className="mb-10">This application has been designed and developed by:</p>
          <div className="flex flex-wrap justify-center gap-[30px] items-center mt-10">
            <div className="bg-light rounded-[20px] p-10 px-[30px] w-[320px] shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-[0.4s] ease-in-out hover:-translate-y-3 hover:shadow-[0_15px_40px_rgba(78,140,1,0.2)]">
              <div className="relative w-[160px] h-[160px] mx-auto mb-5 before:content-[''] before:absolute before:inset-[-5px] before:bg-gradient-to-br before:from-primary before:to-[#6ab001] before:rounded-full before:-z-[1] before:animate-[pulse_2s_ease-in-out_infinite]">
                <img src={assets.profile_img} alt="Janitha Madushan" className="w-[160px] h-[160px] rounded-full object-cover border-[5px] border-white shadow-[0_5px_20px_rgba(0,0,0,0.15)]" />
              </div>
              <h3 className="text-2xl mb-2 text-text font-bold">Janitha Madushan</h3>
              <p className="text-primary text-base font-semibold mb-4">Full Stack Developer & UI/UX Designer</p>
              <p className="text-[#666] text-sm italic mt-4 pt-4 border-t border-[rgba(78,140,1,0.2)]">All Rights Reserved © 2025</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
