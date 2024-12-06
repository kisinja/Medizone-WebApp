import { NavLink } from "react-router-dom"

const SidebarLink = ({ children,link, isActive }) => {
    return (
        <NavLink to={`/admin-dashboard`} className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`}>
            {children}
        </NavLink>
    );
};

export default SidebarLink;