const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/mUsers'); // user schema

// Given a request create a new user 
async function HandleSignup(req,res,next)
{
    //Should be gauranteed to have keys at this point
    var email = res.locals.bodyData.email;
    var pass  = res.locals.bodyData.pass;
    var user  = (res.locals.bodyData.user) ? res.locals.bodyData.user : "";

    var newUser = new User({email:email,password:pass,username:user});
    
    await newUser.save();

    res.send("New User Created");
}

async function GetAllUsers(req,res,next){
    const users = await User.find({});
    console.log(users);
    res.send(JSON.stringify(users));

}


module.exports = {HandleSignup: HandleSignup, GetAllUsers: GetAllUsers}