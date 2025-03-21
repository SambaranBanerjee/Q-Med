import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import NavBar from './Navbar';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    available: boolean;
}

const SearchPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Mock data for doctors (replace with API call in a real application)
    useEffect(() => {
        const mockDoctors: Doctor[] = [
            { id: 1, name: 'Dr. Rakesh Sharma', specialty: 'Cardiologist', available: true },
            { id: 2, name: 'Dr. Janardhan Smith', specialty: 'Dermatologist', available: false },
            { id: 3, name: 'Dr. Ankita Singh', specialty: 'Pediatrician', available: true },
        ];
        setDoctors(mockDoctors);
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredDoctors = doctors.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="search-page">
            <NavBar />
            <div className="search-container">
                <h1>Book an Appointment</h1>
                <input
                    type="text"
                    placeholder="Search for a doctor..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                />
                <div className="doctors-list">
                    {filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className="doctor-card">
                            <h2>{doctor.name}</h2>
                            <p><strong>Specialty:</strong> {doctor.specialty}</p>
                            <p>
                                <strong>Availability:</strong>
                                <span className={doctor.available ? 'available' : 'unavailable'}>
                                    {doctor.available ? ' Available' : ' Not Available'}
                                </span>
                            </p>
                            <button
                                className="book-button"
                                disabled={!doctor.available}
                            >
                                Book Appointment
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;