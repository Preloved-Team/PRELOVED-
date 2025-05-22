import React from 'react'
import './ProductDisplay.css';

const ProductDisplay = (props) => {
    const{product}=props;
  return (
    <div className='productDisplay'>
      <div className='productDisplay-left'>
        <div className='product-image'>
            <img src={product.img} alt=''/>
            <img src={product.img} alt=''/>
            <img src={product.img} alt=''/>
            <img src={product.img} alt=''/>
        </div>
        <div className='productDisplay-image'>
            <img className='main-image' src={product.img} alt=''/>
        </div>
      </div>
      <div className='productDisplay-right'>
        <h1>{product.name}</h1>
        <div className='star-rating'>
            <img src='' alt=''/>
            <img src='' alt=''/>
            <img src='' alt=''/>
            <img src='' alt=''/>
            <img src='' alt=''/>
        </div>
        <div className='product-price'>${product.price}</div>
        <div className='product-description'>{product.description}</div>
        
      <button>ADD TO CART</button>
      </div>
    </div>
  )
}

export default ProductDisplay
