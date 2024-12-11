import { Navigate, Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Doctors from "./pages/Doctors"
import MyAppointments from "./pages/MyAppointments"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Appointment from "./pages/Appointment"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivacyPolicy from "./pages/PrivacyPolicy"
import TermsAndConditions from "./pages/TermsAndConditions"
import JobOpenings from "./pages/JobOpenings"
import { useContext } from "react"
import { AppContext } from "./context/AppContext";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";

const App = () => {

  const { token } = useContext(AppContext);

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors/:speciality" element={token ? <Doctors /> : <Navigate to="/login" />} />
        <Route path="/doctors/" element={token ? <Doctors /> : <Navigate to="/login" />} />
        <Route path="/blogs" element={token ? <Blogs /> : <Navigate to="/login" />} />
        <Route path="/blogs/:id" element={token ? <BlogDetails /> : <Navigate to="/login" />} />
        <Route path="/my-profile" element={token ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/my-appointments" element={token ? <MyAppointments /> : <Navigate to="/login" />} />
        <Route path="/appointment/:docId" element={token ? <Appointment /> : <Navigate to="/login" />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/job-openings" element={<JobOpenings />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
