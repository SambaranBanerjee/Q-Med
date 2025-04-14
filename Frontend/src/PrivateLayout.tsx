import { useAuth } from './AuthContext';
import { useTheme } from './ThemeContext';
import NavBar from './Navbar';
import Footer from './Footer';
import '../Layout.css';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateLayout() {
  const { isAuthenticated } = useAuth();
  const { darkMode } = useTheme();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`layout-container ${darkMode ? 'dark' : ''}`}>
      <NavBar />
      <main className="layout-content layout-scrollable">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}