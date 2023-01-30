import updateServerMessage from "./updateServerMessage.js";
import checkUsername from "./iosafety.js";
export default
    function saveExistingUser(bundledSave, userName) {
    let serverMessage = 'no response';
    let safeInput = checkUsername(userName);
    if (safeInput) {
        fetch('/dbSave', {
            method: 'PUT',
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