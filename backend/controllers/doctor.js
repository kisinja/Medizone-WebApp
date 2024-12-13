import Doctor from '../models/Doctor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Appointment from '../models/Appointment.js';
import cloudinary from "cloudinary";

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

        const doctor = await Doctor.findById(doctorExists._id)
            .select('-password');

        res.json({ success: true, doctor, token, message: `Welcome back, ${doctorExists.name}` }).status(200);
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

// cancel appointment
const cancelAppointment = async (req, res) => {
    const docId = req.docId;
    try {
        const { appointmentId } = req.body;

        // Use appointmentId in findById
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (appointment.docId !== docId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

        res.json({ success: true, message: "Appointment cancelled" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// complete appointment
const completeAppointment = async (req, res) => {
    const docId = req.docId;
    try {
        const { appointmentId } = req.body;

        // Use appointmentId in findById
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (appointment.docId !== docId) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        await Appointment.findByIdAndUpdate(appointmentId, { isCompleted: true });

        res.json({ success: true, message: "Appointment completed" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// get doctor's profile
const getDocProfile = async (req, res) => {
    const docId = req.docId;
    try {
        const doctor = await Doctor.findById(docId).select('-password');
        res.json({ success: true, doctor }).status(200);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message, success: false });
    }
};

// update doctor's profile
const updateDoctorProfile = async (req, res) => {
    const docId = req.docId; // Assuming docId is retrieved from the middleware (e.g., from a JWT token).

    const { fees, address, available, phone } = req.body;

    try {

        const image = req.file ? req.file.path : null;

        const updatedData = {
            fees,
            address: JSON.parse(address),
            available,
            phone,
        };

        if (image) {
            // cloudinary image upload
            const imageUpload = await cloudinary.uploader.upload(image, { resource_type: "image" });
            const imgUrl = imageUpload.secure_url;

            updatedData.image = imgUrl;
        }

        await Doctor.findByIdAndUpdate(docId, updatedData, { new: true });

        res.json({ success: true, message: "Profile updated!" });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message, success: false });
    }
};

// get dashboard data for doctors
const docDashboard = async (req, res) => {
    const docId = req.docId;
    try {
        const appointments = await Appointment.find({ docId }).sort({ createdAt: -1 });

        // calculating the doctor's earnings
        let earnings = 0;
        appointments.map(app => {
            if (app.isCompleted || app.payment) {
                earnings += app.amount;
            }
        });

        // getting the doctor's patients
        let patients = [];
        appointments.map(app => {
            if (!patients.includes(app.userId)) {
                patients.push(app.userId);
            }
        });

        // dashboard data
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.slice(0, 5),
        };

        res.json({ dashData, success: true }).status(200);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message, success: false });
    }
};

export {
    changeAvailability,
    getDoctorsData,
    doctorLogin,
    getMyAppointments,
    completeAppointment,
    cancelAppointment,
    updateDoctorProfile,
    docDashboard,
    getDocProfile
};