import React from 'react';

const Men = () => {
  // 🔸 Nearby listings mock data
  const sampleItems = [
    { id: 1, name: "Used Shoes", location: "Auckland" },
    { id: 2, name: "Jeans", location: "Wellington" },
    { id: 3, name: "Leather Jacket", location: "Auckland" },
  ];

  const userLocation = "Auckland";
  const nearbyItems = sampleItems.filter(item => item.location === userLocation);

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Men's Collection (Nearby Listings Only)</h2>

      {/* 📍 Nearby Listings */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#ffe4b5',
        color: 'black',
        border: '2px dashed #000',
        borderRadius: '10px'
      }}>
        <h3>Nearby Listings in {userLocation}</h3>
        <ul>
          {nearbyItems.map(item => (
            <li key={item.id}>{item.name} – {item.location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Men;
