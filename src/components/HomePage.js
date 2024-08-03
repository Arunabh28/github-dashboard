import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <Link to="/settings">Settings</Link>
      </div>
      <div>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </div>
  );
}

export default HomePage;
