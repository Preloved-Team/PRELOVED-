import React, { useContext } from 'react';
import Navbar from '../components/navbar/navbar';
import './ShopCategory.css';
import Item from '../components/Items/Items';
import { ShopContext } from '../components/Context/ShopContext';
import Footer from '../components/footer/Footer';
import Top from '../components/AdminBodySection/TopSection/Top';

const ShopCategory = (props) => {
  const { products, loading } = useContext(ShopContext); 

  if (loading) {
    return <div className='shop-category'>Loading products...</div>;
  }

  const filteredProducts = products.filter(item => props.category === item.category);

  if (filteredProducts.length === 0) {
    return (
      <div className='shop-category'>
        <div className='shopCategory-indexSort'>
          <p>No products found in the {props.category} category</p>
        </div>
      </div>
    );
  }

  return (
    <div className='shop-category'>
      <Top/>
      <Navbar/>
      <h1>{props.category}</h1>
      <div className='shopCategory-indexSort'>
        <div className='shopCategory-sort'>
          
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
        <p>
          <span>Showing 1-{filteredProducts.length}</span> out of {filteredProducts.length} products
        </p>
      </div>
      <Footer/>
    </div>
  );
};

export default ShopCategory;