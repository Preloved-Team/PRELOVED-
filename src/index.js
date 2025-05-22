import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
<<<<<<< HEAD
=======
import { ShopContext } from './components/Context/ShopContext';
import ShopContextProvider from './components/Context/ShopContext';
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
<<<<<<< HEAD
    <App />
=======
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
>>>>>>> 3b7195c (The Work done in Week3 by Arsh.)

);

