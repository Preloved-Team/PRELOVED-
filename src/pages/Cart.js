import React, { useContext, useState } from 'react';
import './Cart.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, products, removeFromCart, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const totalAmount = products.reduce((acc, product) => {
    const quantity = cartItems[product.id] || 0;
    return acc + product.price * quantity;
  }, 0);

  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 500); // simulate loading
  };

  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
    }
  };

  return (
    <div className="cart-container">
      <h2>🛍️ Your Shopping Cart</h2>

      {totalAmount > 0 ? (
        <>
          <div className="cart-items">
            {products.map((product) => {
              const quantity = cartItems[product.id] || 0;
              if (quantity === 0) return null;

              return (
                <div className="cart-item" key={product.id}>
                  <img
                    src={product.image || '/fallback-image.png'}
                    alt={product.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h4>{product.name}</h4>
                    <p>
                      {formatCurrency(product.price)} x {quantity} ={" "}
                      <strong>{formatCurrency(product.price * quantity)}</strong>
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name} from cart`}
                    >
                      ❌ Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-summary">
            <h3>Total: {formatCurrency(totalAmount)}</h3>
            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={loading}
              aria-label="Proceed to checkout"
            >
              {loading ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            <button className="clear-btn" onClick={handleClearCart}>
              🧹 Clear Cart
            </button>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <p>Your cart is empty 🛒</p>
          <button onClick={() => navigate('/shop')}>Browse Products</button>
        </div>
      )}
    </div>
  );
};

export default Cart;
