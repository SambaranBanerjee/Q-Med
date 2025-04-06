import { useEffect, useState } from 'react';
import { FaSearch, FaKeyboard, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeContext';

const NavBar = () => {
  const [profile, setUserData] = useState({ Name: "", Age: "", Weight: "", Height: "" });
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const storedUserData = localStorage.getItem('profile');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const removeEmailFromLocalStorage = () => {
    localStorage.removeItem('EmailAddress');
    window.location.href = '/'; 
  };

  return (
    <nav className={`sticky top-0 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md z-50`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          <a
            href="#"
            className={`${darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'} transition-colors duration-200 font-medium`}
          >
            Home
          </a>
          <a
            href="#"
            className={`${darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'} transition-colors duration-200 font-medium`}
          >
            Ask Questions
          </a>
          <a
            href="#"
            className={`${darkMode ? 'text-white hover:text-red-300' : 'text-gray-700 hover:text-red-500'} transition-colors duration-200 font-medium`}
          >
            Search Doctors
          </a>
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
          <button
            id='postQuestion'
            className={`${
              darkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-300 text-purple-600'
            } px-6 py-2.5 rounded-full shadow-lg 
            hover:shadow-xl transition-all duration-300
            hover:bg-purple-400 font-medium flex items-center gap-2`}
          >
            <FaKeyboard size={16} color={darkMode ? "#E9D5FF" : "#4B5563"} />
            Post Question
          </button>
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
                  <a
                    href="#"
                    className={`block px-4 py-2 ${
                      darkMode ? 'text-white hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'
                    } transition-colors duration-200`}
                    id="LoginName"
                  >
                    {profile.Name}
                  </a>
                </li>
                <li>
                  <button
                    className={`block px-4 py-2 ${
                      darkMode ? 'text-red-400 hover:bg-gray-700' : 'text-red-500 hover:bg-gray-100'
                    } w-full text-left transition-colors duration-200`}
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