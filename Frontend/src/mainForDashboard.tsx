import React from 'react';
import ReactDOM from 'react-dom/client';
import EntryPage from './App2.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('r2') as HTMLElement).render(
    <React.StrictMode>
        <EntryPage/>
    </React.StrictMode>
);