import {useState, useEffect} from 'react';
import NavBar from './Navbar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { useTheme } from './ThemeContext';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default function EntryPage(){
    // Storing profile data in state even if not directly used
    // as it might be passed to child components in the future
    const [, setProfile] = useState({ Name: "", Age: "", Gender: "" });
    const { darkMode } = useTheme();
    
    useEffect(() => {
      const storedUserData = localStorage.getItem('profile');
      if (storedUserData) {
        setProfile(JSON.parse(storedUserData));
      }
    }, []);  

    return(
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-[#ECEBEB]'}`}>
        <NavBar/>
        <div className='flex-grow'>
          <Dashboard/>
        </div>
        <Footer/>
      </div>
    );
}