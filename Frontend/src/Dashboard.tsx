import { FaHeartbeat, FaUserMd, FaPills, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';

function Dashboard() {
    return (
        <>
            <div className='min-h-screen grid grid-cols-1 md:grid-cols-12 grid-rows-auto gap-4 p-4 bg-gradient-to-br from-[#f0f4f8] to-[#dfe9f3]'>
                {/* Health History Section */}
                <div className='bg-white rounded-xl shadow-lg p-4 md:p-6 col-span-1 md:col-span-12 lg:col-span-4 row-span-auto hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-xl md:text-2xl font-semibold text-[#2c3e50] mb-4 text-center flex items-center justify-center'>
                        <span className="mr-2"><FaHeartbeat /></span>
                        <u>Health History</u>
                    </h2>
                    <div className='space-y-3'>
                        <p className='text-sm md:text-base text-gray-600'>Last Checkup: <span className='font-semibold'>January 15, 2024</span></p>
                        <p className='text-sm md:text-base text-gray-600'>Blood Pressure: <span className='font-semibold'>120/80 mmHg</span></p>
                        <p className='text-sm md:text-base text-gray-600'>Cholesterol Level: <span className='font-semibold'>180 mg/dL</span></p>
                        <p className='text-sm md:text-base text-gray-600'>Weight: <span className='font-semibold'>75 kg</span></p>
                    </div>
                </div>

                {/* Doctors from Your History Section */}
                <div className='bg-white rounded-xl shadow-lg p-4 md:p-6 col-span-1 md:col-span-12 lg:col-span-8 row-span-auto hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-xl md:text-2xl font-semibold text-[#2c3e50] mb-4 text-center flex items-center justify-center'>
                        <span className="mr-2"><FaUserMd /></span>
                        <u>Doctors from Your History</u>
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='bg-[#f8f9fa] p-3 md:p-4 rounded-lg'>
                            <p className='font-semibold text-sm md:text-base'>Dr. Rakesh Sharma</p>
                            <p className='text-xs md:text-sm text-gray-600'>Cardiologist</p>
                        </div>
                        <div className='bg-[#f8f9fa] p-3 md:p-4 rounded-lg'>
                            <p className='font-semibold text-sm md:text-base'>Dr. Janardhan Smith</p>
                            <p className='text-xs md:text-sm text-gray-600'>Dermatologist</p>
                        </div>
                    </div>
                </div>

                {/* Medicine List Section */}
                <div className='bg-[#e8f5e9] rounded-xl shadow-lg p-4 md:p-6 col-span-1 md:col-span-12 lg:col-span-5 row-span-auto hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-xl md:text-2xl font-semibold text-[#1b5e20] mb-4 text-center flex items-center justify-center'>
                        <span className="mr-2"><FaPills /></span>
                        <u>Medicine List</u>
                    </h2>
                    <div className='space-y-3'>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold text-sm md:text-base'>Paracetamol</p>
                            <p className='text-xs md:text-sm text-gray-600'>500mg, 1 tablet daily</p>
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold text-sm md:text-base'>Amoxicillin</p>
                            <p className='text-xs md:text-sm text-gray-600'>500mg, 2 tablets daily</p>
                        </div>
                    </div>
                </div>

                {/* Appointment List Section */}
                <div className='bg-[#fff3e0] rounded-xl shadow-lg p-4 md:p-6 col-span-1 md:col-span-12 lg:col-span-3 row-span-auto hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-xl md:text-2xl font-semibold text-[#e65100] mb-4 text-center flex items-center justify-center'>
                        <span className="mr-2"><FaCalendarAlt /></span>
                        <u>Appointment List</u>
                    </h2>
                    <div className='space-y-3'>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold text-sm md:text-base'>Dr. Rakesh Sharma</p>
                            <p className='text-xs md:text-sm text-gray-600'>February 10, 2024, 10:00 AM</p>
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold text-sm md:text-base'>Dr. Janardhan Smith</p>
                            <p className='text-xs md:text-sm text-gray-600'>February 12, 2024, 2:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Your Questions Section */}
                <div className='bg-[#e3f2fd] rounded-xl shadow-lg p-4 md:p-6 col-span-1 md:col-span-12 lg:col-span-8 row-span-auto hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-xl md:text-2xl font-semibold text-[#0d47a1] mb-4 text-center flex items-center justify-center'>
                        <span className="mr-2"><FaQuestionCircle /></span>
                        <u>Your Questions</u>
                    </h2>
                    <div className='space-y-3'>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold text-sm md:text-base'>Can I take Paracetamol with Amoxicillin?</p>
                            <p className='text-xs md:text-sm text-gray-600'>Asked on January 20, 2024</p>
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold text-sm md:text-base'>What are the side effects of Amoxicillin?</p>
                            <p className='text-xs md:text-sm text-gray-600'>Asked on January 22, 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;