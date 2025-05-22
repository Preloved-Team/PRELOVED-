// Import required React and other dependencies
import React from 'react';
// Import CSS styles for the Listing component
import ListingStyle from './Listing.css';
// Import the Item component to display individual products
import Item from '../../Items/Items';
// Import product data from JSON file
import Products from '../../Assets/Products.json';
// Import Navbar component (though not currently used in this component)
import Navbar from '../../navbar/navbar';

// Define the Listing component
const Listing = () => {
  return (
    <div>
      {/* Main heading for the listing page */}
      <h1>LISTING</h1>
      
      {/* Button to add new products (currently without functionality) */}
      <button className='addProduct-bttn'>
        ADD PRODUCTS
      </button>
      
      {/* Container for the list of products */}
      <div className='ITEM-LISTING'>
        {/* 
          Map through the Products array and render each item 
          using the Item component 
        */}
        {Products.map((item, i) => {
          return (
            <Item 
              key={i}               // Unique key for React's rendering optimization
              id={item.id}         // Product ID passed as prop
              name={item.name}     // Product name passed as prop
              image={item.image}   // Product image passed as prop
              price={item.price}  // Product price passed as prop
            />
          )
        })}
      </div>
    </div>
  )
}

// Export the Listing component as default
export default Listing