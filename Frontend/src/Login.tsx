import { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
    const [checker, setChecker] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const setUser = () => {
        setIsUser(!isUser);
        setChecker(!checker);
    };

    const setDoctor = () => {
        setIsUser(!isUser);
        setChecker(!checker);
    }

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        
        const storedEmails: string[] = JSON.parse(localStorage.getItem('EmailAddress') || '[]');
        const storedPasswords: string[] = JSON.parse(localStorage.getItem('Password') || '[]');

        const emailIndex = storedEmails.indexOf(email);

        if (emailIndex !== -1 && storedPasswords[emailIndex] === password && email && password) {
            login(); // This now uses the context login
            navigate('/app');
        } else {
            alert("Please enter a valid email address or password");
            setEmail("");
            setPassword("");
        }
    };

    return (  
        <>
            {checker && (
                <div className="flex bg-white justify-content align-items flex-col drop-shadow-xl px-20 py-20">
                    <h2>Are you a doctor?</h2>
                    <br/>
                    <button 
                        onClick={setDoctor} 
                        className="p-5 border-4 border-black-100 hover:bg-blue-600 color-white-500"
                    >
                        Yes
                    </button>
                    <button 
                        onClick={setUser} 
                        className="p-5 border-4 border-black-100 hover:bg-blue-600 color-white-500"
                    >
                        No
                    </button>
                </div>
            )}

            {isUser && (
                <div className="bg-white flex flex-col justify-content align-self drop-shadow-xl py-20 px-20">
                    <h1 className="text-5xl">Welcome back to your Account</h1>
                    <br/>
                    <h1 className="text-center text-3xl">Login</h1>
                    <br/>
                    <br/>
                    <form onSubmit={handleLogin}>
                        <label className="block">
                            <span className="text-lg">Email:</span>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type='email' 
                                className="w-full text-center border-2 border-black hover:border-indigo-500/75 transition-colors duration-200 rounded-md mt-2 p-2" 
                                placeholder='Email' 
                                required 
                            />
                        </label>
                        <br/>
                        <br />
                        <label className="block">
                            <span className="text-lg">Password:</span>
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type='password' 
                                className="w-full text-center border-2 border-black hover:border-indigo-500/75 transition-colors duration-200 rounded-md mt-2 p-2"
                                placeholder='Password' 
                                required 
                            />
                        </label>
                        <br/>
                        <br/>
                        <button 
                            type='submit' 
                            className="w-full text-center text-white rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-2 mt-4"
                        >
                            Continue
                        </button>
                    </form>
                </div>
            )}
        </>
    )
}