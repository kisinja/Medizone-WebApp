import Doctor from '../models/Doctor.js';

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

const getDoctorsData = async (req, res) => {
    try {
        const doctors = await Doctor.find({}).sort({ createdAt: -1 }).select('-password, -email');
        res.json({ success: true, doctors }).status(200);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message, success: false });
    }
};

export {
    changeAvailability,
    getDoctorsData
};