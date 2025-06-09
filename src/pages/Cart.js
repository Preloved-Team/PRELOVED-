import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
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

  return (
    <div className="cart-page">
      <Top />
      <div className="cart-container">
        <h2>Shopping Cart</h2>

        {cartProducts.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is currently empty.</p>
            <Link to="/BuyerDashboard">
              <button className="classic-btn">Continue Shopping</button>
            </Link>
          </div>
        ) : (
          <div className="cart-classic-layout">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map(product => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-info">
                        <img src={product.image} alt={product.name} />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>
                      <div className="qty-buttons">
                        <button onClick={() => removeFromCart(product.id)}>-</button>
                        <span>{cartItem[product.id]}</span>
                        <button onClick={() => addToCart(product.id)}>+</button>
                      </div>
                    </td>
                    <td>${product.price.toFixed(2)}</td>
                    <td>${(product.price * cartItem[product.id]).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="classic-summary">
              <h3>Order Summary</h3>
              <p>Subtotal: ${totalAmount.toFixed(2)}</p>
              <p>Shipping: Free</p>
              <h4>Total: ${totalAmount.toFixed(2)}</h4>
              <button
                className="classic-btn"
                onClick={() => navigate('/payment')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
