import React from "react";
import { Link } from "react-router-dom";

export default function ProductGrid({ products, loading, error }) {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  if (!products || products.length === 0) return <p>No products found.</p>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {products.map((product, index) => {
        return (
          <Link key={index} to={`/product/${product._id}`} className="block">
            <div className="bg-white p-4 rounded-lg">
              <div className="w-full h-96 mb-4">
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alText || product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h1 className=" text-sm mb-2">{product.name}</h1>
              <p className="text-gray-600 font-medium  text-sm mb-2 tracking-tighter">
                {product.price}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
