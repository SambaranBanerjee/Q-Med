import { useEffect, useState } from 'react';

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
            href="#About.html"
            className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
          >
            Search Doctors
          </a>
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