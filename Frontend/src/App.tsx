import './index.css';
import welcome from './assets/welcome.jpg'

function MyButton() {
  function SignUpPage(){
    window.location.href = 'Signup.html';
  }
  function LoginPage(){
    window.location.href = 'Login.html';
  }
    return (
      <div>
        <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={LoginPage}>Login</button>
        <button className="border-2 border-blue ml-2 mt-4 p-2 bg-white rounded" onClick={SignUpPage}> Sign up </button>
      </div>
    );
  }

function MyApp() {

  const styles = {
    backgroundImage: `url(${welcome})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100vw',
  };

  return (
    <>
      <div className='flex flex-col justify-center align-self z-10' style={styles}>
        <h1 className='text-7xl text-white'>Welcome to the Fitness Guide</h1>
        <p className='mt-7'>This is your one stop guide to a healthy and better life.</p>
        <MyButton />
      </div>
    </>
  );
}

export default MyApp;
