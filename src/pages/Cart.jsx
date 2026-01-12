import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeFromCart, updateQuantity } from "../features/cart/cartSlice";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0)
      dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-5">
            Your Cart is Empty
          </h2>
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center gap-2 bg-white/20 text-white px-6 py-3 rounded-2xl hover:bg-white/40 transition-all duration-300"
          >
            <ShoppingCart size={20} /> Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-white mb-12 text-center">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-stretch bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-105 overflow-hidden"
              >
                {/* Image full height */}
                <div className="w-36 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Item Info */}
                <div className="flex-1 p-4 flex flex-col justify-between gap-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white line-clamp-2">
                        {item.name}
                      </h3>
                      <p className="text-sky-400 font-bold mt-1 text-lg">
                        ৳{item.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Delete icon next to image */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700 bg-white/20 p-2 rounded-full flex items-center justify-center shadow-md transition cursor-pointer ml-2"
                    >
                      <Trash2 size={18} className="text-white" />
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 mt-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="w-9 h-9 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium text-white text-lg">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="w-9 h-9 bg-white/20 text-white rounded-full flex items-center justify-center hover:bg-white/40 transition cursor-pointer"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 sticky top-5 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ৳{totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="font-semibold">৳100</span>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-sky-400">
                    ৳{(totalAmount + 100).toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition cursor-pointer shadow-md"
              >
                <ShoppingCart size={20} /> Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
