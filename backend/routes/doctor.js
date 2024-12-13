import express from 'express';

const router = express.Router();

import { getDoctorsData, doctorLogin, getMyAppointments, cancelAppointment, completeAppointment, updateDoctorProfile, docDashboard, getDocProfile } from '../controllers/doctor.js';
import authDoctor from '../middleware/authDoctor.js';

router.get('/list', getDoctorsData);
router.post('/login', doctorLogin);
router.get('/my-appointments', authDoctor, getMyAppointments);
router.post('/cancel-appointment', authDoctor, cancelAppointment);
router.post('/complete-appointment', authDoctor, completeAppointment);
router.post('/profile/update', authDoctor, updateDoctorProfile);
router.get('/dashboard', authDoctor, docDashboard);
router.get('/profile', authDoctor, getDocProfile);

export default router;