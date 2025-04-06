import { FaHeartbeat, FaUserMd, FaPills, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    availability: boolean;
    contactNumber: string;
    customerCount: number;
    location: string;
}

function Dashboard() {
    const [submittedQuestions, setSubmittedQuestions] = useState<string[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchSubmittedQuestions = async () => {
            const response = await fetch('http://localhost:5000/api/myQuestions');
            const data = await response.json();
            setSubmittedQuestions(data.map((q: { question: string }) => q.question));
        };
        fetchSubmittedQuestions();
    }, []);
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/doctors');
                setIsLoading(true);
                setError(null);
                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }
  
                const data = await response.json();
              // Handle both array and object responses
                const doctorsArray = Array.isArray(data) 
                ? data 
                : data.doctors || data.data || [];
              
                if (!Array.isArray(doctorsArray)) {
                    throw new Error("Doctors data is not an array");
                }
                setDoctors(doctorsArray);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            } finally {
                setIsLoading(false);
            }
        };
        fetchDoctors();
    }, []);
    if (isLoading) return <div className={darkMode ? "text-white" : "text-gray-800"}>Loading doctors...</div>;
    if (doctors.length === 0) return <div className={darkMode ? "text-white" : "text-gray-800"}>No doctors found</div>;
    return (
        <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-3'>
                {/* Health History Section */}
                <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-md p-6 md:col-span-4 lg:col-span-3 border`}>
                    <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 flex items-center gap-2`}>
                        <FaHeartbeat color={darkMode ? "#93c5fd" : "#1d4ed8"} />
                        Health History
                    </h2>
                    <div className='space-y-4'>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Last Checkup: <span className='font-medium'>January 15, 2024</span></p>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Blood Pressure: <span className='font-medium'>120/80 mmHg</span></p>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Cholesterol Level: <span className='font-medium'>180 mg/dL</span></p>
                        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>Weight: <span className='font-medium'>75 kg</span></p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className='md:col-span-8 lg:col-span-9 grid grid-cols-1 gap-3'>
                    {/* Doctors Section */}
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-6 border`}>
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-2`}>
                            <FaUserMd color={darkMode ? "#93c5fd" : "#2563eb"} />
                            Your Doctors
                        </h2>
                        <div className='overflow-x-auto'>
                            <div className='flex gap-4 min-w-max'>
                                {doctors.map((doctor) => (
                                    <div key={doctor.id} className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
                                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{doctor.name}</p>
                                        <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>{doctor.specialty}</p>
                                    </div>
                                ))}
                                {error && <p className='text-red-500'>{error}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Medicine and Appointments Row */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                        {/* Medicine List Section */}
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-6 border`}>
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-2`}>
                                <FaPills color={darkMode ? "#93c5fd" : "#2563eb"} />
                                Medicine List
                            </h2>
                            <div className='space-y-4'>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Paracetamol</p>
                                    <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>500mg, 1 tablet daily</p>
                                    <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>25 days left</p>
                                </div>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} border`}>
                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Amoxicillin</p>
                                    <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>500mg, 2 tablets daily</p>
                                    <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-700 text-sm'}>7 days left</p> 
                                </div>
                            </div>
                        </div>

                        {/* Appointment List Section */}
                        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-6 border`}>
                            <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-2`}>
                                <FaCalendarAlt color={darkMode ? "#93c5fd" : "#2563eb"} />
                                Appointments
                            </h2>
                            <div className='space-y-4'>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'} border`}>
                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dr. Rakesh Sharma</p>
                                    <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>February 10, 2024, 10:00 AM</p>
                                </div>
                                <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-100'} border`}>
                                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>Dr. Janardhan Smith</p>
                                    <p className={darkMode ? 'text-gray-300 text-sm' : 'text-gray-600 text-sm'}>February 12, 2024, 2:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-lg shadow-sm p-6 border`}>
                        <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-6 flex items-center gap-2`}>
                            <FaQuestionCircle size={20} color={darkMode ? "#93c5fd" : "#2563eb"} />
                            Your Questions
                        </h2>
                        <div className='space-y-4'>
                            {submittedQuestions.length > 0 ? (
                                <ul className="space-y-3">
                                    {submittedQuestions.map((q, index) => (
                                    <li key={index} className={`p-3 ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg border`}>
                                        <p className={darkMode ? 'text-gray-300' : 'text-gray-700'}>{q}</p>
                                    </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No questions submitted yet.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;