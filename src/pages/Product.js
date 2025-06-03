<<<<<<< HEAD
import React, { useContext, useState, useEffect } from 'react'
=======
import React, { useContext } from 'react'
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
import { ShopContext } from '../components/Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrum from '../components/Breadcrum/Breadcrum';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
<<<<<<< HEAD
import { doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase';

const Product = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", productID);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log("No such product!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productID]);

  if (loading) {
    return <div>Loading product...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

=======

const Product = () => {
const {Products}=useContext(ShopContext);
const {productID}=useParams();
const product =Products.find((e)=> e.id === Number(productID))
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  )
}

<<<<<<< HEAD
export default Product
=======
export default Product
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
