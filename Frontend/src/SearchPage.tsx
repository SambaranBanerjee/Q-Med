//SearchPage.tsx
import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import NavBar from './Navbar';

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
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [error, setError] = useState<string | null>(null);

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

    if (isLoading) return <div>Loading doctors...</div>;
    if (doctors.length === 0) return <div>No doctors found</div>;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
          <NavBar />
          <div className="flex-grow container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Book an Appointment</h1>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for a doctor..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading doctors...</p>
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
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{doctor.name}</h2>
                  <p className="text-gray-600 mb-2">Specialty: {doctor.specialty}</p>
                  <p className="text-gray-600 mb-2">Location: {doctor.location}</p>
                  <p className="text-gray-600 mb-2">Contact: {doctor.contactNumber}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      doctor.availability 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.availability ? 'Available' : 'Unavailable'}
                    </span>
                    <span className="text-gray-600 text-sm">
                      Patients: {doctor.customerCount}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">
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
