import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import './Home.css';

const Home = () => {
  const { products } = useContext(ShopContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    'All',
    'Clothing_Accessories',
    'Electronics_Gadgets',
    'Home_Living',
    'Kids_Baby_Items',
    'Vehicles_Automotive',
  ];

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filtered = products.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(term);
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-800">
        🛍️ Explore PreLoved Items
      </h1>

      {/* Search & Filter Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat.replace(/_/g, ' ')}</option>
          ))}
        </select>
      </div>

      {/* Product Display */}
      {products.length === 0 ? (
        <div className="text-center py-20 text-gray-500">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">No items match your search or filter.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.slice(0, 6).map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 group bg-white"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded mb-3 transform group-hover:scale-105 transition-transform duration-300"
                />
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-green-600 font-medium">${item.price.toFixed(2)}</p>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full mt-1 inline-block">
                  {item.category.replace(/_/g, ' ')}
                </span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
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
