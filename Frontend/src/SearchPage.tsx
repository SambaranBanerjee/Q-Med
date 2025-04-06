//SearchPage.tsx
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import NavBar from './Navbar';
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

export default function SearchPage() {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { darkMode } = useTheme();

    useEffect(() => {
        const fetchDoctors = async () => {
          try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('http://localhost:5000/api/doctors');
      
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
          } catch (err) {
            console.error('Error:', err);
            setError(err instanceof Error ? err.message : 'An unknown error occurred');
            setDoctors([]);
          } finally {
            setIsLoading(false);
          }
        };
        fetchDoctors();
      }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.trim());
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) return <div className={darkMode ? "text-white" : "text-gray-800"}>Loading doctors...</div>;
    if (doctors.length === 0) return <div className={darkMode ? "text-white" : "text-gray-800"}>No doctors found</div>;

    return (
        <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
          <NavBar />
          <div className="flex-grow container mx-auto px-4 py-8">
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-800'} mb-8 text-center`}>Book an Appointment</h1>
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a doctor..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className={`w-full px-6 py-4 text-lg rounded-full border-2 
                    ${darkMode 
                      ? 'bg-gray-800 border-indigo-800 text-white placeholder-indigo-200 focus:border-indigo-400' 
                      : 'border-indigo-200 focus:border-indigo-500 placeholder-indigo-300'} 
                    focus:ring-2 focus:ring-indigo-200 
                    transition-all duration-300 outline-none shadow-md 
                    hover:shadow-lg`}
                />
                <svg 
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-400'}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            {isLoading ? (
          <div className="text-center py-8">
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Loading doctors...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div 
                  key={doctor.id} 
                  className={`${darkMode 
                    ? 'bg-gray-800 border-indigo-900 hover:shadow-indigo-700/20' 
                    : 'bg-white border-indigo-50 hover:shadow-xl'} 
                    rounded-lg shadow-md p-6 
                    transition-all duration-300 transform hover:-translate-y-1 
                    border`}
                >
                  <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>{doctor.name}</h2>
                  <p className={darkMode ? 'text-gray-300 mb-2' : 'text-gray-600 mb-2'}>Specialty: {doctor.specialty}</p>
                  <p className={darkMode ? 'text-gray-300 mb-2' : 'text-gray-600 mb-2'}>Location: {doctor.location}</p>
                  <p className={darkMode ? 'text-gray-300 mb-2' : 'text-gray-600 mb-2'}>Contact: {doctor.contactNumber}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      doctor.availability 
                        ? (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800')
                        : (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800')
                    }`}>
                      {doctor.availability ? 'Available' : 'Unavailable'}
                    </span>
                    <span className={darkMode ? 'text-gray-400 text-sm' : 'text-gray-600 text-sm'}>
                      Patients: {doctor.customerCount}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                  {doctors.length === 0 
                    ? "No doctors available at the moment" 
                    : "No doctors match your search criteria"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
