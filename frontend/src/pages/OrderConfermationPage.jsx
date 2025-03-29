import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
// const checkout = {
//   _id: "12312",
//   createdAt: new Date(),
//   checkOutItems: [
//     {
//       productId: "1",
//       name: "jacket",
//       color: "Black",
//       size: "M",
//       price: 100,
//       quantity: 1,
//       image: "https://picsum.photos/500/500?random=5",
//     },
//     {
//       productId: "2",
//       name: "T-Shirt",
//       color: "Blue",
//       size: "L",
//       price: 150,
//       quantity: 2,
//       image: "https://picsum.photos/500/500?random=9",
//     },
//   ],
//   shippingAddress: {
//     address: "123 Bhopal",
//     city: "Bhopal",
//     state: "Madhya Pradesh",
//     zipCode: "462022",
//     country: "India",
//   },
// };

export default function OrderConfermationPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  // Clear the cart when the order is confirmed
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, navigate, dispatch]);
  const calculateEstimateDelivery = (createdAt) => {
    const orderDate = new Date(createdAt);
    orderDate.setDate(orderDate.getDate() + 10);
    // add 10 days to the order date
    return orderDate.toLocaleDateString;
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      \
      <h1 className="text-4xl font-bold text-center text-emerald-700 mb-8">
        Thank you for your order!
      </h1>
      {checkout && (
        <div className="p-6 rounded-lg border">
          <div className="flex justify-between mb-20">
            {/* Order Id and Date */}
            <div>
              <h2 className="text-xl font-semibold">
                Order ID: {checkout._id}
              </h2>
              <p className="text-gray-500">
                Order Date: {new Date(checkout.createdAt).toLocaleString()}
              </p>
            </div>
            {/* Estimated Delivery */}
            <div>
              <p className="text-emerald-700 text-sm">
                Estimate Delivery:{""}
                {calculateEstimateDelivery(checkout.createdAt)}
              </p>
            </div>
          </div>
          {/* Order Items */}
          <div className="mb-20">
            {checkout.checkOutItems.map((item) => (
              <div className="flex items-center mb-4" key={item.productId}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="">
                  <h4 className="text-md font-semibold ">{item.name}</h4>
                  <p className="text-gray-600 text-sm">
                    {item.color} | {item.size}
                  </p>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-md">${item.price}</p>
                  <p className="text-sm text-gray-500 ">Qty:{item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Payment and Delivary Info */}
          <div className="grid grid-cols-2 gap-8">
            {/* Payment Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2">Payment</h4>
              <p className="text-gray-600">PayPal</p>
            </div>

            {/* Delivary Info */}
            <div>
              <h4 className="text-lg font-semibold mb-2"> Delivary</h4>
              <p className="text-gray-600">
                {checkout.shippingAddress.address}
              </p>
              <p className="text-gray-600">
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.state}{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
// 5 hr 23 min and 19 seconds completed
