import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ShopContext } from './components/Context/ShopContext';
import ShopContextProvider from './components/Context/ShopContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
    <ShopContextProvider>
      <App />
    </ShopContextProvider>

);

