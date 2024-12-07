import Doctor from '../models/Doctor.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';
import jwt from 'jsonwebtoken';
import Appointment from '../models/Appointment.js';

// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const image = req.file;

        /* Check for all data */
        /* if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !image) {
            return res.status(400).json({ error: 'All fields are required' });
        } */

        /* Check for existing doctor */
        const doctorExist = await Doctor.findOne({ email });
        if (doctorExist) {
            return res.status(400).json({ message: 'Doctor already exists', success: false });
        }

        /* email validator */
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Please enter a valid email', success: false });
        }

        /* password validator */
        if (password.length < 8) {
            return res.status(400).json({ error: 'Please enter a strong password', success: false });
        }

        /* hash password */
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        /* upload image to cloudinary */
        const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: "image" });
        const imgUrl = imageUpload.secure_url;

        /* Save doctor */
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            image: imgUrl
        });

        await doctor.save();

        res.status(201).json({ message: 'Doctor added successfully', success: true });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// API for admin login
const loginAdmin = async (req, res) => {
    try {

        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);

            res.json({ success: true, token });
        } else {
            res.json({ message: 'Invalid admin credentials', success: false });
        }

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// all doctors list
const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).sort({ createdAt: -1 }).select('-password');
        res.json({ success: true, doctors }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

// get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await Appointment.find({})
            .sort({ createdAt: -1 })
            .populate('docId')
            .populate('userId');

        res.json({ success: true, appointments }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

const cancelAppointment = async (req, res) => {
    const { appointmentId } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (!appointment) {
            return res.status(400).json({ message: "Appointment not found!!", success: false });
        } else if (appointment.cancelled) {
            return res.status(400).json({ message: "Appointment already cancelled!!", success: false });
        }

        await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

        // remove appointment from doctor's slotsBooked
        const { docId, slotDate, slotTime } = appointment;
        const docData = await Doctor.findById(docId);

        let slotsBooked = docData.slotsBooked;

        slotsBooked[slotDate] = slotsBooked[slotDate].filter(e => e !== slotTime);

        await Doctor.findByIdAndUpdate(docId, { slotsBooked });

        res.json({
            success: true,
            message: "Appointment cancelled successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, success: false });
    }
};

export { addDoctor, loginAdmin, getAllDoctors, appointmentsAdmin, cancelAppointment };