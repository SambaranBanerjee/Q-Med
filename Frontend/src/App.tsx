import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import './index.css';

// Components
import WelcomePage from './Welcome';
import Dashboard from './Dashboard';
import SearchPage from './SearchPage';
import QuestionsPage from './AskQuestions';
import LoginComponent from './Login';
import SignupComponent from './Signup';
import Profiles from './Profile';
import UserInfo from './viewProfile';
import PrivateLayout from './PrivateLayout';
import PublicLayout from './PublicLayout';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            
            {/* Public Routes - No Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/signup" element={<SignupComponent />} />
            </Route>

            {/* Private Routes - With Layout */}
            <Route element={<PrivateLayout />}>
              <Route path="/app" element={<Dashboard />} />
              <Route path="/app/search" element={<SearchPage />} />
              <Route path="/app/questions" element={<QuestionsPage />} />
              <Route path="/app/view-profile" element={<UserInfo />} />
              <Route path="/profile-setup" element={<Profiles />} />
            </Route>

            {/* Redirects */}
            <Route path="/entry" element={<Navigate to="/app" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;