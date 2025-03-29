import React from "react";
import heroImg from "../../assets/hero2.jpg";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="heroImg"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute bg-opacity-5 inset-0 bg-black flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4">
            Vaction <br /> Ready
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vaction-ready outfits with fast worldwide shipping.
          </p>
          <Link
            to="#"
            className="bg-white text-gray-900 px-6 py-2 rounded-sm text-lg"
          >
            Shop now
          </Link>
        </div>
      </div>
    </section>
  );
}
