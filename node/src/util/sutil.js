const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/cfLogin');

/**
 * Validate that the keys in reqKeys are all present inside of inObj
 * @param {*} inObj an object to look at property names
 * @param {*} reqKeys the desired property names required for the object
 * @returns {boolean} true if all keys are found in inObj, false if not all keys are found in inObj
 */
function ValidateKeys(inObj, reqKeys)
{
  if(!inObj) return false;
  //console.log(`[${Object.keys(inObj)}] v.s [${reqKeys}]`);
  for(k in reqKeys){
    if(inObj.hasOwnProperty(reqKeys[k])){
      continue
    }
    else{
      console.log(`Key ${reqKeys[k]} not found`)
      return false;
    }
  }

  return true;
}

/**
 * Wrapper call to ValidateKeys, Ensure inObj contains reqKeys, else call next with an error message
 * @param {*} inObj object you are checking keys of
 * @param {*} reqKeys desired required keys
 * @param {*} next express next call
 */
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

/**
 * JWT validation middleware, verify our JWT in requests
 */
function ValidateToken(req, res, next) {
  //console.log(req.headers);
  const token = req.headers['authorization'];
  
  if(!token) {
    return next('no token recieved');
  }
  // should have token here , time to verify
  jwt.verify(token, jwtSecret, (err, user) => {
    if(err) {
      return next('this token is no longer valid')
    }
    // by now the token is valid and we can attatch the user to the request
    console.log(user);
    res.locals.user = user.id; //  moved this to be added into the response object, unsure if we are allowed to add to the request object at this stage
    //console.log(json.stringify(user));
    //console.log(user);
    next()
  })
}



module.exports = {
    Verify: Verify,
    ValidateToken: ValidateToken,
}