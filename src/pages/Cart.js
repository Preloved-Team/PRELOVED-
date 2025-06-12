import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, products, removeFromCart, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const currencyFormat = (value) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);

  const totalAmount = products.reduce((sum, item) => {
    const quantity = cartItems[item.id] || 0;
    return sum + item.price * quantity;
  }, 0);

  const handleCheckout = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      clearCart();
    }
  };

  return (
    <main className="cart-container">
      <header className="cart-header">
        <h2>Your Shopping Cart</h2>
      </header>

      {totalAmount > 0 ? (
        <>
          <section className="cart-items">
            {products.map((item) => {
              const quantity = cartItems[item.id];
              if (!quantity) return null;

              return (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p>
                      {currencyFormat(item.price)} × {quantity}
                    </p>
                    <strong>Total: {currencyFormat(item.price * quantity)}</strong>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </section>

          <footer className="cart-summary">
            <div className="summary-info">
              <h3>Total Amount: {currencyFormat(totalAmount)}</h3>
            </div>
            <div className="summary-actions">
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
              <button className="clear-btn" onClick={handleClear}>
                Clear Cart
              </button>
            </div>
          </footer>
        </>
      ) : (
        <section className="empty-cart">
          <img src="/empty-cart.svg" alt="Empty cart illustration" />
          <p>Your cart is currently empty.</p>
          <button onClick={() => navigate('/shop')} className="shop-now-btn">
            Browse Products
          </button>
        </section>
      )}
    </main>
  );
};

export default Cart;
