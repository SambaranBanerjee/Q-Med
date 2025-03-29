import './index.css';

export default function Footer() {
    return (
        <footer className='bg-[#FF5E07] mt-auto py-6'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 sm:grid-cols-3 gap-8'>
                    {/* Company Info */}
                    <div className='text-white'>
                        <h3 className='text-xl font-bold mb-4'>Q-Med</h3>
                        <p className='text-sm mb-2'>Making the world a better place through innovative solutions.</p>
                        <p className='text-sm'>© 2024 Company Name. All rights reserved.</p>
                    </div>

                    {/* Quick Links */}
                    <div className='text-white'>
                        <h3 className='text-xl font-bold mb-4'>Quick Links</h3>
                        <ul className='space-y-2'>
                            <li><a href="#" className='hover:text-gray-200 transition-colors duration-200'>About Us</a></li>
                            <li><a href="#" className='hover:text-gray-200 transition-colors duration-200'>Services</a></li>
                            <li><a href="#" className='hover:text-gray-200 transition-colors duration-200'>Blog</a></li>
                            <li><a href="#" className='hover:text-gray-200 transition-colors duration-200'>Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div className='text-white'>
                        <h3 className='text-xl font-bold mb-4'>Connect With Us</h3>
                        <div className='mb-4'>
                            <p className='text-sm mb-1'>Email: contact@company.com</p>
                            <p className='text-sm'>Phone: (+91) 839-4567</p>
                        </div>
                        <div className='flex space-x-4'>
                            <a href="#" className='hover:text-gray-200 transition-colors duration-200'>
                                <i className='fab fa-facebook-f'></i>
                            </a>
                            <a href="#" className='hover:text-gray-200 transition-colors duration-200'>
                                <i className='fab fa-twitter'></i>
                            </a>
                            <a href="#" className='hover:text-gray-200 transition-colors duration-200'>
                                <i className='fab fa-linkedin-in'></i>
                            </a>
                            <a href="#" className='hover:text-gray-200 transition-colors duration-200'>
                                <i className='fab fa-instagram'></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}