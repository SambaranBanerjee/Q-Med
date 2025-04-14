import welcome from './assets/welcome.jpg';
import { useNavigate } from 'react-router-dom';
import '../Welcome.css';

export default function WelcomePage() {
    const navigate = useNavigate();
  
    return (
      <div 
        className="welcome-container"
        style={{ backgroundImage: `url(${welcome})` }}
      >
        <h1 className='text-7xl text-white'>Welcome to Q-Med</h1>
        <p className='mt-7 text-white text-xl'>This is your one stop guide to a healthy and better life.</p>
        <div className='mt-8'>
          <button 
            className="mr-4 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button 
            className="px-6 py-3 border-2 border-white bg-transparent text-white rounded hover:bg-white hover:text-blue-500 transition-colors"
            onClick={() => navigate('/signup')}
          >
            Sign up
          </button>
        </div>
      </div>
    );
}