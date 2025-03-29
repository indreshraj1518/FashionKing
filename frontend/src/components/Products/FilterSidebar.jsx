import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function FilterSidebar() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    material: [],
    brand: [],
    minPrice: 0,
    maxPrice: 100,
  });
  const [priceRange, setPriceRange] = useState([0, 100]);
  const categores = ["Top Wear", "Bottom Wear"];
  const colors = [
    "Black",
    "White",
    "Red",
    "Blue",
    "Green",
    "Yellow",
    "Purple",
    "Orange",
    "Pink",
    "Brown",
    "Gray",
    "Silver",
    "Gold",
    "Beige",
  ];
  const sizes = ["S", "M", "L", "XL", "XS", "XXL"];
  const materials = [
    "Cotton",
    "Polyester",
    "Linen",
    "Silk",
    "Wool",
    "Fleece",
    "Denim",
    "Viscose",
  ];
  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Style",
    "Bench Breeze",
    "Fashionista",
    "ChicStyle",
  ];
  const genders = ["Men", "Women"];
  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      material: params.material ? params.material.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: parseInt(params.minPrice) || 0,
      maxPrice: parseInt(params.maxPrice) || 100,
    });
    setPriceRange([
      parseInt(params.minPrice) || 0,
      parseInt(params.maxPrice) || 100,
    ]);
  }, [searchParams]);
  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilter = { ...filters };
    if (type === "checkbox") {
      if (checked) {
        newFilter[name] = [...(newFilter[name] || []), value];
      } else {
        newFilter[name] = newFilter[name].filter((item) => item !== value);
      }
    } else {
      newFilter[name] = value;
    }
    setFilters(newFilter);
    // console.log(newFilter);
    updateURLParamas(newFilter);
  };
  const updateURLParamas = (newFilter) => {
    const params = new URLSearchParams();
    // {category:"Top Wear ",size:["xs""S"]}
    Object.keys(newFilter).forEach((key) => {
      if (Array.isArray(newFilter[key]) && newFilter[key].length > 0) {
        params.append(key, newFilter[key].join(","));
      } else if (newFilter[key]) {
        params.append(key, newFilter[key]);
      }
    });
    setSearchParams(params);
    navigate(`?${params.toString()}`);
    // ?category=Bottom+Wear&Size=XS%CS
  };
  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    setPriceRange([0, newPrice]);
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
    setFilters(newFilters);
    updateURLParamas(newFilters);
  };
  return (
    <div className="p-4">
      <h3 className="text-xl font-medium text-gray-800 mb-4">Filter</h3>
      {/* Category Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Category
        </label>
        {categores.map((category) => (
          <div key={category} className="flex items-center mb-1">
            <input
              type="radio"
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue focus:ring-blue-400 border-gray-300"
              name="category"
              checked={filters.category === category}
              value={category}
            />
            <span className="text-gray-700">{category}</span>
          </div>
        ))}
      </div>
      {/* Gender Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Genders
        </label>
        {genders.map((gender) => (
          <div key={gender} className="flex items-center mb-1">
            <input
              type="radio"
              onChange={handleFilterChange}
              className="mr-2 h-4 w-4 text-blue focus:ring-blue-400 border-gray-300"
              name="gender"
              checked={filters.gender === gender}
              value={gender}
            />
            <span className="text-gray-700">{gender}</span>
          </div>
        ))}
      </div>
      {/* Color Filter */}
      {/* ....time..4hr 10 min*/}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Color
        </label>
        {colors.map((color) => (
          <button
            className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
              filters.color === color ? "ring-2 ring-blue-500" : ""
            }`}
            key={color}
            onClick={handleFilterChange}
            name="color"
            value={color}
            style={{ backgroundColor: color.toLowerCase() }}
          ></button>
        ))}
      </div>
      {/* Size Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Size
        </label>
        {sizes.map((size) => (
          <div key={size} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue focus:ring-blue-400 border-gray-300"
              name="size"
              value={size}
              onChange={handleFilterChange}
              checked={filters.size.includes(size)}
            />
            <span className="text-gray-700">{size}</span>
          </div>
        ))}
      </div>
      {/* material Filter */}
      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Materials
        </label>
        {materials.map((material) => (
          <div key={material} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue focus:ring-blue-400 border-gray-300"
              name="material"
              value={material}
              onChange={handleFilterChange}
              checked={filters.material.includes(material)}
            />
            <span className="text-gray-700">{material}</span>
          </div>
        ))}
      </div>
      {/* Brand Filter */}

      <div className="mb-6">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Brand
        </label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 text-blue focus:ring-blue-400 border-gray-300"
              name="brand"
              value={brand}
              onChange={handleFilterChange}
              checked={filters.brand.includes(brand)}
            />
            <span className="text-gray-700">{brand}</span>
          </div>
        ))}
      </div>
      {/* Price Range Filter */}
      <div className="mb-8">
        <label htmlFor="" className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="priceRange"
          value={priceRange[1]}
          onChange={handlePriceChange}
          min={0}
          max={100}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
