import { Link, useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();
    const year = new Date().getFullYear();

    return (
        <div className="md:mx-10 border-t-2 mt-12">
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">


                {/* left section */}
                <div>
                    <div className="font-bold text-xl flex items-center gap-1 cursor-pointer mb-5 w-40" onClick={() => navigate('/')}>
                        <div className="w-12 h-12 rounded-full bg-primary"></div>
                        <span>Medizone</span>
                    </div>

                    <p className="w-full md:w-2/3 text-gray-600 leading-6">Medizone is dedicated to providing accessible, reliable, and compassionate healthcare. Our platform connects patients with trusted doctors, making healthcare convenient and personalized for every individual. We strive to support your health journey with expert advice, easy communication, and comprehensive care. Join Medizone today and take the first step towards better health.</p>
                </div>


                {/* center section */}
                <div>
                    <p className="text-xl font-medium mb-5">COMPANY</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>
                            <Link to="/job-openings" className="hover:text-primary" onClick={() => scrollTo(0, 0)}>
                                Careers
                            </Link>
                        </li>
                        <li>
                            <Link to="/" className="hover:text-primary" onClick={() => scrollTo(0, 0)}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-primary" onClick={() => scrollTo(0, 0)}>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" className="hover:text-primary" onClick={() => scrollTo(0, 0)}>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="/privacy-policy" className="hover:text-primary" onClick={() => scrollTo(0, 0)}>
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link to="/terms-and-conditions" className="hover:text-primary" onClick={() => scrollTo(0, 0)}>
                                Term and Conditions
                            </Link>
                        </li>
                    </ul>
                </div>


                {/* right section */}
                <div>
                    <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>+254 713782003</li>
                        <li>kisinjaelvis@gmail.com</li>
                    </ul>
                </div>

            </div>

            <div >
                <hr />
                <p className="py-5 text-xs text-center">&copy; Copyright {year} Medizone - All Rights Preserved.</p>
            </div>
        </div>
    )
}

export default Footer
