import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ShopContext } from './components/Context/ShopContext';
import ShopContextProvider from './components/Context/ShopContext';
import { NotificationProvider } from './components/Context/NotificationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ShopContextProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </ShopContextProvider>
);

