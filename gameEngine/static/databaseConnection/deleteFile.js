import updateServerMessage from "./updateServerMessage.js";
import checkUsername from "./ioSafety.js";
export default
    function deleteFile(userName) {
    let serverMessage = 'no response';
    let safeInput = checkUsername(userName);
    if (safeInput) {
        fetch('/dbSave', {
            method: "DELETE",
            body: JSON.stringify(userName),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((data) => {
                serverMessage = 'server response: ' + data;
                updateServerMessage(serverMessage);
            })
    }
}