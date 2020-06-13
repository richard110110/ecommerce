const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const mongoose = require('mongoose');


require('dotenv').config();

//import routes
const userRoutes = require('./routes/user');



const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//db connection
mongoose.connect(
        process.env.MONGO_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    )
    .then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
});

//middwares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());


//route

app.use("/api", userRoutes);