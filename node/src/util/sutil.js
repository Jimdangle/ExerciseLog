
function ValidateKeys(inObj, reqKeys)
{
  if(!inObj) return false;
  console.log(`[${Object.keys(inObj)}] v.s [${reqKeys}]`);
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


module.exports = {
    ValidateKeys: ValidateKeys
}