import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Force browser tab icon to immediately match header logo without browser cache delays
const FAVICON_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'%3E%3Crect width='32' height='32' rx='8' fill='%2318181B'/%3E%3Cpath d='M8.5 8.5v15' stroke='%23FFFFFF' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M8.5 8.5h8' stroke='%23FFFFFF' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M8.5 15h5.5' stroke='%23FFFFFF' stroke-width='2.2' stroke-linecap='round'/%3E%3Cpath d='M17.5 13l3.5 10.5 4-10.5' stroke='%23447244' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E`;

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

