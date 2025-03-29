import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/slices/productSlice";
import axios from "axios";

export default function EditProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    category: "",
    countInStock: 0,
    description: "",
    image: [],
    gender: "",
    color: [],
    size: [],
    material: "",
    brand: "",
    sku: "",
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleImageUpload = async (e) => {
    // e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        image: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(updateProduct({ id: productData }));
    dispatch(updateProduct({ id, updatedData: productData }));
    navigate("/admin/products");
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6 ">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            className="border w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Product Name"
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter description"
            value={productData.description}
            className="w-full border border-gray-300 rounded-md p-2"
            rows={4}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            required
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            className="border w-full sm:text-sm border-gray-300 rounded-md p-2"
            value={productData.price}
            onChange={(e) =>
              setProductData({
                ...productData,
                price: parseFloat(e.target.value),
              })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Count In Stock
          </label>
          <input
            type="number"
            name="countInStock"
            className="border w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Enter countInStock"
            value={productData.countInStock}
            onChange={(e) =>
              setProductData({
                ...productData,
                countInStock: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            className="border w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Enter sku"
            value={productData.sku}
            onChange={(e) =>
              setProductData({ ...productData, sku: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Size (comma-separated)
          </label>
          <input
            type="text"
            name="size"
            className="border w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Enter size"
            value={productData.size}
            onChange={(e) =>
              setProductData({
                ...productData,
                size: e.target.value.split(",").map((size) => size.trim()),
              })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Color (comma-separated)
          </label>
          <input
            type="text"
            name="color"
            className="border w-full sm:text-sm border-gray-300 rounded-md p-2"
            placeholder="Enter Color"
            value={productData.color}
            onChange={(e) =>
              setProductData({
                ...productData,
                color: e.target.value.split(",").map((color) => color.trim()),
              })
            }
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Upload Image</label>
          <input type="file" onChange={handleImageUpload} />
          <div className="flex gap-4 mt-4">
            {productData.image?.map((image, index) => (
              <div key={index}>
                <img
                  src={image.url}
                  alt={image.alt || ""}
                  className="w-20 h-20 object-cover rounded-md shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}
