import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Make sure this path is correct
import CartContext from './components/Context/CartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartContext>
      <App />
    </CartContext>
  </React.StrictMode>
);