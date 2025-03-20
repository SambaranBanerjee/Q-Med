import {useEffect,useState} from 'react';

const NavBar = () => {
    const [profile, setUserData] = useState({ Name: "", Age: "",Weight: "", Height: ""});
    useEffect(() => {
      const storedUserData = localStorage.getItem('profile');
      if (storedUserData) {
          setUserData(JSON.parse(storedUserData));
      }
    }, []);

    const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);

    const removeEmailFromLocalStorage = () => {
        localStorage.removeItem('EmailAddress');
        window.location.href = 'index.html'; // Redirect to login page after logout
    };

    return(
        <nav className='sticky bg-white p-4'>
            <div className="container mx-auto flex justify-between items-center z-10">
                <button className="text-gray-300 hover:text-black active:green-500"><a href='Entry.html'>Home</a></button>
                <button className="text-gray-300 hover:text-black active:green-500"><a href='Questions.html'>Ask Questions</a></button>
                <button className="text-gray-300 hover:text-black active:green-500"><a href='#About.html'>Search Doctors</a></button>
                <div className='relative'>
                    <button id="profile" className="text-gray-300 hover:text-black" onClick={()=>{setProfileDropdownVisible(!isProfileDropdownVisible)}}>Profile</button>
                    {isProfileDropdownVisible && (
                        <div className="absolute mt-2 w-48 right-2 bg-gray-800 rounded-md shadow-lg z-10">
                        <ul className="space-y-2 py-2">
                            <li>
                                <a 
                                    href="viewProfile.html" 
                                    className="block px-4 py-2 text-white hover:bg-gray-700 transition-colors duration-200" 
                                    id='LoginName'
                                >
                                    {profile.Name}
                                </a>
                            </li>
                            <li>
                                <button 
                                    className="block px-4 py-2 text-red-500 hover:bg-gray-700 w-full text-left transition-colors duration-200" 
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