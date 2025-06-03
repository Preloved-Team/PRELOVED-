import React from 'react'
import './Breadcrum.css';

const Breadcrum = (props) => {
<<<<<<< HEAD
  const { product } = props;
  
  if (!product) return null;

  return (
    <div className='breadcrum'>
      {product.category} &gt; {product.name}
    </div>
  )
}

export default Breadcrum
=======
const {product} = props;
      return (
       <div className='breadcrum'>
         {product.category}{product.name}
       </div>
  )
}

export default Breadcrum
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
