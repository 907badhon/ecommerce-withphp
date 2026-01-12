import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, clearError } from "../features/auth/authSlice";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
          Welcome back
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Login to continue your shopping
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Your secure password"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white/80 hover:bg-white text-gray-900 py-3 rounded-xl font-semibold transition backdrop-blur disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-300 text-sm">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-sky-400 hover:underline font-semibold"
          >
            Create one
          </Link>
        </p>

        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-400 mb-1 font-semibold">Admin demo</p>
          <p className="text-xs text-gray-400">Email: admin@example.com</p>
          <p className="text-xs text-gray-400">Password: admin123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
