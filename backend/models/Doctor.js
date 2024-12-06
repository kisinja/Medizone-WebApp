import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    available: {
        type: Boolean,
        default:true
    },
    slotsBooked: {
        type: Object,
        default: {}
    }
}, { timestamps: true, minimize: false });

const Doctor = mongoose.models.doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;