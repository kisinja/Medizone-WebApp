import express from 'express';

const router = express.Router();

import { getDoctorsData } from '../controllers/doctor.js';

router.get('/list', getDoctorsData);

export default router;