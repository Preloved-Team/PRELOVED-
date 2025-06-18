import React, { useState, useContext } from 'react';
import './Payment.css';
import { collection, addDoc, Timestamp, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../Firebase';
import { getAuth } from 'firebase/auth';
import { ShopContext } from '../../components/Context/ShopContext';
import { useNavigate } from "react-router-dom";
import { writeNotifications } from "../../utils/writeNotifications"; 

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [success, setSuccess] = useState(false);

  const { cartItem, products } = useContext(ShopContext);
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!(cardNumber && expiryDate && cvv && nameOnCard)) {
      alert('Please fill in all fields');
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    let userEmail = 'Guest';
    let buyerId = null;

    if (user) {
      buyerId = user.uid; // ✅ fix
      const userRef = doc(db, 'users', buyerId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        userEmail = userSnap.data().email;
      }
    }

    const orderedItems = products
      .filter(product => cartItem[product.id] > 0)
      .map(product => ({
        id: product.id,
        title: product.name,
        price: product.price,
        quantity: cartItem[product.id],
        sellerId: product.sellerId,
      }));

    const totalAmount = orderedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const adminCommission = totalAmount * 0.10;

    const { sellerId, title } = orderedItems[0]; // assume first item for notification

    const orderData = {
      items: orderedItems,
      nameOnCard,
      createdAt: Timestamp.now(),
      totalAmount,
      adminCommission,
      userEmail,
      buyerId,
      sellerId,
      title,
    };

    try {
      const orderRef = await addDoc(collection(db, 'orders'), orderData);

      // ✅ Fan-out notifications
      await writeNotifications(orderRef.id, {
        buyerId,
        sellerId,
        title,
        totalAmount,
      });

      await addDoc(collection(db, 'adminEarnings'), {
        amount: adminCommission,
        createdAt: Timestamp.now(),
        userEmail,
      });

      setSuccess(true);
      console.log('Order and admin earning saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      {success ? (
        <div className="payment-success">
          <p style={{ color: "green" }}>Payment Successful!</p>
          <button onClick={() => navigate("/invoice")}>View Invoice</button>
        </div>
      ) : (
        <form className="payment-form" onSubmit={handlePayment}>
          <label>Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
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
