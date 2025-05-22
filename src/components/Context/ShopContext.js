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
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;