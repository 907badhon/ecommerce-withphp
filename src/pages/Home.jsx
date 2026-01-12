import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, isLoading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product) => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(addToCart(product));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black">
        <div className="text-xl text-gray-300 animate-pulse">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-white mb-10 text-center">
          Discover Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col rounded-2xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-52 object-cover"
                />
                {product.stock === 0 && (
                  <span className="absolute top-3 right-3 text-xs bg-red-500/80 text-white px-3 py-1 rounded-full">
                    Out of stock
                  </span>
                )}
              </div>

              <div className="p-4 flex flex-col flex-1 gap-1">
                <h3 className="text-base font-semibold text-white line-clamp-2 min-h-[3rem]">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-300 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-sky-400">
                      ৳{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-400">
                      Stock: {product.stock}
                    </span>
                  </div>

                  {/* Customer এর জন্য Add to Cart button */}
                  {user && user.role === "customer" && (
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 ease-in-out bg-white/80 hover:bg-white text-gray-900 disabled:bg-white/30 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      <ShoppingCart size={18} />
                      {product.stock === 0 ? "Unavailable" : "Add to cart"}
                    </button>
                  )}

                  {/* Login না করা user এর জন্য */}
                  {!user && (
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all duration-300 ease-in-out bg-sky-500/80 hover:bg-sky-500 text-white"
                    >
                      <ShoppingCart size={18} />
                      Login to Purchase
                    </button>
                  )}

                  {user && user.role === "admin" && (
                    <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold bg-gray-500/30 text-gray-300 cursor-not-allowed">
                      <ShoppingCart size={18} />
                      Customer Order Only
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-gray-400">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
