import React, { useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import './Cart.css';

// Utility to format currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

// Component to render individual cart item
const CartItem = ({ product, quantity, onRemove }) => {
  const total = product.price * quantity;

  return (
    <div className="cart-item" role="listitem">
      <img
        src={product.image}
        alt={product.name}
        className="cart-item-image"
        loading="lazy"
      />
      <div className="cart-item-info">
        <h4>{product.name}</h4>
        <p>
          {formatCurrency(product.price)} × {quantity}
        </p>
        <p className="cart-item-total">Total: {formatCurrency(total)}</p>
        <button
          onClick={() => onRemove(product.id)}
          className="btn btn-remove"
          aria-label={`Remove ${product.name} from cart`}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, products, removeFromCart, clearCart } = useContext(ShopContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const cartProductList = useMemo(
    () => products.filter((p) => cartItems[p.id]),
    [products, cartItems]
  );

  const totalAmount = useMemo(
    () =>
      cartProductList.reduce(
        (sum, p) => sum + p.price * (cartItems[p.id] || 0),
        0
      ),
    [cartProductList, cartItems]
  );

  const handleCheckout = () => {
    setIsLoading(true);
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
    <main className="cart-container" role="main" aria-labelledby="cart-title">
      <h2 id="cart-title" className="cart-heading">
        Shopping Cart 🛍️
      </h2>

      {totalAmount > 0 ? (
        <>
          <section className="cart-list" role="list">
            {cartProductList.map((product) => (
              <CartItem
                key={product.id}
                product={product}
                quantity={cartItems[product.id]}
                onRemove={removeFromCart}
              />
            ))}
          </section>

          <section className="cart-summary">
            <div className="summary-content">
              <h3>Total: {formatCurrency(totalAmount)}</h3>
              <div className="summary-buttons">
                <button
                  onClick={handleCheckout}
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                <button className="btn btn-danger" onClick={handleClearCart}>
                  Clear Cart
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="empty-cart">
          <img
            src="/images/empty-cart.svg"
            alt="Empty cart"
            className="empty-cart-image"
          />
          <p>Your cart is currently empty.</p>
          <button className="btn btn-outline" onClick={() => navigate('/shop')}>
            Go to Shop
          </button>
        </section>
      )}
    </main>
  );
};

export default Cart;
