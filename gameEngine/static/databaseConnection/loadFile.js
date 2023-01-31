import updateServerMessage from "./updateServerMessage.js";
import checkUsername from "./ioSafety.js";
export default
function loadFile(userName, saveContainer) {
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
        if (data !== 'savefile not found') {
            serverMessage = 'file found';
            updateServerMessage(serverMessage);
            sendToContainer(data);
        }
        else {
            serverMessage = data;
            updateServerMessage(serverMessage);
        }
      })
    }
    function sendToContainer(saveFile) {
      saveContainer.data = saveFile;
      saveContainer.hasFile = true;
    }
  }