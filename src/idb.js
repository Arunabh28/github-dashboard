import { openDB } from 'idb';

const DB_NAME = 'github_dashboard';
const DB_VERSION = 1;

async function initializeDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore('settings');
      db.createObjectStore('repos', { keyPath: 'id' });
      db.createObjectStore('schedules', { keyPath: 'id' });
      db.createObjectStore('dashboard_data', { keyPath: 'id' });
    },
  });
  return db;
}

export { initializeDB };
