import React from 'react';

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome to PreLoved</h1>
      <p className="text-lg mb-4">
        Buy and sell pre-loved items from trusted community members. Discover clothing, accessories, and more at unbeatable prices!
      </p>
      <img
        src="/images/preloved-banner.jpeg"
        alt="PreLoved Banner"
        className="rounded-lg shadow-md w-full max-h-80 object-cover"
      />
    </div>
  );
};

export default Home;
