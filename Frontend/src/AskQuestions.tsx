import NavBar from './Navbar';
import Question from './Questions';
import { useState, useEffect } from 'react';

export default function QuestionsPage() {
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);
  const [otherUsersQuestions, setOtherUsersQuestions] = useState<{ question: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // Fetch questions from the backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOtherUsersQuestions(data);
      } catch (err) {
        console.error('Error in fetching questions', err);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchQuestions();
  }, []);

  const handleQuestionSubmit = async (question: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setOtherUsersQuestions((prev) => [...prev, data]);
      setSubmittedQuestions((prev) => [...prev, question]);
      //alert('Question submitted successfully');
    } catch (err) {
      console.error('Error in submitting question', err);
      throw err;
    }
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

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
                    <p className="text-gray-700">{q.question}</p>
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