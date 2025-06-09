import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import './Home.css';

const Home = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        🔍 Explore PreLoved Items
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-12">
          No products available right now. Please check back later!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-3 transform group-hover:scale-105 transition-transform duration-200"
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/BuyerDashboard">
              <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                View All Products →
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
