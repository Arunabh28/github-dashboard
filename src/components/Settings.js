import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Settings() {
  return (
    <div>
      <h1>Settings</h1>
      <nav>
        <Link to="token">Token</Link>
        <Link to="repo-list">GitHub Repo List</Link>
        <Link to="schedule">Schedule</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default Settings;
