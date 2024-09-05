const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    roles:{
        type: [String],
        default: ['user'] // Default role is 'user'
    }
})


const userModel = mongoose.model('User', userSchema);


module.exports = userModel;