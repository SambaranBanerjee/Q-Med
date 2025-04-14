import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';
import NavBar from './Navbar';
import Footer from './Footer';
import { useTheme } from './ThemeContext';
import '../Entry.css';

export default function EntryPage() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { darkMode } = useTheme();
    
    useEffect(() => {
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return null; // or loading spinner
    }

    return (
      <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-[#ECEBEB]'}`}>
        <NavBar />
        <div className='flex-grow'>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
}