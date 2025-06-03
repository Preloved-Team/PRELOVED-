<<<<<<< HEAD
import React, { createContext, useState, useEffect } from "react";
import { db } from '../../Firebase';
import { collection, getDocs } from "firebase/firestore";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "products"));
                const productsData = [];
                
                querySnapshot.forEach((doc) => {
                    productsData.push({ id: doc.id, ...doc.data() });
                });

                setProducts(productsData);
                
                const initialCart = {};
                productsData.forEach(product => {
                    initialCart[product.id] = 0;
                });
                setCartItem(initialCart);
                
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products: ", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (itemID) => {
        setCartItem((prev) => ({ ...prev, [itemID]: (prev[itemID] || 0) + 1 }));
    };
    
    const removeFromCart = (itemID) => {
        setCartItem((prev) => ({ ...prev, [itemID]: Math.max((prev[itemID] || 0) - 1, 0) }));
    };
    
    const contextValue = { products, cartItem, addToCart, removeFromCart, loading };
    
    return (
        <ShopContext.Provider value={contextValue}>
            {!loading && props.children}
=======
import React, { createContext } from "react";
import Products from '../Assets/Products.json'

export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
    const contentValue = { Products };
    const getDefaultCart = ()=>{
        let cart = null
        for(let i=0; i<Products.length; i++){
            cart[i]=0;
        }
        return cart;
    }
    return (
        <ShopContext.Provider value={contentValue}>
            {props.children}
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;