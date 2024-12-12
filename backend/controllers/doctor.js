import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Appointment from '../models/Appointment.js';

// update doctor's availability
const changeAvailability = async (req, res) => {
    const { docId } = req.body;

    try {
        const doctor = await Doctor.findById(docId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        // Toggle the availability status
        const updatedDoctor = await Doctor.findByIdAndUpdate(
            docId,
            { available: !doctor.available },
            { new: true }  // This option returns the updated document
        );

        let message = updatedDoctor.available ? `${updatedDoctor.name} is now available` : `${updatedDoctor.name} is now unavailable`;

        res.json({ success: true, message: message });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// get all doctors data
const getDoctorsData = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).sort({ createdAt: -1 }).select('-password, -email');
        res.json({ success: true, doctors }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// doctor's login
const doctorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctorExists = await Doctor.findOne({ email });
        if (!doctorExists) {
            return res.status(404).json({ success: false, message: "Doctor not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, doctorExists.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({
            id: doctorExists._id,
        }, process.env.JWT_SECRET);

        res.json({ success: true, doctor: doctorExists, token, message: `Welcome back, ${doctorExists.name}` }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// getting doctor's appointments
const getMyAppointments = async (req, res) => {
    const docId = req.docId;

    try {
        const appointments = await Appointment.find({ docId })
            .sort({ createdAt: -1 });
        res.json({ success: true, appointments }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

export {
    changeAvailability,
    getDoctorsData,
    doctorLogin,
    getMyAppointments
};