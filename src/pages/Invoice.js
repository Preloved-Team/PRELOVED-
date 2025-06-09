// File: src/pages/Invoice.js

import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShopContext } from '../components/Context/ShopContext';
import './Invoice.css';

const Invoice = () => {
  const { products, cartItem } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { nameOnCard } = location.state || {};

  useEffect(() => {
    if (!nameOnCard) navigate('/');
  }, [nameOnCard, navigate]);

  const invoiceItems = products.filter(product => cartItem[product.id] > 0);

  const total = invoiceItems.reduce((sum, item) => sum + item.price * cartItem[item.id], 0);

  return (
    <div className="invoice-container">
      <h2>🧾 Invoice</h2>
      <p><strong>Name on Card:</strong> {nameOnCard}</p>
      <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{cartItem[item.id]}</td>
              <td>${item.price}</td>
              <td>${(item.price * cartItem[item.id]).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 className="invoice-total">Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default Invoice;
