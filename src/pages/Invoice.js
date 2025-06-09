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

  // Prepare invoice items from cart
  const invoiceItems = products
    .filter(product => cartItem[product.id] > 0)
    .map(product => ({
      name: product.name,
      quantity: cartItem[product.id],
      price: product.price
    }));

  // Calculate total
  const totalAmount = invoiceItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Assemble invoice data
  const invoiceData = {
    nameOnCard,
    date: new Date().toLocaleString(),
    items: invoiceItems,
    totalAmount
  };

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <div className="header">
          <h1>🧾 PRELOVED INVOICE</h1>
          <p><strong>Date:</strong> {invoiceData.date}</p>
        </div>

        <div className="info">
          <p><strong>Name on Card:</strong> {invoiceData.nameOnCard}</p>
        </div>

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
            {invoiceData.items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <h2>Total: ${invoiceData.totalAmount.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
