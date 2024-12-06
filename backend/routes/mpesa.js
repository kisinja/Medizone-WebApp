import express from 'express';
import { generateAccessToken, lipaNaMpesa, mpesaCallback } from '../controllers/mpesa.js';

const router = express.Router();

router.get('/access-token', generateAccessToken);
router.post('/stk-push', lipaNaMpesa);
router.post('/callback', mpesaCallback);

export default router;