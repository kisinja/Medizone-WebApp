import { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import './App.css';
import BlogForm from "./pages/admin/BlogForm";
import BlogsList from "./pages/admin/BlogsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/admin/Doctor/DoctorDashboard";
import DoctorAppointment from "./pages/admin/Doctor/DoctorAppointment";
import DoctorProfile from "./pages/admin/Doctor/DoctorProfile";

const App = () => {

  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <main className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          <Route path="/publish-blog" element={<BlogForm />} />
          <Route path="/blogs" element={<BlogsList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </main>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
};

export default App;