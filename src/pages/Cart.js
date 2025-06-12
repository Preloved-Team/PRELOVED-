import React, { useContext } from 'react';
import './Cart.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, products, removeFromCart, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const totalAmount = products.reduce((acc, product) => {
    const quantity = cartItems[product.id] || 0;
    return acc + product.price * quantity;
  }, 0);

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {totalAmount > 0 ? (
        <>
          <div className="cart-items">
            {products.map((product) => {
              const quantity = cartItems[product.id] || 0;
              if (quantity === 0) return null;

              return (
                <div className="cart-item" key={product.id}>
                  <img src={product.image} alt={product.name} />
                  <div className="item-details">
                    <h4>{product.name}</h4>
                    <p>${product.price} x {quantity}</p>
                    <button onClick={() => removeFromCart(product.id)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <h3>Total: ${totalAmount.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
            <button className="clear" onClick={clearCart}>Clear Cart</button>
          </div>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty 🛒</p>
      )}
    </div>
  );
};

export default Cart;
