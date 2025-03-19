import {useState,useEffect} from 'react';
import NavBar from './Navbar';
import Dashboard from './Dashboard';
import Footer from './Footer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any

export default function EntryPage(){
    const [profile, setProfile] = useState({ Name: "", Age: "", Gender: "",});
    useEffect(() => {
      const storedUserData = localStorage.getItem('profile');
      if (storedUserData) {
        setProfile(JSON.parse(storedUserData));
      }
    }, []);  

    return(
      <div className="flex flex-col min-h-screen">
        <NavBar/>
        <div className='flex-grow bg-[#ECEBEB]'>
          <Dashboard/>
        </div>
        <Footer/>
      </div>
      
      
    )
  }