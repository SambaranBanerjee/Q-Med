import NavBar from './Navbar';
import Question from './Questions';
import React, { useState } from 'react';

export default function QuestionsPage() {
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);

  const handleQuestionSubmit = (question: string) => {
    setSubmittedQuestions([...submittedQuestions, question]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-400 to-orange-300">
      <NavBar />
      <div className="flex-grow flex flex-col items-center justify-start p-4 space-y-8">
        <Question onQuestionSubmit={handleQuestionSubmit} />
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Submitted Questions</h2>
          {submittedQuestions.length > 0 ? (
            <ul className="space-y-4">
              {submittedQuestions.map((q, index) => (
                <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-700">{q}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No questions submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}