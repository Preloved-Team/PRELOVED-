import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import "./Invoice.css";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0].data();
        setInvoice(latestDoc);
      }
    };
    fetchLatestOrder();
  }, []);

  if (!invoice) return <div className="invoice-container">Loading invoice...</div>;

  return (
    <div className="invoice-container">
      <h1 className="invoice-title">🧾 Invoice</h1>

      <div className="invoice-header">
        <div>
          <p><strong>Name on Card:</strong> {invoice.nameOnCard}</p>
          <p><strong>Email:</strong> {invoice.userEmail}</p>
        </div>
        <div>
          <p><strong>Invoice Date:</strong> {invoice.createdAt.toDate().toLocaleString()}</p>
          <p><strong>Invoice ID:</strong> #{Math.floor(Math.random() * 1000000)}</p>
        </div>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td>{item.title || item.name}</td>
              <td>{item.quantity}</td>
              <td>${item.price}</td>
              <td>${item.quantity * item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="invoice-total">
        <p><strong>Total Amount:</strong> ${invoice.totalAmount}</p>
      </div>
    </div>
  );
};

export default Invoice;
