import express from 'express';
import upload from '../middleware/multer.js';

const router = express.Router();

import { register, login, getUserProfile, updateUserProfile, bookAppointment, getMyAppointments, cancelAppointment } from '../controllers/user.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';

router.post('/register', register);
router.post('/login', login);

router.get('/profile', authUser, getUserProfile);
router.put('/profile/update', upload.single('image'), authUser, updateUserProfile);
router.post('/book-appointment', authUser, bookAppointment);
router.get('/my-appointments', authUser, getMyAppointments);
router.post('/cancel-appointment', authUser, cancelAppointment);

export default router;