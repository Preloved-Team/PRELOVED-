import React, { createContext } from "react";
import Products from '../Assets/Products.json'

export const ShopContext = createContext(null);
const ShopContextProvider = (props) => {
    const contentValue = { Products };
    return (
        <ShopContext.Provider value={contentValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;