import React from 'react';
import ReactDOM from 'react-dom/client';
import EntryPage from './App2';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import '../Entry.css';

// Render EntryPage to the #r2 element in Entry.html
const r2Element = document.getElementById('r2');
if (r2Element) {
  const root = ReactDOM.createRoot(r2Element);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
        <BrowserRouter>
          <EntryPage />
        </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
} else {
  console.error('Could not find element with id "r2"');
}