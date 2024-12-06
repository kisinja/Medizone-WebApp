import { useEffect } from 'react';
import { assets } from '../assets/assets/assets_frontend/assets';

const About = () => {

    useEffect(() => {
        /* Set the pages name to Medizone | About Us */
        document.title = "Medizone | About Us";
    }, []);

    return (
        <div>

            <div className='text-center text-2xl pt-10 text-gray-500'>
                <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
            </div>

            <div className='my-10 flex flex-col md:flex-row gap-12'>
                <img src={assets.about_image} alt="" className='w-full md:max-w-[360px]' />

                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam ipsum praesentium ut temporibus earum nam corrupti dolorum voluptates cupiditate aliquam molestiae iure et, sapiente consequatur esse at vel fugit cum.</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde officia veritatis iusto asperiores, quidem itaque ea excepturi atque mollitia esse, dolor saepe dicta doloremque. Sit culpa reiciendis repellendus officia dolorem.</p>
                    <b className='text-gray-800'>Our Vision</b>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit dolore rem tenetur, accusantium mollitia distinctio magnam numquam doloribus molestias iusto corrupti dicta porro totam nulla, eveniet ad nobis aspernatur nam?</p>
                </div>
            </div>

            <div className='text-xl my-4'>
                <p>WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> </p>
            </div>

            <div className='flex flex-col md:flex-row mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Efficiency:</b>
                    <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Convinience:</b>
                    <p>Access to a network of trusted healthcare professionals in your area.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
                    <b>Personalization:</b>
                    <p>Tailored recommendations and reminders to help you stay on top of your health.</p>
                </div>
            </div>

        </div>
    );
};

export default About