import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import './Home.css';

const Home = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Explore PreLoved Items</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 6).map((item) => (
          <Link
            key={item.id}
            to={`/product/${item.id}`}
            className="border rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-2" />
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-gray-600">${item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
