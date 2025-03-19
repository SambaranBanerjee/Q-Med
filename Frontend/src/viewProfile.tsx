import { useEffect, useState } from 'react';
import NavBar from './Navbar';
import Footer from './Footer';

export default function UserInfo() {
    const [profile, setProfile] = useState({
        Name: "",
        Age: "",
        Gender: "",
        Weight: "",
        Height: "",
        Phone: ""
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUserData = localStorage.getItem('profile');
        if (storedUserData) {
            setProfile(JSON.parse(storedUserData));
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
                <NavBar />
                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Loading...</h1>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-[#f7f7f7]">
            <NavBar />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">User Information</h1>
                    <div className="space-y-4 text-lg text-gray-700">
                        <p><span className="font-semibold">Name:</span> {profile.Name}</p>
                        <p><span className="font-semibold">Age:</span> {profile.Age}</p>
                        <p><span className="font-semibold">Gender:</span> {profile.Gender}</p>
                        <p><span className="font-semibold">Weight:</span> {profile.Weight}</p>
                        <p><span className="font-semibold">Height:</span> {profile.Height}</p>
                        <p><span className="font-semibold">Phone:</span> {profile.Phone}</p>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}