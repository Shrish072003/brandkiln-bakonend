const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerController = async(req,res) =>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email});
        if(existingUser) return res.status(200).json({msg: 'Email already exists'});
        const password = req.body.password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({msg: 'User registered successfully'});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



const loginController = async(req, res) =>{
    try{
        const user = await userModel.findOne({email: req.body.email});
        if(!user) return res.status(400).json({msg: 'User not found'});
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) return res.status(400).json({msg: 'Invalid credentials'});
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '1d'})
        res.json({msg: 'Login successful',success: true,token});
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const getUserData = async(req,res) =>{
    try{
        const user = await userModel.findById({_id: req.body.userId})
        if(!user) return res.status(400).json({msg: 'User not found'});
        else{
          res.status(200).send({
            success: true,
            data:{
                name: user.name,
                email: user.email
            }
          })
        }
    }
    catch(e){
        console.error(e.message);
        res.status(500).send('Server Error');
    }
}

// New controller to get all users
const getAllUsersController = async(req, res) => {
    try {
        const users = await userModel.find({});
        if (users.length === 0) return res.status(404).json({ msg: 'No users found' });
        
        res.status(200).send({
            success: true,
            data: users
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports ={
    loginController,
    registerController,
    getUserData,
    getAllUsersController
}