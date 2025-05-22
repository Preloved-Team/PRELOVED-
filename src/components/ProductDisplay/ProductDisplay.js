import React from 'react';
import './ProductDisplay.css';
import starIcon from '../../assets/star-icon.png'; // Assume you have a star icon

const ProductDisplay = ({ product }) => {
  // Array of images for the gallery (using the same image as placeholder)
  const productImages = Array(4).fill(product.image); 
  
  return (
    <div className='productDisplay'>
      <div className='productDisplay-left'>
        {/* Product image gallery */}
        <div className='product-gallery'>
          {productImages.map((img, index) => (
            <img 
              key={index} 
              src={img} 
              alt={`Product view ${index + 1}`}
              className='thumbnail'
            />
          ))}
        </div>
        {/* Main product image */}
        <div className='productDisplay-mainImage'>
          <img 
            className='main-image' 
            src={product.image} 
            alt={product.name} 
          />
        </div>
      </div>
      
      <div className='productDisplay-right'>
        {/* Product details */}
        <h1>{product.name}</h1>
        
        {/* Star rating */}
        <div className='star-rating'>
          {[...Array(5)].map((_, i) => (
            <img 
              key={i} 
              src={starIcon} 
              alt='star rating' 
              className='star-icon'
            />
          ))}
          <span>({product.rating || 'No reviews'})</span>
        </div>
        
        {/* Price and description */}
        <div className='product-price'>${product.price.toFixed(2)}</div>
        <div className='product-description'>{product.description}</div>
        
        {/* Add to cart button */}
        <button 
          className='add-to-cart-btn'
          onClick={() => console.log('Added to cart:', product.id)}
          aria-label={`Add ${product.name} to cart`}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDisplay;