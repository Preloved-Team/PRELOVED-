import React, { useContext } from 'react';
import Navbar from '../components/navbar/navbar';
import './ShopCategory.css';
import Item from '../components/Items/Items';
import { ShopContext } from '../components/Context/ShopContext';

const ShopCategory = (props) => {
  const { Products } = useContext(ShopContext);

  const filteredProducts = Products.filter(item => props.category === item.category);

  if (filteredProducts.length === 0) {
    return (
      <div className='shop-category'>
        <Navbar />
        <div className='shopCategory-indexSort'>
          <p>No products found in the {props.category} category</p>
        </div>
      </div>
    );
  }

  return (
    <div className='shop-category'>
      <Navbar />
      <div className='shopCategory-indexSort'>
        <p>
          <span>Showing 1–{filteredProducts.length}</span> out of {filteredProducts.length} products
        </p>
        <div className='shopCategory-sort'>
          {/* Optional: Sorting dropdown or filters can go here */}
        </div>
      </div>

      <div className='shopCategory-products'>
        {filteredProducts.map((item, i) => (
          <Item
            key={i}
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

export default ShopCategory;
