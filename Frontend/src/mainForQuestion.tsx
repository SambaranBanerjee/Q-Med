import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '../Entry.css';
import QuestionsPage from './AskQuestions';

ReactDOM.createRoot(document.getElementById('r5') as HTMLElement).render(
    <React.StrictMode>
        <QuestionsPage/>
    </React.StrictMode>
);