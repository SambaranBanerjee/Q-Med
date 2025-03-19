import React from 'react';
import ReactDOM from 'react-dom/client';
import LoginComponent from './Login';
import './index.css';

ReactDOM.createRoot(document.getElementById('r2') as HTMLElement).render(
    <React.StrictMode>
        <LoginComponent/>
    </React.StrictMode>
);