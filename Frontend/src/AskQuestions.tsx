import NavBar from './Navbar';
import Question from './Questions';
import { useState, useEffect } from 'react';

interface Question {
  _id: string;  // Only use _id
  question: string;
  createdAt: Date;
  isAnswered: boolean;
  answers: string[];
  upvote: number;
  downvote: number;
}

export default function QuestionsPage() {
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);
  const [otherUsersQuestions, setOtherUsersQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [votingInProgress, setVotingInProgress] = useState<string>('');

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
      if (!question || question.trim().length === 0) {
        throw new Error('Question cannot be empty');
      }

      console.log('Submitting question:', { question: question.trim() });

      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'omit',
        body: JSON.stringify({ 
          question: question.trim(),
         }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server error details:', errorData);
        throw new Error(
          `Server Error: ${errorData.message}\nDetails: ${errorData.error || 'No additional details'}`
        );
      }

      const data = await response.json();
      console.log('Received data from server:', data);

      if (!data.question) {
        console.error('Invalid data received:', data);
        throw new Error('Invalid question data received from server');
      }

      setOtherUsersQuestions((prev) => [...prev, data]);
      setSubmittedQuestions((prev) => [...prev, question]);
    } catch (err) {
      console.error('Detailed submission error:', err);
      throw new Error(err instanceof Error ? err.message : 'An unknown error occurred');
    }
    
  };

  const handleUpvote = async (_id: string) => {
    if (!_id) {
      throw new Error('Question ID is required');
    }
    
    setVotingInProgress(_id);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${_id}/vote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'upvote' }),
        credentials: 'omit',
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
      
      const updatedQuestion = await response.json();
      console.log('Updated question:', updatedQuestion);
      
      setOtherUsersQuestions((prev) =>
        prev.map((q) => 
          q._id === _id ? { 
            ...q, 
            ...updatedQuestion,
            _id: updatedQuestion._id
          } : q
        )
      );
    } catch (err) {
      console.error('Error in upvoting question', err);
      alert(`Failed to update vote: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    } finally {
      setVotingInProgress('');
    }
  }
  
  const handleDownvote = async (_id: string) => {
    if (!_id) {
      throw new Error('Question ID is required');
    }
    
    setVotingInProgress(_id);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${_id}/vote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'downvote' }),
        credentials: 'omit',
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        console.error('Server response:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
  
      const updatedQuestion = await response.json();
      console.log('Updated question:', updatedQuestion);
      
      setOtherUsersQuestions((prev) =>
        prev.map((q) => 
          q._id === _id ? { 
            ...q, 
            ...updatedQuestion,
            _id: updatedQuestion._id
          } : q
        )
      );
    } catch (err) {
      console.error('Error in downvoting question', err);
      alert(`Failed to update vote: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    } finally {
      setVotingInProgress('');
    }
  }

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
          <h2 className="text-xl font-bold text-gray-800">Questions</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
            {otherUsersQuestions.length > 0 ? (
              <ul className="space-y-4">
                {otherUsersQuestions.map((q, index) => (
                  <li key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-700 font-medium">{q.question}</p>
                      <span className="text-sm text-gray-500">
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        q.isAnswered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {q.isAnswered ? 'Answered' : 'Pending'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleUpvote(q._id)}
                          disabled={votingInProgress === q._id}
                          className={`text-green-600 ${votingInProgress === q._id ? 'opacity-50' : 'hover:text-green-800'}`}
                        >
                          ↑ {q.upvote}
                        </button>
                        <button 
                          onClick={() => handleDownvote(q._id)}
                          disabled={votingInProgress === q._id}
                          className={`text-red-600 ${votingInProgress === q._id ? 'opacity-50' : 'hover:text-red-800'}`}
                        >
                          ↓ {q.downvote}
                        </button>
                      </div>
                    </div>
                    {q.answers.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700">Answers:</p>
                        <ul className="mt-1 space-y-1">
                          {q.answers.map((answer, idx) => (
                            <li key={idx} className="text-sm text-gray-600 pl-3 border-l-2 border-gray-300">
                              {answer}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No questions from users yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}