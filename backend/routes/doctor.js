import express from 'express';

const router = express.Router();

import { getDoctorsData, doctorLogin, getMyAppointments, cancelAppointment, completeAppointment } from '../controllers/doctor.js';
import authDoctor from '../middleware/authDoctor.js';

router.get('/list', getDoctorsData);
router.post('/login', doctorLogin);
router.get('/my-appointments', authDoctor, getMyAppointments);
router.post('/cancel-appointment', authDoctor, cancelAppointment);
router.post('/complete-appointment', authDoctor, completeAppointment);

export default router;