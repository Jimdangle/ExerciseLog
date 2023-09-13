//External
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Internal
const User = require('../models/mUsers'); // user schema
const Config = require('../config/cfLogin');


// Given a request create a new user 
async function HandleSignup(req,res,next)
{
    //Should be gauranteed to have keys at this point
    var email = res.locals.bodyData.email;
    var pass  = res.locals.bodyData.pass;
    var user  = (res.locals.bodyData.user) ? res.locals.bodyData.user : "";

    const hashPass = await bcrypt.hash(pass, 10);//Hash the user password before we store it
    console.log(`${pass} to ${hashPass}`);

    try{
        var newUser = new User({email:email,password:hashPass,username:user});//Generate a new User based on the User Schema
        
        await newUser.save(); // save it to our db

        res.send("New User Created");
    }
    catch(e){
        res.send(e.message);
    }
}

//Validate credentials to sign a user in
async function HandleLogin(req,res,next){
    var {email, pass} = res.locals.bodyData;
    try{
        const user = await User.findOne({email:email}); // search for our user
        if(user){
            const comp = await bcrypt.compare(pass,user.password);
            if(comp){
                console.log(user);
                try{
                    var token = jwt.sign({id:user._id},Config.jwtSecret);
                    res.send(JSON.stringify({access_token:token}));
                }
                catch(e){
                    next(e.message);
                }

            }
            else{
                res.send("Passwords not a match");
            }
        }
        else{
            res.send("There is no user with that email");
        }
    }
    catch(e)
    {
        res.status(401).send(e.message);
    }
}

//Admin func to check for db persistance and such
async function GetAllUsers(req,res,next){
    const users = await User.find({});
    console.log(users);
    res.send(JSON.stringify(users));

}


module.exports = {HandleSignup: HandleSignup, GetAllUsers: GetAllUsers, HandleLogin: HandleLogin}