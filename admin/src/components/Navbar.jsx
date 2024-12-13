import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);
    const { loggedInDoctor, dToken } = useContext(DoctorContext);

    const navigate = useNavigate();

    const logout = () => {


        if (aToken) {
            localStorage.removeItem('aToken');
            setAToken('');
            navigate('/');
        } else {
            localStorage.removeItem('dToken');
            localStorage.removeItem('currentDoctor');
            navigate('/');
        }
    };

    return (
        <nav className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white sticky top-0 z-50">
            <div className="font-bold text-xl flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-12 h-12 rounded-full bg-primary"></div>
                <div className="flex flex-col">
                    <span>Medizone</span>
                    <span className="text-xs text-gray-600 font-semibold tracking-wider">Dashboard Panel</span>
                </div>
            </div>

            {
                dToken || aToken ? (
                    <div className="flex gap-4 items-center">
                        {
                            dToken && (
                                <div className="flex gap-4 items-center">
                                    <img src={loggedInDoctor && loggedInDoctor.image} alt="" className="w-10 h-10 rounded-full object-cover" />

                                </div>
                            )
                        }
                        <button className="bg-blue-50 border border-primary text-sm py-2 rounded-full px-10" onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <button className="bg-primary text-white text-sm py-2 rounded-full px-10" onClick={() => navigate('/login')}>Login</button>
                )
            }
        </nav>
    );
};

export default Navbar;