import React from 'react';
import Navbar from '../components/navbar/navbar';

const sampleItems = [
  { id: 1, name: "Used Bicycle", location: "Auckland" },
  { id: 2, name: "Old Camera", location: "Wellington" },
  { id: 3, name: "Vintage Clock", location: "Auckland" },
];

const userLocation = "Auckland"; // simulate user location
const nearbyItems = sampleItems.filter(item => item.location === userLocation);


const ShopCategory = () => {
  return (
    <div>
      <Navbar/>
      <div style={{ marginTop: '30px', padding: '10px' }}>
        <h2>📍 Nearby Listings in {userLocation}</h2>
        <ul>
          {nearbyItems.map(item => (
            <li key={item.id}>
              {item.name} – {item.location}
          </li>
        ))}
      </ul>
    </div>
  </div>
  );
};

export default ShopCategory;
