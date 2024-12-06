import { FiArrowRight } from 'react-icons/fi';
import { assets } from '../assets/assets/assets_frontend/assets';

const Header = () => {
    return (
        <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20'>

            {/* left side */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
                <p className='text-2xl md:text-3xl lg:text-4xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                    Book Appointment <br /> With Trusted Doctors
                </p>
                <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                    <img src={assets.group_profiles} alt="" className='w-28' />
                    <p>Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' /> schedule your appointment hassle-free.</p>
                </div>
                <a href="#speciality" className='flex items-center gap-2 bg-white py-3 px-8 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
                    Book Appointment
                    <FiArrowRight />
                </a>
            </div>

            {/* right side */}
            <div className='md:w-1/2 relative'>
                <img src={assets.header_img} alt="" className=' w-full md:absolute bottom-0 object-cover rounded-lg' />
            </div>
        </div>
    )
}

export default Header
