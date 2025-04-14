import { useEffect, useState } from 'react';
import { FaSearch, FaKeyboard, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeContext';
import { useNavigate } from 'react-router-dom';
import QuestionModal from './questionModal';

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

interface ProfileData {
  Name: string;
  Age: string;
  Weight: string;
  Height: string;
}

const NavBar = () => {
  const [profile, setUserData] = useState<ProfileData>({ Name: "", Age: "", Weight: "", Height: "" });
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const [, setSubmittedQuestions] = useState<string[]>([]);
  const [, setOtherUsersQuestions] = useState<Question[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = localStorage.getItem('profile');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (err) {
        console.error('Error parsing profile data', err);
      }
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
          questionsResponse.json() as Promise<Question[]>,
          myQuestionsResponse.json() as Promise<Question[]>
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

  const removeEmailFromLocalStorage = () => {
    localStorage.removeItem('EmailAddress');
    navigate('/'); 
  };

  const handleQuestionSubmit = async (question: string, _author: string, image?: File) => {
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

      const data = await response.json() as Question;
      setOtherUsersQuestions((prev) => [...prev, data]);
      setSubmittedQuestions((prev) => [...prev, question]);
    } catch (err) {
      console.error('Detailed submission error:', err);
      throw err;
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <nav className={`sticky top-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md z-50`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          <button
            onClick={() => navigate('/app')}
            className={`${darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'} transition-colors duration-200 font-medium`}
          >
            Home
          </button>
          <button
            onClick={() => navigate('/app/questions')}
            className={`${darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'} transition-colors duration-200 font-medium`}
          >
            Ask Questions
          </button>
          <button
            onClick={() => navigate('/app/search')}
            className={`${darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'} transition-colors duration-200 font-medium`}
          >
            Search Doctors
          </button>
        </div>

        <div className="flex space-x-9 items-center">
          <div className="relative">
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <FaSearch size={16} color={darkMode ? "#ffffff" : "#9CA3AF"} />
            </div>
            <input
              type="text"
              placeholder="Search for a doctor..."
              className={`w-96 pl-10 pr-3 py-2.5 text-sm rounded-full border ${
                darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-300' : 'border-black placeholder-gray-400'
              } focus:border-gray-400 focus:ring-1 focus:ring-gray-300
                transition-all duration-300 outline-none shadow-sm
                hover:shadow-md`}
            />
          </div>
          <div>
              <button
              id='postQuestion'
              className={`${
                darkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-300 text-purple-600'
              } px-6 py-2.5 rounded-full shadow-lg 
              hover:shadow-xl transition-all duration-300
              hover:bg-purple-400 font-medium flex items-center gap-2`}
              onClick={() => setIsModalOpen(true)}
            >
              <FaKeyboard size={16} color={darkMode ? "#E9D5FF" : "#4B5563"} />
              Post Question
            </button>
            <QuestionModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSubmit={handleQuestionSubmit}
            />
          </div>
        </div>
        <div>
          <button
            id='darkMode'
            className={`${
              darkMode ? 'bg-yellow-500 text-yellow-900' : 'bg-gray-300 text-gray-600'
            } px-6 py-2.5 rounded-full shadow-lg 
            hover:shadow-xl transition-all duration-300
            hover:bg-gray-400 font-medium flex items-center gap-2`}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <><FaSun size={16} color="#78350F" />Light Mode</>
            ) : (
              <><FaMoon size={16} color="#4B5563" />Dark Mode</>
            )}
          </button>
        </div>
        <div className="relative">
          <button
            id="profile"
            className={`flex items-center ${
              darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'
            } transition-colors duration-200 font-medium`}
            onClick={() => setProfileDropdownVisible(!isProfileDropdownVisible)}
          >
            Profile
            <svg
              className={`w-4 h-4 ml-2 transition-transform duration-200 ${
                isProfileDropdownVisible ? 'transform rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {isProfileDropdownVisible && (
            <div className={`absolute mt-2 w-48 right-0 ${
              darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } rounded-lg shadow-lg border z-20`}>
              <ul className="py-2">
                <li>
                  <button
                    className={`block px-4 py-2 w-full text-left ${
                      darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-200`}
                    id="LoginName"
                  >
                    {profile.Name}
                  </button>
                </li>
                <li>
                  <button
                    className={`block px-4 py-2 w-full text-left ${
                      darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-gray-100'
                    } transition-colors duration-200`}
                    onClick={removeEmailFromLocalStorage}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;