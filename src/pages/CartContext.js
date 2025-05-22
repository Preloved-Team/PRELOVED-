// Import necessary React hooks and functions
import React, { createContext, useContext, useState } from 'react';

// Create a new context for the cart
const CartContext = createContext();

// CartProvider component that will wrap our application or components that need cart access
export const CartProvider = ({ children }) => {
  // State to store the cart items, initialized as an empty array
  const [cart, setCart] = useState([]);

  /**
   * Function to add a product to the cart
   * @param {Object} product - The product to add to cart
   * @param {number} quantity - The quantity to add (defaults to 1)
   */
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      // Check if the product already exists in the cart
      const existingItem = prevCart.find(item => item.id === product.id);
      
      // If product exists, update its quantity
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // If product doesn't exist, add it to the cart with the specified quantity
      return [...prevCart, { ...product, quantity }];
    });
  };

  /**
   * Function to remove a product from the cart
   * @param {string} productId - The ID of the product to remove
   */
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  /**
   * Function to update the quantity of a product in the cart
   * @param {string} productId - The ID of the product to update
   * @param {number} newQuantity - The new quantity (must be at least 1)
   */
  const updateQuantity = (productId, newQuantity) => {
    // Prevent setting quantity to less than 1
    if (newQuantity < 1) return;
    
    // Update the quantity for the specified product
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate the total cost of all items in the cart
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Provide the cart state and functions to child components
  return (
    <CartContext.Provider 
      value={{ 
        cart,               // Current cart items
        addToCart,          // Function to add items
        removeFromCart,     // Function to remove items
        updateQuantity,     // Function to update quantities
        cartTotal          // Calculated total cost
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to easily access the cart context in any component
export const useCart = () => useContext(CartContext);