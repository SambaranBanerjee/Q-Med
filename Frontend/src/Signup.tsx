import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const EmailAddress: string[] = JSON.parse(localStorage.getItem('EmailAddress') || '[]');
export const Password: string[] = JSON.parse(localStorage.getItem('Password') || '[]');

function Signup(event: React.FormEvent){
    const navigate = useNavigate();
    event.preventDefault();

    const E1 = (document.getElementById('Email') as HTMLInputElement).value;
    const P1 = (document.getElementById('Password') as HTMLInputElement).value;

    if(EmailAddress.includes(E1) && Password.includes(P1) && (E1 !== "" && P1 !== "")){
        navigate('/profile-setup');
    }
    else if(!EmailAddress.includes(E1) && !Password.includes(P1)){
        EmailAddress.push(E1);
        Password.push(P1);
        localStorage.setItem('EmailAddress', JSON.stringify(EmailAddress));
        localStorage.setItem('Password', JSON.stringify(Password));
        navigate('/profile-setup');
    }
    else if(!EmailAddress.includes(E1) && Password.includes(P1)){
        EmailAddress.push(E1);
        localStorage.setItem('EmailAddress', JSON.stringify(EmailAddress));
    }
    else if(EmailAddress.includes(E1) && !Password.includes(P1)){
        Password.push(P1);
        localStorage.setItem('Password', JSON.stringify(Password));
    }

    (document.getElementById('Email') as HTMLInputElement).value = '';
    (document.getElementById('Password') as HTMLInputElement).value = '';

}

export default function SignupComponent(){

    const [checker,setchecker] = useState(true);
    const [isDoctor, setisDoctor] = useState(false);
    const [isUser, setisUser] = useState(false);

    const setDoctor = () => {
        setisDoctor(!isDoctor);
        setchecker(!checker);
    };

    const setUser = () => {
        setisUser(!isUser);
        setchecker(!checker);
    };

    return (
        <>
            {checker && (
                <div className="flex bg-white justify-content align-items flex-col drop-shadow-xl px-20 py-20 ">
                    <h2>Do you want to register as a doctor ?</h2>
                    <br/>
                    <button id="bt1" onClick={setDoctor} className="p-5 border-4 border-black-100 hover:bg-blue-600 color-white-500">Yes</button>
                    <button id="bt1" onClick={setUser} className="p-5 border-4 border-black-100 hover:bg-blue-600 color-white-500">No</button>
                </div>
            )}
           
            {isDoctor && 
                (
                <>
                    <div className="flex">
                        <div className="bg-white flex flex-col justify-content align-self drop-shadow-xl py-20 px-20 ">
                            <h1 className="text-center text-3xl">Sign up</h1>
                            <br/>
                            <form className="divide-y divide-y-reverse" onSubmit={Signup}>
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
                                <label className="block">
                                    <span className="text-lg">Medical Registration Number:</span>
                                    <input
                                        id="RegistrationNumber"
                                        type="number"
                                        className="w-full text-center border-2 border-black hover:border-indigo-500/75 w-200 transition-colors duration-200 rounded-md mt-2 p-2"
                                        placeholder="Registration Number"
                                        required/>
                                </label>
                                <button type='submit' className="w-full text-center text-white rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md mt-2 p-2" >Continue</button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {isUser && (
            <>
                <div className="flex">
                    <div className="bg-white flex flex-col justify-content align-self drop-shadow-xl py-20 px-20 ">
                        <h1 className="text-center text-3xl">Sign up</h1>
                        <br/>
                        <form className="divide-y divide-y-reverse" onSubmit={Signup}>
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
                            <button type='submit' className="w-full text-center text-white rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-md mt-2 p-2" >Continue</button>
                        </form>
                    </div>
                </div>
            </>
            )}
        </>        
    )
}
