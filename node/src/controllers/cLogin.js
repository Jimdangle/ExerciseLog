//External
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Internal
const User = require('../models/mUsers'); // user schema
const Config = require('../config/cfLogin');


/**
 * Sign up a user based on the following keys
 * @key email:string pass:string user:string(optional)
 * Sends a response {created:true} if a user is added
 * Sends {created:false, message:"error message"} when unsucessful
 */
async function HandleSignup(req,res,next)
{
    //Should be gauranteed to have keys at this point
    var email = res.locals.bodyData.email;
    var pass  = res.locals.bodyData.pass;
    var user  = (res.locals.bodyData.user) ? res.locals.bodyData.user : "";
    if(pass.length < 10){return next({message:"too short of password",code:400})}
    if(email.indexOf('@')===-1){next({message:"bad email format",code:400})}
    
    

    try{
        var newUser = await MakeNewUser(email,pass,user)
        if(newUser instanceof Error){throw newUser}
      

        var token = jwt.sign({id:newUser._id},Config.jwtSecret);

        return res.send({"created": true, 'access_token': token});
    }
    catch(e){
        console.log(e)
        if(e.code == 11000){ next({message:'Email exists',code:409}); }
        else{
            return next({message:e.message,code:500});
        }
    }
}

async function MakeNewUser(email,pass,user){
    const hashPass = await bcrypt.hash(pass, 10);//Hash the user password before we store it
    

    try{
        var newUser = new User({email:email,password:hashPass,username:user});//Generate a new User based on the User Schema
        
        await newUser.save(); // save it to our db
        return newUser;
    }
    catch(e){
        console.log(e)
        return e
    }
}

/**
 * Log a user in based on passed parameters
 * @keys : email:string pass:string
 * 
 * sends {access_token:token} on login to be used in further requests for authentication
 * sends {message: error} when failed
 */
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
                    return res.send({access_token:token});
                }
                catch(e){
                    return next({message:e.message,code:500});
                }

            }
            else{
               
                return next({message:"Passwords not a match",code:403});
            }
        }
        else{
            
            return next({message:"There is no user with that email",code:404});
        }
    }
    catch(e)
    {
        return next({message:e.message,code:500});
    }
}

/**
 * Get All the users from mongo
 */
async function GetAllUsers(req,res,next){
    const users = await User.find({});
    console.log(users);
    return res.send(JSON.stringify(users));

}

/**
 * Delete a authenticated user based on their token
 */
async function DeleteUser(req,res,next){
    const user = res.locals.user;
    try{
        const deleteUser = await User.deleteOne({_id:user});
        return res.send({deleted:true, count:deleteUser});
    }
    catch(e){
        return next({message:e.message,code:500});
    }

}


module.exports = {HandleSignup: HandleSignup, GetAllUsers: GetAllUsers, HandleLogin: HandleLogin, DeleteUser:DeleteUser,MakeNewUser}