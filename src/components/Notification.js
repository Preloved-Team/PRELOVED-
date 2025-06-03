import React from 'react';

const Notification = ({ message }) => {
  return (
    <div style={{
      backgroundColor: '#fef3c7',
      color: '#92400e',
      padding: '10px',
      margin: '10px 0',
      border: '1px solid #fcd34d',
      borderRadius: '8px'
    }}>
      🔔 {message}
    </div>
  );
};

export default Notification;
