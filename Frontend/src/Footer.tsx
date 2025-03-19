import './index.css';

export default function Footer() {
    return (
        <footer className='bg-[#FF5E07] mt-auto py-6'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex flex-col sm:flex-row justify-around items-center space-y-4 sm:space-y-0'>
                    {/* Social Media */}
                    <div className='text-white hover:text-gray-200 transition-colors duration-200'>
                        <a href="#" className='text-lg font-semibold'>
                            Social Media
                        </a>
                    </div>

                    {/* About */}
                    <div className='text-white hover:text-gray-200 transition-colors duration-200'>
                        <a href="#" className='text-lg font-semibold'>
                            About
                        </a>
                    </div>

                    {/* Contact */}
                    <div className='text-white hover:text-gray-200 transition-colors duration-200'>
                        <a href="#" className='text-lg font-semibold'>
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}