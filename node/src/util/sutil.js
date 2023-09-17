const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/cfLogin');

//Validate that all keys present in reqKeys are present within inObj
//inObj can have more than just the required keys and this will return true
//Only returns false if any keys in reqKeys are not found within inObj
function ValidateKeys(inObj, reqKeys)
{
  if(!inObj) return false;
  //console.log(`[${Object.keys(inObj)}] v.s [${reqKeys}]`);
  for(k in reqKeys){
    if(inObj.hasOwnProperty(reqKeys[k])){
      continue
    }
    else{
      return false;
    }
  }

  return true;
}


function Verify (inObj, reqKeys, next)
{
  if(ValidateKeys(inObj, reqKeys) || reqKeys == true)
  {
    next() 
  }
  else {
    next('missing required keys')
  }

}

function ValidateToken(req, res, next) {
  console.log(req.headers);
  const token = req.headers['authorization'];
  
  if(!token) {
    return res.send('no token recieved');
  }
  // should have token here , time to verify
  jwt.verify(token, jwtSecret, (err, user) => {
    if(err) {
      return res.send('this token is no longer valid')
    }
    // by now the token is valid and we can attatch the user to the request
    res.locals.user = user.id; //  moved this to be added into the response object, unsure if we are allowed to add to the request object at this stage
    //console.log(json.stringify(user));
    console.log(user);
    next()
  })
}



module.exports = {
    Verify: Verify,
    ValidateToken: ValidateToken,
}