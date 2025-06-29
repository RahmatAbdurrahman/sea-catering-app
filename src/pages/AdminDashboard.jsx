import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: '2025-06-01',
    endDate: '2025-06-30'
  });

  const fetchMetrics = async () => {
    // Logika fetch ke GET /api/dashboard/admin?startDate=...&endDate=...
    console.log("Fetching admin metrics for", dateRange);
  };
  
  useEffect(() => {
    fetchMetrics();
  }, [dateRange]);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      {/* Date Range Selector */}
      <div>
        <label>Start Date: </label>
        <input type="date" value={dateRange.startDate} onChange={e => setDateRange(prev => ({...prev, startDate: e.target.value}))}/>
        <label style={{ marginLeft: '1rem' }}>End Date: </label>
        <input type="date" value={dateRange.endDate} onChange={e => setDateRange(prev => ({...prev, endDate: e.target.value}))}/>
      </div>

      {/* Tampilan Metrik */}
      <div className="metrics-grid" style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div className="metric-card">
          <h2>New Subscriptions</h2>
          <p>150</p>
        </div>
        <div className="metric-card">
          <h2>Monthly Recurring Revenue (MRR)</h2>
          <p>Rp 50.000.000</p>
        </div>
        <div className="metric-card">
          <h2>Total Active Subscriptions</h2>
          <p>1,200</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;