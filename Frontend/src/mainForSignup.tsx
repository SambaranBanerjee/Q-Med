import React from 'react';
import ReactDOM from 'react-dom/client';
import SignupComponent from './Signup';
import './index.css';

ReactDOM.createRoot(document.getElementById('r1') as HTMLElement).render(
    <React.StrictMode>
        <SignupComponent/>
    </React.StrictMode>
);