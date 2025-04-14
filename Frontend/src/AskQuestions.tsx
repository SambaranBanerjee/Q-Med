//import NavBar from './Navbar';
import { useState, useEffect } from 'react';
import QuestionModal from './questionModal';
import { FaReply } from 'react-icons/fa';

// Add styles for hiding scrollbar
const scrollbarHideStyles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

interface Question {
  _id: string;
  author: string;
  question: string;
  createdAt: Date;
  isAnswered: boolean;
  answers: string[];
  upvote: number;
  downvote: number;
  imageUrl?: string;
}

export default function QuestionsPage() {
  const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);
  const [otherUsersQuestions, setOtherUsersQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [votingInProgress, setVotingInProgress] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setUserData] = useState({ Name: "", Age: "", Weight: "", Height: "" });

  useEffect(() => {
    const storedUserData = localStorage.getItem('profile');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const [questionsResponse, myQuestionsResponse] = await Promise.all([
          fetch('http://localhost:5000/api/questions'),
          fetch('http://localhost:5000/api/myQuestions')
        ]);

        if (!questionsResponse.ok || !myQuestionsResponse.ok) {
          throw new Error('Failed to fetch questions');
        }

        const [questionsData, myQuestionsData] = await Promise.all([
          questionsResponse.json(),
          myQuestionsResponse.json()
        ]);

        setOtherUsersQuestions(questionsData);
        setSubmittedQuestions(myQuestionsData.map((q: Question) => q.question));
      } catch (err) {
        console.error('Error in fetching questions', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllQuestions();
  }, []);

  const handleQuestionSubmit = async (question: string, author: string, image?: File) => {
    try {
      if (!question || question.trim().length === 0) {
        throw new Error('Question cannot be empty');
      }

      const formData = new FormData();
      formData.append('question', question.trim());
      formData.append('author', profile.Name);
      if (image) {
        formData.append('image', image);
      }

      const [response, myResponse] = await Promise.all([
        fetch('http://localhost:5000/api/questions', {
          method: 'POST',
          credentials: 'omit',
          body: formData,
        }),
        fetch('http://localhost:5000/api/myQuestions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'omit',
          body: JSON.stringify({ question: question.trim(), author: profile.Name }),
        })
      ]);

      if (!response.ok || !myResponse.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.message || 'Failed to submit question');
      }

      const data = await response.json();
      setOtherUsersQuestions((prev) => [...prev, data]);
      setSubmittedQuestions((prev) => [...prev, question]);
    } catch (err) {
      console.error('Detailed submission error:', err);
      throw new Error(err instanceof Error ? err.message : 'An unknown error occurred');
    }
  };

  const handleUpvote = async (_id: string) => {
    if (!_id) throw new Error('Question ID is required');
    
    setVotingInProgress(_id);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${_id}/vote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'upvote' }),
        credentials: 'omit',
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
      
      const updatedQuestion = await response.json();
      setOtherUsersQuestions((prev) =>
        prev.map((q) => q._id === _id ? { ...q, ...updatedQuestion } : q)
      );
    } catch (err) {
      console.error('Error in upvoting question', err);
      alert(`Failed to update vote: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    } finally {
      setVotingInProgress('');
    }
  };
  
  const handleDownvote = async (_id: string) => {
    if (!_id) throw new Error('Question ID is required');
    
    setVotingInProgress(_id);
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${_id}/vote`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'downvote' }),
        credentials: 'omit',
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }
  
      const updatedQuestion = await response.json();
      setOtherUsersQuestions((prev) =>
        prev.map((q) => q._id === _id ? { ...q, ...updatedQuestion } : q)
      );
    } catch (err) {
      console.error('Error in downvoting question', err);
      alert(`Failed to update vote: ${err instanceof Error ? err.message : 'An unknown error occurred'}`);
    } finally {
      setVotingInProgress('');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-400 to-orange-300">
      <style>{scrollbarHideStyles}</style>
      <div className="flex-grow flex p-6 space-x-6">
        <div className="w-1/3 flex flex-col space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-red-600 transition duration-300"
            >
              Ask a Question
            </button>
            <QuestionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleQuestionSubmit}
            />
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

        <div className="w-2/3 space-y-6">
          <h2 className="text-xl font-bold text-gray-800">Questions</h2>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
            {otherUsersQuestions.length > 0 ? (
              <ul className="space-y-6">
                {otherUsersQuestions.map((q) => (
                  <li key={q._id} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between items-start">
                        <p className="text-gray-700 font-medium">{q.author}</p>
                        <span className="text-sm text-gray-500">
                          {new Date(q.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 text-lg">{q.question}</p>
                      
                      {q.imageUrl && (
                        <div className="my-2">
                          <img 
                            src={`http://localhost:5000${q.imageUrl}`} 
                            alt="Question illustration"
                            className="max-w-full h-auto rounded-lg"
                          />
                        </div>
                      )}
                      
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
                          <button
                            className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
                          >
                            <FaReply />
                            Answer
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
                    </div>
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