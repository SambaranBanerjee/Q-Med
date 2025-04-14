/* eslint-disable no-unused-labels */
import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import '../Profile.css';

export default function Profiles() {
    const [profile, setProfile] = useState({
        Name: "",
        Age: "",
        Gender: "",
        Weight: "",
        Height: "",
        Phone: "",
    });

    const navigate = useNavigate();

    const handleProfileSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        localStorage.setItem("profile", JSON.stringify(profile));
        navigate("/app");
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = event.target;
        setProfile((prevProfile) => ({ ...prevProfile, [id]: value}));
    };

    return (
        <div className="profile-container">
            <div className="bg-white flex flex-col justify-content align-self drop-shadow-xl text-center py-20 px-20 ">
                <h1 className="text-5xl">Profile Page</h1>
                <br />
                <form id="Profile" className="flex flex-col " onSubmit={handleProfileSubmit}>
                    <br />
                    <label>
                        <span>Name:</span>
                        <input 
                        type="text" 
                        id="Name" 
                        value={profile.Name} 
                        onChange={handleChange} 
                        className="ml-5 text-center border-2 border-black hover:border-1 hover:border-indigo-500/75" 
                        required/>
                    </label>
                    <br/>
                    <label>
                        <span>Age:</span>
                        <input 
                        type="text" 
                        id="Age" 
                        value={profile.Age} 
                        onChange={handleChange} 
                        className="ml-5 text-center border-2 border-black hover:border-1 hover:border-indigo-500/75" 
                        required/>
                    </label>
                    <br/>
                    <label>
                        <span>Gender:</span>
                        <input 
                        type="text"
                        id="Gender"
                        value={profile.Gender}
                        onChange={handleChange}
                        className="ml-5 text-center border-2 border-black hover:border-1 hover:border-indigo-500/75"
                        required />
                    </label>
                    <br/>
                    <label>
                        <span>Weight:</span>
                        <input 
                        type="text"
                        id="Weight"
                        value={profile.Weight}
                        onChange={handleChange}
                        className="ml-5 text-center border-2 border-black hover:border-1 hover:border-indigo-500/75"
                        required />
                    </label>
                    <br/>
                    <label>
                        <span>Height:</span>
                        <input 
                        type="text"
                        id="Height"
                        value={profile.Height}
                        onChange={handleChange}
                        className="ml-5 text-center border-2 border-black hover:border-1 hover:border-indigo-500/75"
                        required />
                    </label>
                    <br/>
                    <label>
                        <span>Phone number: </span>
                        <input
                            type="text"
                            id="Phone"
                            value={profile.Phone}
                            onChange={handleChange}
                            className="ml-5 text-center border-2 border-black hover:border-1 hover:border-indigo-500/75"
                            required />
                    </label>
                    <br />
                    <button 
                        type="submit" 
                        className="w-50 text-center text-white rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
                        > Submit Profile 
                    </button>
                </form>
            </div>
        </div>
    );
}

