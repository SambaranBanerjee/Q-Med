import { FaHeartbeat, FaUserMd, FaPills, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';

function Dashboard() {
    return (
        <div className='min-h-screen p-6 bg-gray-100'>
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6'>
                {/* Health History Section */}
                <div className='bg-white rounded-lg shadow-md p-6 md:col-span-4 lg:col-span-3 border border-gray-200'>
                    <h2 className='text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2'>
                        <FaHeartbeat color="#1d4ed8" />
                        Health History
                    </h2>
                    <div className='space-y-4'>
                        <p className='text-gray-800'>Last Checkup: <span className='font-medium'>January 15, 2024</span></p>
                        <p className='text-gray-800'>Blood Pressure: <span className='font-medium'>120/80 mmHg</span></p>
                        <p className='text-gray-800'>Cholesterol Level: <span className='font-medium'>180 mg/dL</span></p>
                        <p className='text-gray-800'>Weight: <span className='font-medium'>75 kg</span></p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className='md:col-span-8 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                    {/* Doctors Section */}
                    <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
                            <FaUserMd color="#2563eb" />
                            Your Doctors
                        </h2>
                        <div className='space-y-4'>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                                <p className='font-medium text-gray-900'>Dr. Rakesh Sharma</p>
                                <p className='text-gray-700 text-sm'>Cardiologist</p>
                            </div>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                                <p className='font-medium text-gray-900'>Dr. Janardhan Smith</p>
                                <p className='text-gray-700 text-sm'>Dermatologist</p>
                            </div>
                        </div>
                    </div>

                    {/* Medicine List Section */}
                    <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
                            <FaPills color="#2563eb" />
                            Medicine List
                        </h2>
                        <div className='space-y-4'>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                                <p className='font-medium text-gray-900'>Paracetamol</p>
                                <p className='text-gray-700 text-sm'>500mg, 1 tablet daily</p>
                                <p className='text-gray-700 text-sm'>25 days left</p>
                            </div>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-200'>
                                <p className='font-medium text-gray-900'>Amoxicillin</p>
                                <p className='text-gray-700 text-sm'>500mg, 2 tablets daily</p>
                                <p className='text-gray-700 text-sm'>7 days left</p> 
                            </div>
                        </div>
                    </div>

                    {/* Appointment List Section */}
                    <div className='bg-white rounded-lg shadow-sm p-6 border border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
                            <FaCalendarAlt color="#2563eb" />
                            Appointments
                        </h2>
                        <div className='space-y-4'>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-100'>
                                <p className='font-medium text-gray-800'>Dr. Rakesh Sharma</p>
                                <p className='text-gray-600 text-sm'>February 10, 2024, 10:00 AM</p>
                            </div>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-100'>
                                <p className='font-medium text-gray-800'>Dr. Janardhan Smith</p>
                                <p className='text-gray-600 text-sm'>February 12, 2024, 2:00 PM</p>
                            </div>
                        </div>
                    </div>

                    {/* Questions Section */}
                    <div className='bg-white rounded-lg shadow-sm p-6 md:col-span-2 lg:col-span-3 border border-gray-100'>
                        <h2 className='text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2'>
                            <FaQuestionCircle size={20} color="#2563eb" />
                            Your Questions
                        </h2>
                        <div className='space-y-4'>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-100'>
                                <p className='font-medium text-gray-800'>Can I take Paracetamol with Amoxicillin?</p>
                                <p className='text-gray-600 text-sm'>Asked on January 20, 2024</p>
                            </div>
                            <div className='p-4 rounded-lg bg-gray-50 border border-gray-100'>
                                <p className='font-medium text-gray-800'>What are the side effects of Amoxicillin?</p>
                                <p className='text-gray-600 text-sm'>Asked on January 22, 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;