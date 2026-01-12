import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import {
  ShoppingCart,
  Home,
  Box,
  User,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Current route check করার জন্য

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Check if user is on cart or checkout page
  const isCartOrCheckoutPage =
    location.pathname === "/cart" || location.pathname === "/checkout";

  return (
    <nav className="bg-gray-600 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-white font-extrabold hover:text-sky-400 transition"
          >
            <Home size={24} /> E-Shop
          </Link>

          <div className="flex items-center gap-6">
            {/* Products */}
            <Link
              to="/"
              className="flex items-center gap-1 text-white hover:text-sky-400 transition"
            >
              <Box size={18} /> Products
            </Link>

            {/* Admin Dashboard */}
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className="flex items-center gap-1 text-white hover:text-sky-400 transition"
              >
                <User size={18} /> Admin
              </Link>
            )}

            {/* Cart - শুধু customer দের জন্য এবং cart/checkout page এ না থাকলে */}
            {user && user.role === "customer" && !isCartOrCheckoutPage && (
              <Link
                to="/cart"
                className="relative flex items-center gap-1 text-white hover:text-sky-400 transition"
              >
                <ShoppingCart size={20} /> Cart
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
            )}

            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center gap-3 ml-4">
                <span className="text-sm text-white">Hello, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 bg-red-700 hover:bg-red-600 cursor-pointer text-gray-400 px-4 py-2 rounded transition"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="flex items-center gap-1 bg-white/80 text-gray-900 px-4 py-2 rounded hover:bg-white transition"
                >
                  <LogIn size={16} /> Login
                </Link>
                <Link
                  to="/register"
                  className="flex items-center gap-1 bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
                >
                  <UserPlus size={16} /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
