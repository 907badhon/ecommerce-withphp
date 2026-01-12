import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../features/orders/ordersSlice";
import { clearCart } from "../features/cart/cartSlice";
import { ShoppingCart } from "lucide-react";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.orders);

  const [formData, setFormData] = useState({
    customer_name: user?.name || "",
    customer_email: user?.email || "",
    customer_address: "",
  });

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderData = { ...formData, items };
    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      alert("Order placed successfully!");
      navigate("/");
    } catch (error) {
      alert("Failed to place order: " + error.message);
    }
  };

  if (items.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold text-white mb-12 text-center">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Shipping Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Shipping Information
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Delivery Address
                  </label>
                  <textarea
                    name="customer_address"
                    value={formData.customer_address}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-2 bg-white/20 text-white border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="House/Flat, Road, Area, City"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-semibold transition cursor-pointer disabled:bg-white/30 disabled:text-gray-400"
                >
                  <ShoppingCart size={20} />
                  {isLoading ? "Placing Order..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-6 sticky top-5 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-white text-sm"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      ৳{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
                <div className="border-t border-white/20 pt-3">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      ৳{totalAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between mt-2 text-gray-300">
                    <span>Shipping</span>
                    <span className="font-semibold">৳100</span>
                  </div>
                </div>
                <div className="border-t border-white/20 pt-3 flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span className="text-sky-400">
                    ৳{(totalAmount + 100).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
