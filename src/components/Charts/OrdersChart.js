import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from 'recharts';

const OrdersChart = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'orders'));

        const data = snapshot.docs.map(doc => {
          const order = doc.data();
          return {
            date: order.createdAt?.toDate().toLocaleDateString() || 'N/A',
            totalAmount: order.totalAmount || 0
          };
        });

        // Group by date and sum totalAmount
        const grouped = {};

        data.forEach(order => {
          if (!grouped[order.date]) {
            grouped[order.date] = 0;
          }
          grouped[order.date] += order.totalAmount;
        });

        const formattedData = Object.entries(grouped).map(([date, total]) => ({
          date,
          total
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ width: '100%', minHeight: 400, padding: '20px' }}>
      <h3 style={{ textAlign: 'center' }}>Total Orders by Date</h3>
      {loading ? (
        <p>Loading order data...</p>
      ) : chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersChart;
