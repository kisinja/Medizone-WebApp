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
const corsOptions = {
    origin: [
        "https://medizoneclient.onrender.com",
        "http://localhost:5001",
        "http://localhost:5000",
        "https://medizoneadmin.onrender.com"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(bodyParser.json());

import adminRouter from './routes/admin.js';
import doctorRouter from './routes/doctor.js';
import userRouter from './routes/user.js';
import mpesaRouter from './routes/mpesa.js';
import blogRouter from './routes/blogs.js';
import commentsRouter from './routes/comments.js';

// api endpoints
app.use('/api/admin', adminRouter);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);
app.use('/api/mpesa', mpesaRouter);
app.use('/api/blogs', blogRouter);
app.use('/api/comments', commentsRouter);

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