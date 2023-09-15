
const whitelist = "http://localhost:3000";

const corsOpts = {
    origin: function(org, cb) { 
            console.log(org);
            if(!org || whitelist == "http://localhost:3000"){
                cb(null,true);
            }else{
                cb(new Error("Cors not allowed"))
            }
        },
        credentials: true,
}

module.exports = {corsOpts: corsOpts}