import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Force browser tab icon to immediately match header logo without browser cache delays
const FAVICON_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' rx='8' fill='%2318181B'/%3E%3Cpath d='M10 8v16' stroke='%23FFFFFF' stroke-width='2.5' stroke-linecap='round'/%3E%3Cpath d='M10 8h7.5a4 4 0 0 1 4 4v0a4 4 0 0 1-4 4H10' stroke='%23FFFFFF' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M10 16.5h6' stroke='%23447244' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E`;

try {
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/svg+xml';
  link.href = FAVICON_SVG;
} catch (_) {}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

