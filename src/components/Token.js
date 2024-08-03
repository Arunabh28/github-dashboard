import React, { useState, useEffect } from 'react';
import { openDB } from 'idb';

const DB_NAME = 'github_dashboard';
const DB_VERSION = 1;

async function getToken() {
  const db = await openDB(DB_NAME, DB_VERSION);
  const token = await db.get('settings', 'token');
  return token || '';
}

async function saveToken(token) {
  const db = await openDB(DB_NAME, DB_VERSION);
  await db.put('settings', token, 'token');
}

function Token() {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await getToken();
      setToken(storedToken);
    }
    fetchToken();
  }, []);

  const handleSave = () => {
    saveToken(token);
  };

  return (
    <div>
      <h2>GitHub Personal Token</h2>
      <input 
        type="text" 
        value={token} 
        onChange={(e) => setToken(e.target.value)} 
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default Token;
