import React, { useContext } from 'react'
import { ShopContext } from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';

const Product = () => {
const {Products}=useContext(ShopContext);
const {productID}=useParams();
const product =Products.find((e)=> e.id === Number(productID))
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Product
