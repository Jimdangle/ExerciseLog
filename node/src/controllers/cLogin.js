const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const User = require('../models/mUsers'); // user schema
const Config = require('../config/cfLogin');
// Given a request create a new user 
async function HandleSignup(req,res,next)
{
    //Should be gauranteed to have keys at this point
    var email = res.locals.bodyData.email;
    var pass  = res.locals.bodyData.pass;
    var user  = (res.locals.bodyData.user) ? res.locals.bodyData.user : "";

    const hashPass = await bcrypt.hash(pass, 10);
    console.log(`${pass} to ${hashPass}`);

    var newUser = new User({email:email,password:hashPass,username:user});
    
    await newUser.save();

    res.send("New User Created");
}

async function HandleLogin(req,res,next){
    var {email, pass} = res.locals.bodyData;
}

async function GetAllUsers(req,res,next){
    const users = await User.find({});
    console.log(users);
    res.send(JSON.stringify(users));

}


module.exports = {HandleSignup: HandleSignup, GetAllUsers: GetAllUsers}