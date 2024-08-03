import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import './Settings.css'; // Import CSS for styling

function Settings() {
  const location = useLocation();

  return (
    <div className="settings-container">
      <header className="settings-header">
        
        <nav className="settings-nav">
          <Link
            to="/"
            className={`settings-nav-link home-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link
            to="token"
            className={`settings-nav-link ${location.pathname.includes('token') ? 'active' : ''}`}
          >
            Token
          </Link>
          <Link
            to="repo-list"
            className={`settings-nav-link ${location.pathname.includes('repo-list') ? 'active' : ''}`}
          >
            GitHub Repo List
          </Link>
          <Link
            to="schedule"
            className={`settings-nav-link ${location.pathname.includes('schedule') ? 'active' : ''}`}
          >
            Schedule
          </Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default Settings;
