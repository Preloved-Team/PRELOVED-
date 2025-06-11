import React from 'react';
import CartItems from '../components/cartItems/CartItems';
import Footer from '../components/footer/Footer';
import Top from '../components/AdminBodySection/TopSection/Top';

const Cart = () => {
  return (
    <div>
      <Top/>
      <CartItems/>
      <Footer/>
    </div>
  );
};

export default Cart;