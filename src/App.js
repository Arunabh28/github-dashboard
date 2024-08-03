import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Settings from './components/Settings';
import Token from './components/Token';
import GitHubRepoList from './components/GitHubRepoList';
import Schedule from './components/Schedule';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<Settings />}>
          <Route path="token" element={<Token />} />
          <Route path="repo-list" element={<GitHubRepoList />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
