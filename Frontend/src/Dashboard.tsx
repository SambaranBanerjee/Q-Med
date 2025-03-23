import { FaHeartbeat, FaUserMd, FaPills, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';

function Dashboard() {
    return (
        <>
            <div className='h-screen grid grid-cols-12 grid-rows-6 gap-6 p-6 bg-gradient-to-br from-[#f0f4f8] to-[#dfe9f3]'>
                {/* Health History Section */}
                <div className='bg-white rounded-xl shadow-lg p-6 col-span-12 md:col-span-4 row-span-6 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#2c3e50] mb-4 text-center flex items-center justify-center'>
                        <span className="mr-2"><FaHeartbeat /></span>
                        <u>Health History</u>
                    </h2>
                    <div className='space-y-4'>
                        <p className='text-gray-600'>Last Checkup: <span className='font-semibold'>January 15, 2024</span></p>
                        <p className='text-gray-600'>Blood Pressure: <span className='font-semibold'>120/80 mmHg</span></p>
                        <p className='text-gray-600'>Cholesterol Level: <span className='font-semibold'>180 mg/dL</span></p>
                        <p className='text-gray-600'>Weight: <span className='font-semibold'>75 kg</span></p>
                    </div>
                </div>

                {/* Doctors from Your History Section */}
                <div className='bg-white rounded-xl shadow-lg p-6 col-span-12 md:col-span-8 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#2c3e50] mb-4 text-center flex items-center justify-center'>
                    <span className="mr-2"><FaUserMd /></span>
                        <u>Doctors from Your History</u>
                    </h2>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='bg-[#f8f9fa] p-4 rounded-lg'>
                            <p className='font-semibold'>Dr. Rakesh Sharma</p>
                            <p className='text-sm text-gray-600'>Cardiologist</p>
                        </div>
                        <div className='bg-[#f8f9fa] p-4 rounded-lg'>
                            <p className='font-semibold'>Dr. Janardhan Smith</p>
                            <p className='text-sm text-gray-600'>Dermatologist</p>
                        </div>
                    </div>
                </div>

                {/* Medicine List Section */}
                <div className='bg-[#e8f5e9] rounded-xl shadow-lg p-6 col-span-12 md:col-span-5 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#1b5e20] mb-4 text-center flex items-center justify-center'>
                    <span className="mr-2"><FaPills /></span>
                        <u>Medicine List</u>
                    </h2>
                    <div className='space-y-3'>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold'>Paracetamol</p>
                            <p className='text-sm text-gray-600'>500mg, 1 tablet daily</p>
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold'>Amoxicillin</p>
                            <p className='text-sm text-gray-600'>500mg, 2 tablets daily</p>
                        </div>
                    </div>
                </div>

                {/* Appointment List Section */}
                <div className='bg-[#fff3e0] rounded-xl shadow-lg p-6 col-span-12 md:col-span-3 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#e65100] mb-4 text-center flex items-center justify-center'>
                    <span className="mr-2"><FaCalendarAlt /></span>
                        <u>Appointment List</u>
                    </h2>
                    <div className='space-y-3'>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold'>Dr. Rakesh Sharma</p>
                            <p className='text-sm text-gray-600'>February 10, 2024, 10:00 AM</p>
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold'>Dr. Janardhan Smith</p>
                            <p className='text-sm text-gray-600'>February 12, 2024, 2:00 PM</p>
                        </div>
                    </div>
                </div>

                {/* Your Questions Section */}
                <div className='bg-[#e3f2fd] rounded-xl shadow-lg p-6 col-span-12 md:col-span-8 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#0d47a1] mb-4 text-center flex items-center justify-center'>
                    <span className="mr-2"><FaQuestionCircle /></span>
                        <u>Your Questions</u>
                    </h2>
                    <div className='space-y-3'>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold'>Can I take Paracetamol with Amoxicillin?</p>
                            <p className='text-sm text-gray-600'>Asked on January 20, 2024</p>
                        </div>
                        <div className='bg-white p-3 rounded-lg shadow-sm'>
                            <p className='font-semibold'>What are the side effects of Amoxicillin?</p>
                            <p className='text-sm text-gray-600'>Asked on January 22, 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;