import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import { v2 as cloudinary } from 'cloudinary';
import Appointment from '../models/Appointment.js';
import Doctor from '../models/Doctor.js';
import razorpay from 'razorpay';

// genetare token
const generateToken = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET);

    return token;
};

// api to register user
const register = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required to create an acoount!!", success: false });
    }

    try {
        // check if user exists
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists. Please Login !!", success: false });
        }

        // check email and password validity
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email!", success: false });
        };

        if (password.length < 8) {
            return res.status(400).json({ message: "Password cannot be less than 8 characters!", success: false });
        }

        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Please enter a strong password!", success: false });
        };

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // save the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = generateToken({ id: newUser._id });

        res.json({ message: "Register Successful", success: true, token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userExists = await User.findOne({ email: email });
        if (!userExists) {
            return res.status(400).json({ message: "User does not exist !!", success: false });
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, userExists.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials !!", success: false });
        }

        const token = generateToken({ id: userExists._id });

        res.json({ message: `Welcome back, ${userExists.name}`, success: true, token });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// get user's profile data
const getUserProfile = async (req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId).select("-password");

        res.json({
            success: true,
            user,
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// update user's profile
const updateUserProfile = async (req, res) => {
    const userId = req.user;

    const { name, phone, address, dob, gender } = req.body;

    try {

        const image = req.file ? req.file.path : null;

        const updatedData = {
            name,
            phone,
            address: JSON.parse(address),
            dob,
            gender,
        };
        if (image) {

            // cloudinary image upload
            const imageUpload = await cloudinary.uploader.upload(image, { resource_type: "image" });
            const imgUrl = imageUpload.secure_url;

            updatedData.image = imgUrl;
        };

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
        if (!user) {
            return res.status(404).json({ message: "User not found", success: false });
        }

        res.json({
            success: true,
            user,
            message: "Profile updated successfully",
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// book appointment
const bookAppointment = async (req, res) => {
    const userId = req.user;

    try {
        const { docId, slotDate, slotTime } = req.body;

        const docData = await Doctor.findById(docId).select("-password");
        if (!docData.available) {
            return res.status(400).json({ message: `${docData.name} is not available`, success: false });
        }

        let slotsBooked = docData.slotsBooked;

        // checking for available slots
        if (slotsBooked[slotDate]) {
            if (slotsBooked[slotDate].includes(slotTime)) {
                return res.status(400).json({ message: "Slot not available", success: false });
            } else {
                slotsBooked[slotDate].push(slotTime);

            }
        } else {
            slotsBooked[slotDate] = [slotTime];
            slotsBooked[slotDate].push(slotTime);
        }

        const userData = await User.findById(userId).select("-password");
        delete docData.slotsBooked;

        const appointmentData = {
            userId,
            docId,
            slotDate,
            slotTime,
            userData,
            docData,
            amount: docData.fees,
        };

        const appointment = new Appointment(appointmentData);

        await appointment.save();

        await Doctor.findByIdAndUpdate(docId, { slotsBooked }, { new: true });

        res.json({
            success: true,
            message: "Appointment booked successfully",
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// get all user appointments
const getMyAppointments = async (req, res) => {
    const userId = req.user;
    try {
        const appointments = await Appointment.find({ userId: userId })
            .sort({ createdAt: -1 })
            .populate("docId")
            .populate("userId");

        res.json({
            success: true,
            appointments,
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message, success: false });
    }
};

// cancel appointment
const cancelAppointment = async (req, res) => {
    const userId = req.user;
    const { appointmentId } = req.body;

    try {
        const appointment = await Appointment.findById(appointmentId);
        if (appointment.userId !== userId) {
            return res.status(400).json({ message: "Unauthorized action!!", success: false });
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

export {
    register,
    login,
    getUserProfile,
    updateUserProfile,
    bookAppointment,
    getMyAppointments,
    cancelAppointment,
};