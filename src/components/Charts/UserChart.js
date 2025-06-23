import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#FF8042', '#FFBB28', '#00C49F', '#0088FE'];

const UserChart = () => {
  const [roleData, setRoleData] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'users'));
        const users = snapshot.docs.map(doc => doc.data());

        const roleCount = {};
        users.forEach(user => {
          const role = user.role || 'unknown';
          roleCount[role] = (roleCount[role] || 0) + 1;
        });

        const chartData = Object.entries(roleCount).map(([role, count]) => ({
          name: role,    // ✅ for Recharts PieChart
          value: count   // ✅ for Recharts PieChart
        }));

        setRoleData(chartData);
      } catch (error) {
        console.error('Error fetching user roles:', error);
      }
    };

    fetchRoles();
  }, []);

  return (
    <div style={{
      width: '100%',
      minHeight: 400,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      marginTop: '40px'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>User Role Distribution</h3>
      {roleData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              data={roleData}
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, value }) => `${name}: ${value}`}
              isAnimationActive
            >
              {roleData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading user roles...</p>
      )}
    </div>
  );
};

export default UserChart;
