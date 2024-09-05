const mongoose = require('mongoose');

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to MongoDB');  // This will be printed if connection is successful.  // If connection fails, it will print the error message.  // In production, you would want to handle this with proper error logging.  // process.exit(1) is used to exit the process with a non-zero status code, which in turn can be used to indicate failure.  // This is a basic error handling for demonstration purposes.  // In a real-world
    }
    catch(error){
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;