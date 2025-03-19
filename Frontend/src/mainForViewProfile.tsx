import React from 'react';
import ReactDOM from 'react-dom/client';
import UserInfo from './viewProfile.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('r4') as HTMLElement).render(
    <React.StrictMode>
        <UserInfo/>
    </React.StrictMode>
);