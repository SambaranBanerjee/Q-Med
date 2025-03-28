// mainForSearchPage.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import SearchPage from "./SearchPage";
import './index.css';

const rootElement = document.getElementById('r6');
if (!rootElement) throw new Error("Root element 'r6' not found");
const root = ReactDOM.createRoot(rootElement);

console.log("Mounting React application"); // Add this

root.render(
  <React.StrictMode>
    <SearchPage />
  </React.StrictMode>
);