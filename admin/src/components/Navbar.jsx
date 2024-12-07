import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const { aToken, setAToken } = useContext(AdminContext);

    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        aToken && setAToken('');
        aToken && localStorage.removeItem('aToken');
    };

    return (
        <nav className="flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white sticky top-0">
            <div className="font-bold text-xl flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                <div className="w-12 h-12 rounded-full bg-primary"></div>
                <div className="flex flex-col">
                    <span>Medizone</span>
                    <span className="text-xs text-gray-600 font-semibold tracking-wider">Admin Panel</span>
                </div>
            </div>

            <button className="bg-primary text-white text-sm py-2 rounded-full px-10" onClick={logout}>Logout</button>
        </nav>
    );
};

export default Navbar;