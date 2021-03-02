require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require('./routes/api');

app.use('/api', api);

app.listen(PORT, function () {
    console.log('API app started');
});

mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Database connection successful')
}).catch(err => {
    console.error(`Database connection error. ${err.message}`)
});
