import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

import { db } from '../../Firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ShopContext } from '../../components/Context/ShopContext';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { cartItem, products } = useContext(ShopContext);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (cardNumber && expiryDate && cvv && nameOnCard) {
      const selectedItems = products.filter(item => cartItem[item.id] > 0)
        .map(item => ({
          name: item.name,
          quantity: cartItem[item.id],
          price: item.price,
        }));

      const totalAmount = selectedItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      try {
        await addDoc(collection(db, "invoices"), {
          nameOnCard,
          items: selectedItems,
          totalAmount,
          createdAt: serverTimestamp(),
        });

        setSuccess(true);

        setTimeout(() => {
          navigate("/invoice", {
            state: {
              nameOnCard,
              items: selectedItems,
              totalAmount,
              date: new Date().toLocaleString(),
            },
          });
        }, 800);
      } catch (error) {
        console.error("Error saving invoice:", error);
        alert("Failed to save invoice. Please try again.");
      }
    } else {
      alert('Please fill in all fields');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      {success ? (
        <div className="success-message">Payment Successful!</div>
      ) : (
        <form className="payment-form" onSubmit={handlePayment}>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 90"
            required
          />

          <label>Expiry Date</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/YY"
            required
          />

          <label>CVV</label>
          <input
            type="password"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />

          <label>Name on Card</label>
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            placeholder="Shubham"
            required
          />

          <button type="submit">Pay Now</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
