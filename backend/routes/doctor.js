import express from 'express';

const router = express.Router();

import { getDoctorsData, doctorLogin, getMyAppointments } from '../controllers/doctor.js';
import authDoctor from '../middleware/authDoctor.js';

router.get('/list', getDoctorsData);
router.post('/login', doctorLogin);
router.get('/my-appointments', authDoctor, getMyAppointments);

export default router;