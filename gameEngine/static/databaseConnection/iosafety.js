export default
function checkUsername(userName) {
    let safeInput = false;
    let pattern = /^[A-Za-z0-9]*$/;
    let safe = pattern.test(userName); //only allows alphanumeric characters
    if (safe && userName != '') safeInput = true;
    return safeInput;
  }
  