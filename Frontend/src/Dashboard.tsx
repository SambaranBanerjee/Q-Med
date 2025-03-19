import { FaHeartbeat, FaUserMd, FaPills, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa';

function Dashboard() {
    return (
        <>
            <div className='h-screen grid grid-cols-12 grid-rows-6 gap-6 p-6 bg-gradient-to-br from-[#f0f4f8] to-[#dfe9f3]'>
                {/* Health History Section */}
                <div className='bg-white rounded-xl shadow-lg p-6 col-span-12 md:col-span-4 row-span-6 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#2c3e50] mb-4 text-center flex items-center justify-center'>
                        <FaHeartbeat className="mr-2" />
                        <u>Health History</u>
                    </h2>
                    {/* Add content here */}
                </div>

                {/* Doctors from Your History Section */}
                <div className='bg-white rounded-xl shadow-lg p-6 col-span-12 md:col-span-8 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#2c3e50] mb-4 text-center flex items-center justify-center'>
                        <FaUserMd className="mr-2" />
                        <u>Doctors from Your History</u>
                    </h2>
                    {/* Add content here */}
                </div>

                {/* Medicine List Section */}
                <div className='bg-[#e8f5e9] rounded-xl shadow-lg p-6 col-span-12 md:col-span-5 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#1b5e20] mb-4 text-center flex items-center justify-center'>
                        <FaPills className="mr-2" />
                        <u>Medicine List</u>
                    </h2>
                    {/* Add content here */}
                </div>

                {/* Appointment List Section */}
                <div className='bg-[#fff3e0] rounded-xl shadow-lg p-6 col-span-12 md:col-span-3 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#e65100] mb-4 text-center flex items-center justify-center'>
                        <FaCalendarAlt className="mr-2" />
                        <u>Appointment List</u>
                    </h2>
                    {/* Add content here */}
                </div>

                {/* Your Questions Section */}
                <div className='bg-[#e3f2fd] rounded-xl shadow-lg p-6 col-span-12 md:col-span-8 row-span-2 hover:shadow-xl transition-shadow duration-200'>
                    <h2 className='text-2xl font-semibold text-[#0d47a1] mb-4 text-center flex items-center justify-center'>
                        <FaQuestionCircle className="mr-2" />
                        <u>Your Questions</u>
                    </h2>
                    {/* Add content here */}
                </div>
            </div>
        </>
    );
}

export default Dashboard;