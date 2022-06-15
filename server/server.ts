import express = require('express');
require('dotenv').config({path:'.env'});
require('./config/db');
import cors from 'cors';
const fileRoute = require('./routes/files');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}))

// routes
app.use("/api/files", fileRoute);

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));

