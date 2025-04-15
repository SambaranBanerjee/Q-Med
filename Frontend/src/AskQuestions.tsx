//import NavBar from './Navbar';
import { useState, useEffect } from 'react';
import QuestionModal from './questionModal';
import { FaReply } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

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
  const { darkMode } = useTheme();

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

  // Updated return statement with complete dark mode implementation
return (
  <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
    !darkMode 
      ? "bg-gradient-to-br from-red-400 to-orange-300" 
      : "dark bg-gradient-to-br from-gray-900 to-gray-800"
  }`}>
    <style>{scrollbarHideStyles}</style>
    <div className={`flex-grow flex p-6 space-x-6 ${
      darkMode ? "dark:text-gray-100" : ""
    }`}>
      {/* Left Column */}
      <div className="w-1/3 flex flex-col space-y-6">
        {/* Ask Question Card */}
        <div className={`rounded-lg shadow-lg p-6 transition-colors duration-300 ${
          darkMode 
            ? "dark:bg-gray-800 dark:shadow-gray-900" 
            : "bg-white"
        }`}>
          <button 
            onClick={() => setIsModalOpen(true)}
            className={`w-full py-2 px-4 rounded-lg font-semibold transition duration-300 ${
              darkMode
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
          >
            Ask a Question
          </button>
          <QuestionModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleQuestionSubmit}
          />
        </div>

        {/* Your Questions Card */}
        <div className={`rounded-lg shadow-lg p-6 space-y-4 transition-colors duration-300 ${
          darkMode 
            ? "dark:bg-gray-800 dark:shadow-gray-900" 
            : "bg-white"
        }`}>
          <h2 className={`text-xl font-bold ${
            darkMode ? "dark:text-gray-200" : "text-gray-800"
          }`}>
            Your Submitted Questions
          </h2>
          {submittedQuestions.length > 0 ? (
            <ul className="space-y-3">
              {submittedQuestions.map((q, index) => (
                <li key={index} className={`p-3 rounded-lg border transition-colors duration-300 ${
                  darkMode
                    ? "dark:bg-gray-700 dark:border-gray-600"
                    : "bg-gray-50 border-gray-200"
                }`}>
                  <p className={darkMode ? "dark:text-gray-300" : "text-gray-700"}>{q}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={darkMode ? "dark:text-gray-400" : "text-gray-500"}>
              No questions submitted yet.
            </p>
          )}
        </div>
      </div>

      {/* Right Column - Questions List */}
      <div className="w-2/3 space-y-6">
        <h2 className={`text-xl font-bold ${
          darkMode ? "dark:text-gray-200" : "text-gray-800"
        }`}>
          Questions
        </h2>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
          {otherUsersQuestions.length > 0 ? (
            <ul className="space-y-6">
              {otherUsersQuestions.map((q) => (
                <li key={q._id} className={`rounded-lg shadow-lg p-6 transition-colors duration-300 ${
                  darkMode 
                    ? "dark:bg-gray-800 dark:shadow-gray-900" 
                    : "bg-white"
                }`}>
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between items-start">
                      <p className={`font-medium ${
                        darkMode ? "dark:text-gray-300" : "text-gray-700"
                      }`}>
                        {q.author}
                      </p>
                      <span className={`text-sm ${
                        darkMode ? "dark:text-gray-400" : "text-gray-500"
                      }`}>
                        {new Date(q.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className={`text-lg ${
                      darkMode ? "dark:text-gray-200" : "text-gray-700"
                    }`}>
                      {q.question}
                    </p>
                    
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
                        q.isAnswered 
                          ? darkMode 
                            ? "dark:bg-green-900 dark:text-green-300" 
                            : "bg-green-100 text-green-700"
                          : darkMode 
                            ? "dark:bg-yellow-900 dark:text-yellow-300" 
                            : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {q.isAnswered ? 'Answered' : 'Pending'}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => handleUpvote(q._id)}
                          disabled={votingInProgress === q._id}
                          className={`${votingInProgress === q._id ? 'opacity-50' : ''} ${
                            darkMode 
                              ? "dark:text-green-400 dark:hover:text-green-300" 
                              : "text-green-600 hover:text-green-800"
                          }`}
                        >
                          ↑ {q.upvote}
                        </button>
                        <button 
                          onClick={() => handleDownvote(q._id)}
                          disabled={votingInProgress === q._id}
                          className={`${votingInProgress === q._id ? 'opacity-50' : ''} ${
                            darkMode 
                              ? "dark:text-red-400 dark:hover:text-red-300" 
                              : "text-red-600 hover:text-red-800"
                          }`}
                        >
                          ↓ {q.downvote}
                        </button>
                        <button
                          className={`flex items-center space-x-2 ${
                            darkMode
                              ? "dark:text-blue-400 dark:hover:text-blue-300"
                              : "text-blue-600 hover:text-blue-800"
                          }`}
                        >
                          <FaReply />
                          Answer
                        </button>
                      </div>
                    </div>
                    {q.answers.length > 0 && (
                      <div className="mt-3">
                        <p className={`text-sm font-medium ${
                          darkMode ? "dark:text-gray-300" : "text-gray-700"
                        }`}>
                          Answers:
                        </p>
                        <ul className="mt-1 space-y-1">
                          {q.answers.map((answer, idx) => (
                            <li 
                              key={idx} 
                              className={`text-sm pl-3 border-l-2 ${
                                darkMode
                                  ? "dark:text-gray-400 dark:border-gray-600"
                                  : "text-gray-600 border-gray-300"
                              }`}
                            >
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
            <p className={darkMode ? "dark:text-gray-400" : "text-gray-500"}>
              No questions from users yet.
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);
}