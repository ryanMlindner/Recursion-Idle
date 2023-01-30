import updateServerMessage from "./updateServerMessage.js";
import checkUsername from "./ioSafety.js";
export default
function loadFile(userName) {
    let serverMessage = 'no response';
    let safeInput = checkUsername(userName);
    if (safeInput) {
      fetch('/dbLoad', {
        method: "POST",
        body: JSON.stringify(userName),
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => response.json()
      )
      .then((data) => { 
        if (data != 'savefile not found') {
            serverMessage = 'file found';
            updateServerMessage(serverMessage);
            return data;
        }
        else {
            serverMessage = data;
            updateServerMessage(serverMessage);
            return data;
        }
      })
    }
  }