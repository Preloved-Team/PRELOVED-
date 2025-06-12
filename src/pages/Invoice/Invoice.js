import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Invoice.css";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { nameOnCard, items, totalAmount, date } = location.state || {};

  // Redirect if accessed without payment
  if (!nameOnCard || !items) {
    navigate("/");
    return null;
  }

  return (
    <div className="invoice-container">
      <div className="invoice-box">
        <div className="header">
          <h1>🧾 PRELOVED INVOICE</h1>
          <p><strong>Date:</strong> {date}</p>
        </div>

        <div className="info">
          <p><strong>Name on Card:</strong> {nameOnCard}</p>
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
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
