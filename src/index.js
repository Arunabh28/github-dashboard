import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { initializeDB } from './idb';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await initializeDB();
    navigator.serviceWorker.register('/serviceWorker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
  });
}
