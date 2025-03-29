import React from "react";
import { IoMdClose } from "react-icons/io";
import CartContent from "../cart/CartContent";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CartDrawer({ drawerOpen, toggleDrawer }) {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckOutButtoon = () => {
    toggleDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };
  return (
    <div
      className={`fixed top-0 right-0 w-1/4 sm:1/2 md:[30rem] h-full bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* close button  */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleDrawer}
          // className="p-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* component for the contents */}
      <div className="flex-grow p-4 overflow-y-auto">
        <h2 className="text-xl font-semibold mb-2">your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContent cart={cart} userId={userId} guestId={guestId} />
        ) : (
          <p>Your Cart is empty.</p>
        )}
      </div>
      {/* checkout button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckOutButtoon}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 mt-2 text-center">
              shipping,taxes,and discount codes,calculated at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
// 14 hr 1minute
