const mongoose = require('mongoose');
const bcrypt = require ('bcryptjs');
const {isEmail} = require('validator');

const userModel = new mongoose.Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        lowercase : true,
        validate : [isEmail, 'Please Enter a valid email address']
    },
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    }, 
    password: { 
        type: String, 
        required: true,
        minLength: [6 , 'Password must be greater than 6 Characters']
    },
}); 
 
  

module.exports = mongoose.model ('todoUser', userModel);