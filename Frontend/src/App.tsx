import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './SearchPage';
import { ThemeProvider } from './ThemeContext';
import './index.css';
import welcome from './assets/welcome.jpg';
import EntryPage from './App2'; // Import EntryPage from App2

// Welcome page component
function WelcomePage() {
  const styles = {
    backgroundImage: `url(${welcome})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };

  const navigateTo = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className='flex flex-col justify-center items-center z-10' style={styles}>
      <h1 className='text-7xl text-white'>Welcome to Q-Med</h1>
      <p className='mt-7 text-white text-xl'>This is your one stop guide to a healthy and better life.</p>
      <div className='mt-8'>
        <button 
          className="mr-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => navigateTo('Login.html')}
        >
          Login
        </button>
        <button 
          className="px-6 py-3 border-2 border-white bg-transparent text-white rounded hover:bg-white hover:text-blue-500 transition-colors"
          onClick={() => navigateTo('Signup.html')}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Welcome page at root */}
          <Route path="/" element={<WelcomePage />} />
          
          {/* Use EntryPage from App2.tsx */}
          <Route path="/app" element={<EntryPage />} />
          
          {/* Other routes */}
          <Route path="/search" element={
            <div className="flex flex-col min-h-screen">
              <SearchPage />
            </div>
          } />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
