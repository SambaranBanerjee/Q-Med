import NavBar from './Navbar';
import Question from './Questions';
import React, { useState, useEffect } from 'react';

export default function QuestionsPage() {
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);
  const [otherUsersQuestions, setOtherUsersQuestions] = useState<string[]>([]);

  //This will eventually contain the questions provided by other users
  useEffect(() => {
    const fetchOtherUsersQuestions = async () => {
      //We will make an API request to fetch the questions
      const mockQuestions = [
        "What is Malaria?",
        "How does penicillium work?",
        "Can you explain what is ECG?",
        "What are some fungal diseases?",
        "","","","","","","","","","","","","",
      ];
      setOtherUsersQuestions(mockQuestions);
    };

    fetchOtherUsersQuestions();
  }, []);

  const handleQuestionSubmit = (question: string) => {
    setSubmittedQuestions([...submittedQuestions, question]);
    console.log('Question sent to server:', question);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-400 to-orange-300">
      <NavBar />
      <div className="flex-grow flex p-6 space-x-6">
        <div className="w-1/3 flex flex-col space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Question onQuestionSubmit={handleQuestionSubmit} />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Your Submitted Questions</h2>
            {submittedQuestions.length > 0 ? (
              <ul className="space-y-3">
                {submittedQuestions.map((q, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700">{q}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No questions submitted yet.</p>
            )}
          </div>
        </div>

        <div className="w-2/3 bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Questions from Others</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {otherUsersQuestions.length > 0 ? (
              <ul className="space-y-3">
                {otherUsersQuestions.map((q, index) => (
                  <li key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-gray-700">{q}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No questions from other users yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}