import React, { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

export default function CollectionPage() {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const quaryParams = Object.fromEntries([...searchParams]);
  // const [products, setProducts] = useState([]);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null); // ✅ Add a ref for the button
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ ...quaryParams, collection }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // ✅ Toggle visibility
  };

  const handleClickOutside = (e) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(e.target) && // ✅ Click outside sidebar
      buttonRef.current &&
      !buttonRef.current.contains(e.target) // ✅ Ignore clicks on button
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setProducts([
  //       {
  //         _id: "1",
  //         name: "Stylish jacket",
  //         price: 120,
  //         image: [
  //           {
  //             url: "https://picsum.photos/500/500?random=1",
  //             altText: "Stylish jacket",
  //           },
  //         ],
  //       },
  //       {
  //         _id: "2",
  //         name: "Stylish jacket",
  //         price: 120,
  //         image: [
  //           {
  //             url: "https://picsum.photos/500/500?random=2",
  //             altText: "Stylish jacket",
  //           },
  //         ],
  //       },
  //       {
  //         _id: "3",
  //         name: "Stylish jacket",
  //         price: 120,
  //         image: [
  //           {
  //             url: "https://picsum.photos/500/500?random=3",
  //             altText: "Stylish jacket",
  //           },
  //         ],
  //       },
  //       {
  //         _id: "4",
  //         name: "Stylish jacket",
  //         price: 160,
  //         image: [
  //           {
  //             url: "https://picsum.photos/500/500?random=4",
  //             altText: "Stylish jacket",
  //           },
  //         ],
  //       },
  //       {
  //         _id: "5",
  //         name: "Stylish jacket",
  //         price: 140,
  //         image: [
  //           {
  //             url: "https://picsum.photos/500/500?random=5",
  //             altText: "Stylish jacket",
  //           },
  //         ],
  //       },
  //       {
  //         _id: "6",
  //         name: "Stylish jacket",
  //         price: 180,
  //         image: [
  //           {
  //             url: "https://picsum.photos/500/500?random=6",
  //             altText: "Stylish jacket",
  //           },
  //         ],
  //       },
  //     ]);
  //   }, 1000);
  // }, []);

  return (
    <div className="flex flex-col lg:flex-row relative">
      {/* ✅ Mobile Filter Button with ref */}
      <button
        ref={buttonRef} // ✅ Assign ref to button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex items-center fixed top-4 left-4 bg-white shadow-md z-50"
      >
        <FaFilter className="mr-2" />
        Filters
      </button>

      {/* ✅ Sidebar (Hidden by default, toggles open/close) */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:relative lg:translate-x-0 lg:block z-40 shadow-lg`}
      >
        <FilterSidebar />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>
        <SortOption />
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
}
