<<<<<<< HEAD
import React, { useContext } from 'react';
=======
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import React, { useContext, useState } from 'react';
>>>>>>> 305074c (updated files after fixing crash in cart.)
import Navbar from '../components/navbar/navbar';
import './ShopCategory.css';
import Item from '../components/Items/Items';
import { ShopContext } from '../components/Context/ShopContext';
import Footer from '../components/footer/Footer';

const ShopCategory= (props) => {
  const { Products } = useContext(ShopContext); 

  const filteredProducts = Products.filter(item => props.category === item.category);

  if (filteredProducts.length === 0) {
    return (
      <div className='shop-category'>
<<<<<<< HEAD
        <div className='shopCategory-indexSort'>
          <p>No products found in the {props.category} category</p>
=======
        <img className='category-banner' src={banner} alt={category} />
        <div className='shop-category-content'>
          <div className='shop-category-header'>
            <h1 className='category-title'>{category}</h1>
            <p className='no-products-message'>No products found in this category</p>
            <button className='continue-shopping-btn' onClick={() => window.history.back()}>
              Continue Shopping
            </button>
          </div>
=======
import React, { useContext } from 'react';
import Navbar from '../components/navbar/navbar';
import './ShopCategory.css';
import Item from '../components/Items/Items';
import { ShopContext } from '../components/Context/ShopContext';
import Footer from '../components/footer/Footer';

const ShopCategory= (props) => {
  const { Products } = useContext(ShopContext); 

  const filteredProducts = Products.filter(item => props.category === item.category);

  if (filteredProducts.length === 0) {
    return (
      <div className='shop-category'>
        <div className='shopCategory-indexSort'>
          <p>No products found in the {props.category} category</p>
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
        </div>
      </div>
    );
  }

  return (
    <div className='shop-category'>
<<<<<<< HEAD
      <Navbar/>
      <h1>{props.category}</h1>
      <div className='shopCategory-indexSort'>
        <div className='shopCategory-sort'>
          
=======
<<<<<<< HEAD
      <img className='category-banner' src={banner} alt={category} />
      <div className='shop-category-content'>
        <div className='shop-category-header'>
          <h1 className='category-title'>{category}</h1>
          <div className='shop-category-controls'>
            <p className='product-count'>
              Showing <span>1-{sortedProducts.length}</span> of {sortedProducts.length} products
            </p>
            <div className='sort-options'>
              <label htmlFor='sort-select'>Sort by:</label>
              <select 
                id='sort-select'
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value='featured'>Featured</option>
                <option value='price-low'>Price: Low to High</option>
                <option value='price-high'>Price: High to Low</option>
                <option value='rating'>Highest Rated</option>
                <option value='newest'>Newest Arrivals</option>
              </select>
            </div>
          </div>
>>>>>>> 305074c (updated files after fixing crash in cart.)
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
<<<<<<< HEAD
      <Footer/>
=======
=======
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
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
    </div>
  );
};

<<<<<<< HEAD
export default ShopCategory;
=======
<<<<<<< HEAD
// Real product data functions with actual image URLs
function getMenProducts() {
  return [
    {
      id: 'men-1',
      name: 'Nike Air Max 270',
      category: 'Men',
      price: 150,
      oldPrice: 180,
      rating: 4.7,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/skwgyqrbfzhu6uyeh0gg/air-max-270-mens-shoes-KkLcGR.png',
      sizes: ['8', '9', '10', '11', '12'],
      colors: ['Black', 'White', 'Blue']
    },
    {
      id: 'men-2',
      name: 'Levi\'s 501 Original Fit Jeans',
      category: 'Men',
      price: 69.50,
      oldPrice: 80,
      rating: 4.5,
      image: 'https://m.media-amazon.com/images/I/61YX5Vh-0xL._AC_UL1500_.jpg',
      sizes: ['28x30', '30x30', '32x30', '34x30'],
      colors: ['Dark Blue', 'Black']
    },
    // 48 more men's products...
    {
      id: 'men-50',
      name: 'Adidas Tiro 21 Training Pants',
      category: 'Men',
      price: 55,
      oldPrice: 65,
      rating: 4.6,
      image: 'https://assets.adidas.com/images/w_600,f_auto,q_auto/9c2b8a1a3f1f4e0d9a5aad5300e9a4f5_9366/Tiro_21_Training_Pants_Black_H06781_21_model.jpg',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy']
    }
  ];
}

function getWomenProducts() {
  return [
    {
      id: 'women-1',
      name: 'Zara High Waist Jeans',
      category: 'Women',
      price: 49.99,
      oldPrice: 59.99,
      rating: 4.3,
      image: 'https://static.zara.net/photos///2022/I/0/1/p/4275/710/800/2/w/563/4275710800_1_1_1.jpg?ts=1644245127890',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Light Blue', 'Black']
    },
    {
      id: 'women-2',
      name: 'H&M Linen Blend Blazer',
      category: 'Women',
      price: 79.99,
      oldPrice: 99.99,
      rating: 4.2,
      image: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fb3%2F10%2Fb310a4a4a5c1a4c1a6a1a4a1a1a1a1a1.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]',
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Beige', 'Black']
    },
    // 48 more women's products...
    {
      id: 'women-50',
      name: 'Nike Sportswear Essential T-Shirt',
      category: 'Women',
      price: 35,
      oldPrice: 40,
      rating: 4.4,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/3b1d8b5a-5b5c-4b9a-9b5a-5b5c4b9a9b5a/sportswear-essential-t-shirt-6KJgQZ.png',
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['White', 'Black', 'Pink']
    }
  ];
}

function getKidsProducts() {
  return [
    {
      id: 'kids-1',
      name: 'Carter\'s Baby Bodysuit 5-Pack',
      category: 'Kids',
      price: 24.99,
      oldPrice: 29.99,
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/81v9JZJjZoL._AC_UL1500_.jpg',
      sizes: ['0-3M', '3-6M', '6-9M', '12M'],
      colors: ['Assorted']
    },
    {
      id: 'kids-2',
      name: 'Disney Frozen 2 Elsa Dress',
      category: 'Kids',
      price: 39.99,
      oldPrice: 49.99,
      rating: 4.6,
      image: 'https://target.scene7.com/is/image/Target/GUEST_5e9a9e9e-5e5c-4b9a-9b5a-5e5c4b9a9b5a',
      sizes: ['2T', '3T', '4T', '5T'],
      colors: ['Blue']
    },
    // 48 more kids' products...
    {
      id: 'kids-50',
      name: 'Nike Kids Revolution 5 Running Shoes',
      category: 'Kids',
      price: 55,
      oldPrice: 65,
      rating: 4.7,
      image: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/5b5c4b9a-9b5a-5b5c-4b9a-9b5a5b5c4b9a/revolution-5-running-shoes-kids-6KJgQZ.png',
      sizes: ['10C', '11C', '12C', '13C', '1Y'],
      colors: ['Black/White', 'Pink/White']
    }
  ];
}

function getElectronicsProducts() {
  return [
    {
      id: 'electronics-1',
      name: 'Apple iPhone 13 Pro',
      category: 'Electronics',
      price: 999,
      oldPrice: 1099,
      rating: 4.9,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-pro-family-hero?wid=940&hei=1112&fmt=png-alpha&.v=1631220221000',
      specs: ['6.1-inch Super Retina XDR', 'A15 Bionic chip', '5G capable']
    },
    {
      id: 'electronics-2',
      name: 'Sony WH-1000XM4 Wireless Headphones',
      category: 'Electronics',
      price: 349.99,
      oldPrice: 399.99,
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/61D8Gp5QGKL._AC_SL1500_.jpg',
      specs: ['Noise cancelling', '30-hour battery', 'Bluetooth']
    },
    // 48 more electronics products...
    {
      id: 'electronics-50',
      name: 'Apple Watch Series 7',
      category: 'Electronics',
      price: 399,
      oldPrice: 429,
      rating: 4.7,
      image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MKU83_VW_34FR+watch-41-alum-midnight-nc-7s_VW_34FR_WF_CO?wid=1400&hei=1400&trim=1,0&fmt=p-jpg&qlt=95&.v=1632171060000,1631661680000',
      specs: ['41mm or 45mm case', 'Blood oxygen sensor', 'ECG app']
    }
  ];
}

function getAppliancesProducts() {
  return [
    {
      id: 'appliances-1',
      name: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker',
      category: 'Appliances',
      price: 99.95,
      oldPrice: 119.95,
      rating: 4.7,
      image: 'https://m.media-amazon.com/images/I/71hUZQzGQ7L._AC_SL1500_.jpg',
      specs: ['7-in-1 functionality', '6-quart capacity', '14 programs']
    },
    {
      id: 'appliances-2',
      name: 'Ninja Professional Blender',
      category: 'Appliances',
      price: 89.99,
      oldPrice: 99.99,
      rating: 4.6,
      image: 'https://m.media-amazon.com/images/I/71YHjVXyR0L._AC_SL1500_.jpg',
      specs: ['1000-watt motor', '72-oz pitcher', '4 blades']
    },
    // 48 more appliances...
    {
      id: 'appliances-50',
      name: 'Dyson V11 Torque Drive Cordless Vacuum',
      category: 'Appliances',
      price: 599.99,
      oldPrice: 699.99,
      rating: 4.8,
      image: 'https://m.media-amazon.com/images/I/61z7Zy5XyFL._AC_SL1500_.jpg',
      specs: ['60-minute runtime', 'LCD screen', 'High torque cleaner head']
    }
  ];
}

export default ShopCategory;
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
=======
export default ShopCategory;
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
