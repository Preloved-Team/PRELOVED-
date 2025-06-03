import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [success, setSuccess] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();

    if (cardNumber && expiryDate && cvv && nameOnCard) {
      console.log('Processing payment...');
      setSuccess(true);
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
