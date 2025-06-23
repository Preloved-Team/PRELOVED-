import React, { useContext } from 'react';
import './Listing.css';
import Item from '../../Items/Items';
import { ShopContext } from '../../Context/ShopContext';

const Listing = () => {
  const { products, loading } = useContext(ShopContext);

  if (loading) {
    return <div className="listing">Loading products...</div>;
  }

  return (
    <div className="listing">
      <h1>All Items</h1>
      <div className="ITEM-LISTING">
        {products.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Listing;
