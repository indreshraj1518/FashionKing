import React from "react";
import { useSearchParams } from "react-router-dom";

export default function SortOption() {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };
  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        className="border p-2 rounded-md focous:outline-none"
        name=""
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get("sortBy") || ""}
      >
        <option value="">Default</option>
        <option value="popularity">Popularity</option>
        <option value="priceLowToHigh">Price: Low to High</option>
        <option value="priceHighToLow">Price: High to Low</option>
      </select>
    </div>
  );
}
