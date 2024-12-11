import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import dropDown from '../assets/dropdown.svg';
import { LuLogOut } from "react-icons/lu";
import { assets } from '../assets/assets/assets_frontend/assets';
import { AppContext } from "../context/AppContext";
import { FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const { token, setToken, userData } = useContext(AppContext);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
        toast.info('Logged out!!');
    };

    return (
        <nav className="flex-container text-sm py-4 mb-5 border-b border-b-gray-400">
            <div className="font-bold text-xl flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-12 h-12 rounded-full bg-primary"></div>
                <span>Medizone</span>
            </div>

            <ul className="hidden md:flex items-center gap-5 font-medium">
                <NavLink to="/">
                    <li className="uppercase py-1 ">Home</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
                </NavLink>
                <NavLink to="/doctors">
                    <li className="uppercase py-1 ">All Doctors</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
                </NavLink>
                <NavLink to="/blogs">
                    <li className="uppercase py-1 ">Blog Posts</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
                </NavLink>
                <NavLink to="/about">
                    <li className="uppercase py-1 ">About</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
                </NavLink>
                <NavLink to="/contact">
                    <li className="uppercase py-1 ">Contact</li>
                    <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
                </NavLink>
            </ul>

            <div className="flex items-center gap-4">

                {
                    token && userData
                        ? <div className="flex items-center gap-2 cursor-pointer group relative">
                            <img src={userData.image} className="w-10 h-10 rounded-full object-cover" alt="" />
                            <img src={dropDown} className="w-5.5 " alt="" />

                            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                                    <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-profile")}>My Profile</p>
                                    <p className="hover:text-black cursor-pointer" onClick={() => navigate("/my-appointments")}>My Appointments</p>
                                    <p className="hover:text-black cursor-pointer" onClick={logout}>
                                        <LuLogOut className="inline-block mr-2" />
                                        Logout
                                    </p>
                                </div>
                            </div>
                        </div>
                        : <button className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block" onClick={() => navigate("/login")}>Create Account</button>
                }

                <img src={assets.menu_icon} alt="" className="w-6 md:hidden cursor-pointer" onClick={() => setShowMenu(true)} />

                {/* ---------Mobile Menu----------- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'}  md:hidden right-0 bottom-0 top-0 z-20 overflow-hidden bg-white transition-all`}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <div className="font-bold text-xl flex items-center gap-1 cursor-pointer w-36" onClick={() => navigate('/')}>
                            <div className="w-12 h-12 rounded-full bg-primary"></div>
                            <span>Medizone</span>
                        </div>
                        <img src={assets.cross_icon} className="cursor-pointer w-7" alt="" onClick={() => setShowMenu(false)} />
                    </div>
                    <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
                        <NavLink to="/" onClick={() => setShowMenu(false)}>
                            <p className="uppercase px-4 py-2 rounded inline-block">Home</p>
                        </NavLink>
                        <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
                            <p className="uppercase px-4 py-2 rounded inline-block">All Doctors</p>
                        </NavLink>
                        <NavLink to="/blogs" onClick={() => setShowMenu(false)}>
                            <li className="uppercase py-1 ">Blog Posts</li>
                            <hr className="border-none outline-none h-0.5 w-3/5 m-auto bg-primary hidden " />
                        </NavLink>
                        <NavLink to="/about" onClick={() => setShowMenu(false)}>
                            <p className="uppercase px-4 py-2 rounded inline-block">About</p>
                        </NavLink>
                        <NavLink to="/contact" onClick={() => setShowMenu(false)}>
                            <p className="uppercase px-4 py-2 rounded inline-block">Contact</p>
                        </NavLink>

                        {
                            userData ? (

                                <>
                                    <NavLink to="/my-profile" onClick={() => setShowMenu(false)}>
                                        <p className="uppercase px-4 py-2 rounded inline-block">My Profile</p>
                                    </NavLink>

                                    <div onClick={() => { setShowMenu(false); logout() }} className="text-red-600 mt-5 py-2 px-4 rounded shadow hover:shadow-lg cursor-pointer transition-all duration-200 flex items-center gap-2">
                                        <FaSignOutAlt />
                                        Logout
                                    </div>

                                </>

                            ) : (
                                <button className="bg-blue-500 text-white px-8 py-3 rounded-full font-light" onClick={() => { navigate("/login"); setShowMenu(false) }}>Sign In</button>
                            )
                        }

                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar