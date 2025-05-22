<<<<<<< HEAD
import React from 'react'

const Cart = () => {
  return (
    <div>
      
    </div>
  )
}

export default Cart
=======
import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    Products,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    clearCart
  } = useContext(ShopContext);

  const totalAmount = getTotalCartAmount();

  const cartProductList = Products.filter(product => cartItems[product.id] > 0);

  if (cartProductList.length === 0) {
    return (
      <div className="cart-container empty">
        <h2>Your cart is empty</h2>
        <Link to="/buyerDashboard">
          <button className="continue-shopping-btn">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      <div className="cart-items">
        {cartProductList.map(product => (
          <div key={product.id} className="cart-item">
            <img src={product.image} alt={product.name} />
            <div className="cart-details">
              <h3>{product.name}</h3>
              <p>Price: ${product.price.toFixed(2)}</p>
              <div className="quantity-controls">
                <button onClick={() => removeFromCart(product.id)}>-</button>
                <span>{cartItems[product.id]}</span>
                <button onClick={() => addToCart(product.id)}>+</button>
              </div>
              <p>Total: ${(product.price * cartItems[product.id]).toFixed(2)}</p>
            </div>
            <button className="remove-btn" onClick={() => removeFromCart(product.id, true)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h3>Cart Summary</h3>
        <p>Subtotal: ${totalAmount.toFixed(2)}</p>
        <p>Shipping: $0.00</p>
        <h4>Total: ${totalAmount.toFixed(2)}</h4>

        <button className="checkout-btn">Proceed to Checkout</button>
        <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)
