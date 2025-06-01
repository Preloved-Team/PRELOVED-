import React, { useContext } from 'react';
import { ShopContext } from '../components/Context/ShopContext';

const Orders = () => {
  const { orderHistory } = useContext(ShopContext); // assume orderHistory from context

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orderHistory.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orderHistory.map((order, idx) => (
            <li key={idx} className="border p-4 rounded shadow">
              <p><strong>Date:</strong> {order.date}</p>
              <p><strong>Items:</strong> {order.items.map(i => i.name).join(', ')}</p>
              <p><strong>Total:</strong> ${order.total}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
