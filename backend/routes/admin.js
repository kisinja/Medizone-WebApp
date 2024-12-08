import express from 'express';
import { addDoctor, loginAdmin, getAllDoctors, appointmentsAdmin, cancelAppointment, adminDashboard } from "../controllers/admin.js";
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/doctor.js';

const router = express.Router();

router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.post('/login', loginAdmin);
router.get('/all-doctors', authAdmin, getAllDoctors);
router.post('/change-availability', authAdmin, changeAvailability);
router.get('/appointments', authAdmin, appointmentsAdmin);
router.post('/cancel-appointment', authAdmin, cancelAppointment);
router.get('/dashboard', authAdmin, adminDashboard);

export default router;