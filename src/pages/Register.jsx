import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register, clearError } from "../features/auth/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [localError, setLocalError] = useState("");
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
    setLocalError("");

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    const { confirmPassword, ...registerData } = formData;
    dispatch(register(registerData));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl p-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-2 text-white">
          Create your account
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Premium shopping experience starts here
        </p>

        {(error || localError) && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg mb-4 text-sm">
            {error || localError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Full name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

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
              placeholder="Minimum 6 characters"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">
              Confirm password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Repeat your password"
              className="w-full px-4 py-2.5 rounded-xl bg-black/40 text-white border border-white/20 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white/80 hover:bg-white text-gray-900 py-3 rounded-xl font-semibold transition backdrop-blur disabled:opacity-50"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-300 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-sky-400 hover:underline font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
