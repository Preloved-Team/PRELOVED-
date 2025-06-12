import React, { useContext, useState } from 'react';
import './Cart.css';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, products, removeFromCart, clearCart } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const totalAmount = products.reduce((acc, product) => {
    const quantity = cartItems[product.id] || 0;
    return acc + product.price * quantity;
  }, 0);

  const handleCheckout = () => {
    setLoading(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 800);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  return (
    <div className="cart-page">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {totalAmount > 0 ? (
        <>
          <section className="cart-grid">
            <AnimatePresence>
              {products.map((product) => {
                const quantity = cartItems[product.id] || 0;
                if (quantity === 0) return null;

                return (
                  <motion.article
                    className="cart-card"
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                  >
                    <img
                      src={product.image || '/fallback-image.png'}
                      alt={product.name}
                      className="cart-img"
                    />
                    <div className="cart-info">
                      <h4>{product.name}</h4>
                      <p>
                        {formatter.format(product.price)} x {quantity}
                      </p>
                      <strong>
                        {formatter.format(product.price * quantity)}
                      </strong>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(product.id)}
                        aria-label={`Remove ${product.name} from cart`}
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </section>

          <footer className="cart-footer">
            <h3>Total: {formatter.format(totalAmount)}</h3>
            <div className="cart-actions">
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button className="clear-btn" onClick={handleClearCart}>
                🧹 Clear Cart
              </button>
            </div>
          </footer>
        </>
      ) : (
        <div className="empty-state">
          <img
            src="/empty-cart.svg"
            alt="Empty cart"
            className="empty-img"
          />
          <p>Your cart is empty.</p>
          <button onClick={() => navigate('/shop')} className="browse-btn">
            🛍️ Browse Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
