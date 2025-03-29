import NavBar from './Navbar';
import Question from './Questions';
import { useState, useEffect } from 'react';

interface Question {
  q_Id: string;
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
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (!data.q_Id || !data.question){
        throw new Error('Invalid question data received from server');
      }

      setOtherUsersQuestions((prev) => [...prev, data]);
      setSubmittedQuestions((prev) => [...prev, question]);
      //alert('Question submitted successfully');
    } catch (err) {
      console.error('Error in submitting question', err);
      throw new Error(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleUpvote = async (q_Id: string) => {
    setVotingInProgress(q_Id);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${q_Id}/vote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'upvote' }),
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const updatedQuestion = await response.json();
      
      setOtherUsersQuestions((prev) =>
        prev.map((q) => 
          q.q_Id === q_Id ? { 
            ...q, 
            upvote: updatedQuestion.upvote,
            downvote: updatedQuestion.downvote,
            answers: updatedQuestion.answers,
            isAnswered: updatedQuestion.isAnswered,
            createdAt: updatedQuestion.createdAt,
            q_Id: updatedQuestion.q_Id
           } : q
        )
      );
    } catch (err) {
      console.error('Error in upvoting question', err);
      throw new Error(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setVotingInProgress('');
    }
  }

  const handleDownvote = async (q_Id: string) => {
    setVotingInProgress(q_Id);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${q_Id}/vote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'downvote' }),
        credentials: 'omit',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedQuestion = await response.json();
      
      setOtherUsersQuestions((prev) =>
        prev.map((q) => 
          q.q_Id === q_Id ? { 
            ...q, 
            upvote: updatedQuestion.upvote,
            downvote: updatedQuestion.downvote
           } : q
        )
      );
    } catch (err) {
      console.error('Error in downvoting question', err);
      throw new Error(err instanceof Error ? err.message : 'An unknown error occurred');
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
                          onClick={() => handleUpvote(q.q_Id)}
                          disabled={votingInProgress === q.q_Id}
                          className={`text-green-600 ${votingInProgress === q.q_Id ? 'opacity-50' : 'hover:text-green-800'}`}
                        >
                          ↑ {q.upvote}
                        </button>
                        <button 
                          onClick={() => handleDownvote(q.q_Id)}
                          disabled={votingInProgress === q.q_Id}
                          className={`text-red-600 ${votingInProgress === q.q_Id ? 'opacity-50' : 'hover:text-red-800'}`}
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