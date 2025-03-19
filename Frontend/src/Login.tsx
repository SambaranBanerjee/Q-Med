import { useState } from "react";
function Login(event: React.FormEvent){
    event.preventDefault();
    
    const EmailAddress: string[] = JSON.parse(localStorage.getItem('EmailAddress') || '[]');
    const Password: string[] = JSON.parse(localStorage.getItem('Password') || '[]');

    const E1 = (document.getElementById('Email') as HTMLInputElement).value;
    const P1 = (document.getElementById('Password') as HTMLInputElement).value;

    const emailIndex = EmailAddress.indexOf(E1);//We use index here because includes(E1) does not match the email and password for people having the same email address

    if(emailIndex != -1 && Password[emailIndex] === P1 && (E1 !== "" && P1 !== "")){
        window.location.href = 'Entry.html'; // Go to profile page for signing up.
    }
    else{
        alert("Please enter a valid email address or password");
    }
    (document.getElementById('Email') as HTMLInputElement).value = '';
    (document.getElementById('Password') as HTMLInputElement).value = '';

}

export default function LoginComponent(){

    const [checker,setchecker] = useState(true);
    const [isUser, setisUser] = useState(false);

    const setUser = () => {
        setisUser(!isUser);
        setchecker(!checker);
    };

    const setDoctor = () => {
        setisUser(!isUser);
        setchecker(!checker);
        
    }

    return (  
        <>
            {checker && (
                <div className="flex bg-white justify-content align-items flex-col drop-shadow-xl px-20 py-20 ">
                    <h2>Are you a doctor ?</h2>
                    <br/>
                    <button id="bt1" onClick={setDoctor} className="p-5 border-4 border-black-100 hover:bg-blue-600 color-white-500">Yes</button>
                    <button id="bt1" onClick={setUser} className="p-5 border-4 border-black-100 hover:bg-blue-600 color-white-500">No</button>
                </div>
            )}

            {isUser && (
                <div className="bg-white flex flex-col justify-content align-self drop-shadow-xl py-20 px-20">
                <h1 className="text-5xl">Welcome back to your Account</h1>
                <br/>
                <h1 className="text-center text-3xl">Login</h1>
                <br/>
                <br/>
                <form className="divide-y divide-y-reverse" onSubmit={Login}>
                    <label className="block">
                        <span className="text-lg">Email:</span>
                        <input 
                            id="Email" 
                            type='text' 
                            className="w-full text-center border-2 border-black hover:border-indigo-500/75 w-200 transition-colors duration-200 rounded-md mt-2 p-2" 
                            placeholder='Email' 
                            required />
                    </label>
                    <br/>
                    <br />
                    <label className="block">
                        <span className="text-lg">Password:</span>
                        <input 
                            id="Password" 
                            type='password' 
                            className="w-full text-center border-2 border-black hover:border-indigo-500/75 w-200 transition-colors duration-200 rounded-md mt-2 p-2"
                            placeholder='Password' 
                            required />
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