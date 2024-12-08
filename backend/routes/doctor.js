import express from 'express';

const router = express.Router();

import { getDoctorsData, doctorLogin } from '../controllers/doctor.js';

router.get('/list', getDoctorsData);
router.post('/login', doctorLogin);

export default router;