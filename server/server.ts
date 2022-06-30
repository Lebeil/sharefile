import express = require('express');
require('dotenv').config({path:'.env'});
require('./config/db');
import cors from 'cors';
const fileRoute = require('./routes/files');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

// Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_API_CLOUD,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true,
})

// routes
app.use("/api/files", fileRoute);

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));

