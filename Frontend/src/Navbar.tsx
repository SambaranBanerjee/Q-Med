import { useEffect, useState } from 'react';
import { FaSearch, FaKeyboard } from 'react-icons/fa';

const NavBar = () => {
  const [profile, setUserData] = useState({ Name: "", Age: "", Weight: "", Height: "" });
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem('profile');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const removeEmailFromLocalStorage = () => {
    localStorage.removeItem('EmailAddress');
    window.location.href = 'index.html'; 
  };

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex space-x-6">
          <a
            href="Entry.html"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
          >
            Home
          </a>
          <a
            href="Questions.html"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
          >
            Ask Questions
          </a>
          <a
            href="SearchPage.html"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
          >
            Search Doctors
          </a>
        </div>

        <div className="flex space-x-9 items-center">
          <div className="relative">
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
              <FaSearch size={16} color="#9CA3AF" />
            </div>
            <input
              type="text"
              placeholder="Search for a doctor..."
              //value={searchTerm}
              //onChange={handleSearch}
              className="w-96 pl-10 pr-3 py-2.5 text-sm rounded-full border border-black
                focus:border-gray-400 focus:ring-1 focus:ring-gray-300
                transition-all duration-300 outline-none shadow-sm
                hover:shadow-md placeholder-gray-400"
            />
          </div>
          <button
            id='postQuestion'
            className='bg-purple-300 text-purple-600 px-6 py-2.5 rounded-full shadow-lg 
            hover:shadow-xl transition-all duration-300
            hover:bg-purple-400 font-medium flex items-center gap-2'
          >
            <FaKeyboard size={16} color="#4B5563" />
            Post Question
          </button>
        </div>
        <div className="relative">
          <button
            id="profile"
            className="flex items-center text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
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
            <div className="absolute mt-2 w-48 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
              <ul className="py-2">
                <li>
                  <a
                    href="viewProfile.html"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    id="LoginName"
                  >
                    {profile.Name}
                  </a>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left transition-colors duration-200"
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