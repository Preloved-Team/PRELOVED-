import React, { useEffect, useState } from "react";
import { db } from "../Firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const Invoice = () => {
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchLatestOrder = async () => {
      const q = query(
        collection(db, "orders"),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0].data();
        setInvoice(latestDoc);
      }
    };

    fetchLatestOrder();
  }, []);

  if (!invoice) return <div>Loading invoice...</div>;

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
      <h1>🧾 Invoice</h1>
      <p><strong>Name on Card:</strong> {invoice.nameOnCard}</p>
      <p><strong>Email:</strong> {invoice.userEmail}</p>
      <p><strong>Date:</strong> {new Date(invoice.createdAt).toLocaleString()}</p>

      <h2>Order Summary:</h2>
      <ul>
        {invoice.items.map((item, index) => (
          <li key={index}>
            {item.title} × {item.quantity} — ${item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ${invoice.totalAmount}</h3>
    </div>
  );
};

export default Invoice;
