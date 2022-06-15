import express = require('express');
require('dotenv').config({path:'.env'});
require('./config/db');
import cors from 'cors';


const app = express();


app.use(cors());

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}`));

