import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import CartItems from '../components/cartItems/CartItems';
import Footer from '../components/footer/Footer';
import Top from '../components/AdminBodySection/TopSection/Top';
import './Cart.css';

const Cart = () => {
  const { cartItem, Products, removeFromCart, addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const cartProducts = Products.filter(product => cartItem[product.id] > 0);
  const totalAmount = cartProducts.reduce(
    (total, product) => total + product.price * cartItem[product.id],
    0
  );

  const handleCheckout = () => {
    navigate('/payment'); // Navigate to payment page
  };

  return (
    <div className="cart-page">
      <Top />

      {cartProducts.length === 0 ? (
        <section className="cart-container empty">
          <h2>Your cart is empty 😕</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/BuyerDashboard">
            <button className="continue-shopping-btn">🛍️ Continue Shopping</button>
          </Link>
        </section>
      ) : (
        <section className="cart-container">
          <h2>Your Shopping Cart</h2>

          <div className="cart-items">
            {cartProducts.map(product => (
              <div key={product.id} className="cart-item">
                <img src={product.image} alt={product.name} />
                <div className="cart-details">
                  <h3>{product.name}</h3>
                  <p>Price: ${product.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => removeFromCart(product.id)}>-</button>
                    <span>{cartItem[product.id]}</span>
                    <button onClick={() => addToCart(product.id)}>+</button>
                  </div>
                  <p>Total: ${(product.price * cartItem[product.id]).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>🧾 Cart Summary</h3>
            <p>Subtotal: ${totalAmount.toFixed(2)}</p>
            <p>Shipping: $0.00</p>
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
            <button className="checkout-btn" onClick={handleCheckout}>
              ✅ Proceed to Checkout
            </button>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
