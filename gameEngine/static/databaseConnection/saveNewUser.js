import updateServerMessage from "./updateServerMessage.js";
import checkUsername from "./iosafety.js";
export default
    function saveNewUser(bundledSave, userName) {
    let serverMessage = 'no response';
    let safeInput = checkUsername(userName);
    if (safeInput) {
        fetch('/dbSave', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: bundledSave,
        })
            .then((response) => response.json())
            .then((data) => {
                serverMessage = 'server response: ' + data;
                updateServerMessage(serverMessage);
            })
    }
}