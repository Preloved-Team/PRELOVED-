<<<<<<< HEAD
import React, { createContext, useState } from "react";
import Products from '../Assets/Products.json';

const getDefaultCart = () => {
    let cart = {}; 
    Products.forEach(product => {
        cart[product.id] = 0; 
    });
    return cart;
};
=======
<<<<<<< HEAD
import React, { createContext } from "react";
import Products from '../Assets/Products.json'
>>>>>>> 305074c (updated files after fixing crash in cart.)

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState(getDefaultCart());
    
    const addToCart = (itemID) => {
        setCartItem((prev) => ({ ...prev, [itemID]: (prev[itemID] || 0) + 1 }));
    };
    
    const removeFromCart = (itemID) => {
        setCartItem((prev) => ({ ...prev, [itemID]: Math.max((prev[itemID] || 0) - 1, 0) }));
    };
    
    const contextValue = { Products, cartItem, addToCart, removeFromCart };
    
    return (
<<<<<<< HEAD
        <ShopContext.Provider value={contextValue}>
=======
        <ShopContext.Provider value={contentValue}>
=======
import React, { createContext, useState } from "react";
import Products from '../Assets/Products.json';

const getDefaultCart = () => {
    let cart = {}; 
    Products.forEach(product => {
        cart[product.id] = 0; 
    });
    return cart;
};

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const [cartItem, setCartItem] = useState(getDefaultCart());
    
    const addToCart = (itemID) => {
        setCartItem((prev) => ({ ...prev, [itemID]: (prev[itemID] || 0) + 1 }));
    };
    
    const removeFromCart = (itemID) => {
        setCartItem((prev) => ({ ...prev, [itemID]: Math.max((prev[itemID] || 0) - 1, 0) }));
    };
    
    const contextValue = { Products, cartItem, addToCart, removeFromCart };
    
    return (
        <ShopContext.Provider value={contextValue}>
>>>>>>> 9fe7257 (updated files after fixing crash in cart.)
>>>>>>> 305074c (updated files after fixing crash in cart.)
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;