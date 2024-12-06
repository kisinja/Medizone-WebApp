import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import connectCloudinary from './config/cloudinary.js';
import bodyParser from 'body-parser';

// Db import
import connectDB from './config/db.js';

// app config
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors({
    origins: ["https://medizoneclient.onrender.com", "http://localhost:5001", "http://localhost:5000"],
}));
app.use(morgan('common'));
app.use(bodyParser.json());

import adminRouter from './routes/admin.js';
import doctorRouter from './routes/doctor.js';
import userRouter from './routes/user.js';
import mpesaRouter from './routes/mpesa.js';

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/mpesa', mpesaRouter);

// db config
connectDB();

// routes
app.get('/', (req, res) => {
    res.status(200).send('API WORKING !!');
});

// connect to cloudinary
connectCloudinary();

// listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});