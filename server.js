const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');


dotenv.config();

connectDB();

//rest object
const app = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/user', require('./routes/userRoute'));
app.use('/api/v1/knowledge', require('./routes/knowlegeCentreRoute'));


const PORT = process.env.PORT || 8080
app.listen(PORT, (req, res) => {
    console.log(`Server running on port ${PORT}`);
})
