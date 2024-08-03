import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'github_dashboard';
const DB_VERSION = 1;

async function getDashboardData() {
  const db = await openDB(DB_NAME, DB_VERSION);
  return db.getAll('dashboard_data');
}

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const dashboardData = await getDashboardData();
      setData(dashboardData);
    }
    fetchData();
  }, []);

  const handleRefresh = () => {
    // Logic to trigger service worker to refresh data
    navigator.serviceWorker.controller.postMessage({ type: 'REFRESH_DATA' });
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleRefresh}>Refresh Data</button>
      <div>
        {/* Display GitHub data here */}
        {data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
