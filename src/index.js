import React from 'react';
import ReactDOM from 'react-dom/client';
<<<<<<< HEAD
import App from './App';
import { ShopContext } from './components/Context/ShopContext';
import ShopContextProvider from './components/Context/ShopContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <ShopContextProvider>
      <App />
    </ShopContextProvider>

);

=======
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
>>>>>>> 68a673ce7b7fbd8eaa71e1f8244373c5a6d8edf5
