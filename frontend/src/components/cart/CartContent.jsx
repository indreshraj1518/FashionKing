import React from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  updateCartItemQuantity,
  removeFromCart,
} from "../../redux/slices/cartSlice";
export default function CartContent({ cart, userId, guestId }) {
  // const cardProducts = [
  //   {
  //     productId: 1,
  //     productName: "T-shirt",
  //     price: 300,
  //     quantity: 2,
  //     size: "M",
  //     color: "Red",
  //     image:
  //       "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   },
  //   {
  //     productId: 2,
  //     productName: "jeans",
  //     price: 500,
  //     quantity: 3,
  //     size: "L",
  //     color: "Blue",
  //     image: "https://picsum.photos/200?random=2",
  //   },
  //   {
  //     productId: 2,
  //     productName: "jeans",
  //     price: 500,
  //     quantity: 3,
  //     size: "L",
  //     color: "Blue",
  //     image: "https://picsum.photos/200?random=2",
  //   },
  //   {
  //     productId: 2,
  //     productName: "jeans",
  //     price: 500,
  //     quantity: 3,
  //     size: "L",
  //     color: "Blue",
  //     image: "https://picsum.photos/200?random=2",
  //   },
  //   {
  //     productId: 2,
  //     productName: "jeans",
  //     price: 500,
  //     quantity: 3,
  //     size: "L",
  //     color: "Blue",
  //     image: "https://picsum.photos/200?random=2",
  //   },
  //   {
  //     productId: 2,
  //     productName: "jeans",
  //     price: 500,
  //     quantity: 3,
  //     size: "L",
  //     color: "Blue",
  //     image: "https://picsum.photos/200?random=2",
  //   },
  //   {
  //     productId: 2,
  //     productName: "jeans",
  //     price: 500,
  //     quantity: 3,
  //     size: "L",
  //     color: "Blue",
  //     image: "https://picsum.photos/200?random=2",
  //   },
  // ];

  const dispatch = useDispatch();
  // handle  adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(
      removeFromCart({
        productId,
        size,
        color,
        userId,
        guestId,
      })
    );
  };
  return (
    <div>
      {cart?.products?.length > 0 ? (
        cart.products.map((product, index) => {
          return (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.productName}
                  className="w-20 h-24 mr-4 rounded"
                />
              </div>
              <div className="flex flex-col justify-start">
                <h3>{product.productName}</h3>
                <p className="text-xs text-gray-500">Price: ${product.price}</p>
                <p className="text-xs text-gray-500">
                  <b> Size</b>: {product.size} | <b className="ml-1">Color</b>:{" "}
                  {product.color}
                </p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        -1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-semibold"
                  >
                    -
                  </button>
                  <span className="mx-4">{product.quantity}</span>
                  <button
                    onClick={() =>
                      handleAddToCart(
                        product.productId,
                        1,
                        product.quantity,
                        product.size,
                        product.color
                      )
                    }
                    className="border rounded px-2 py-1 text-xl font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="mt-5 justify-end ">
                <button
                  onClick={() =>
                    handleRemoveFromCart(
                      product.productId,
                      product.size,
                      product.color
                    )
                  }
                >
                  <RiDeleteBin5Fill className="h-6 w-6 mt-2 text-red-600" />
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="text-center text-gray-500">Cart is empty</p>
      )}
    </div>
  );
}
