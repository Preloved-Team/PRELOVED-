import React from 'react'
import './Breadcrum.css';

const Breadcrum = (props) => {
  const { product } = props;
  
  if (!product) return null;

  return (
    <div className='breadcrum'>
      {product.category} &gt; {product.name}
    </div>
  )
}

export default Breadcrum