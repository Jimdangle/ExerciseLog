
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

module.exports = {
    Verify: Verify
}