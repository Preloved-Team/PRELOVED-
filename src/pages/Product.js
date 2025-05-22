<<<<<<< HEAD
const products = [
  {
    id: 1,
    name: "Men's Jacket",
    category: "men",
    price: 120,
    image: "/images/men-jacket.jpg",
  },
  {
    id: 2,
    name: "Women's Dress",
    category: "women",
    price: 80,
    image: "/images/women-dress.jpg",
  },
  {
    id: 3,
    name: "Kids' T-shirt",
    category: "kids",
    price: 25,
    image: "/images/kids-shirt.jpg",
  },
  {
    id: 4,
    name: "Men's Shoes",
    category: "men",
    price: 90,
    image: "/images/men-shoes.jpg",
  },
  {
    id: 5,
    name: "Women's Handbag",
    category: "women",
    price: 150,
    image: "/images/women-bag.jpg",
  },
  {
    id: 6,
    name: "Kids' Toy Car",
    category: "kids",
    price: 40,
    image: "/images/kids-toy.jpg",
  },
];

export default products;
=======
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
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
