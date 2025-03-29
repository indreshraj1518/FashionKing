import React from "react";
import mensCollectionImage from "../../assets/manCollection1.jpg";
import womenCollectionImage from "../../assets/womenCollection1.jpg";
import { Link } from "react-router-dom";
export default function GenderCollectionSection() {
  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* women's collection */}
        <div className="relative flex-1">
          <img
            src={womenCollectionImage}
            alt=""
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              {" "}
              shop now
            </Link>
          </div>
        </div>
        {/* mens Collection */}
        <div className="relative flex-1">
          <img
            src={mensCollectionImage}
            alt=""
            className="w-full h-[700px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-900 underline"
            >
              {" "}
              shop now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
