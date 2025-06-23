import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import './ProfitChart.css';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const ProfitChart = () => {
  const [earningsData, setEarningsData] = useState([]);

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders'));
        const earnings = [];
        let count = 1;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          earnings.push({
            title: `Order ${count++}`,
            commission: data.adminCommission || 0,
          });
        });

        setEarningsData(earnings);
      } catch (error) {
        console.error('Error fetching earnings data:', error);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div>
      <h3>Earnings per Order</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={earningsData} margin={{ top: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="title"
            angle={-90}
            textAnchor="end"
            interval={0}
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="commission" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;
