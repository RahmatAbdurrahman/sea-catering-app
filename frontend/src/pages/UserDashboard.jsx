import React, { useState, useEffect } from 'react';

const UserDashboard = () => {
  const [subscriptions, setSubscriptions] = useState([]);

  // useEffect untuk fetch data langganan pengguna saat komponen dimuat
  useEffect(() => {
    const fetchSubscriptions = async () => {
      // Logika fetch ke GET /api/dashboard/user
      // const res = await fetch(..., { headers: {'x-auth-token': token} });
      // const data = await res.json();
      // setSubscriptions(data);
      console.log("Fetching user subscriptions...");
    };
    fetchSubscriptions();
  }, []);

  const handlePause = (id) => alert(`Pausing subscription ${id}`);
  const handleCancel = (id) => alert(`Cancelling subscription ${id}`);

  return (
    <div className="container">
      <h1>My Subscriptions</h1>
      {/* Tampilkan daftar langganan di sini */}
      <div className="subscription-list">
        {/* Contoh item langganan */}
        <div className="subscription-item" style={{ border: '1px solid #ccc', padding: '1rem', margin: '1rem 0' }}>
          <h3>Protein Plan</h3>
          <p>Status: active</p>
          <p>Total Price: Rp 1.720.000,00</p>
          <button onClick={() => handlePause(1)} className="btn outline-menu">Pause</button>
          <button onClick={() => handleCancel(1)} className="btn order-now" style={{ marginLeft: '1rem' }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;