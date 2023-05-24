const express = require('express');
require('./config/database').connect_to_DB();
const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config', '.env')});

const router = require('./routes/route');

const app = express();

app.use(express.json());

app.use('/api', router);

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server started on port 3000...");
});