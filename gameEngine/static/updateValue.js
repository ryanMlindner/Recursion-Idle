import formatOutput from "./formatOutput.js";
export default
function updateValue(target) {
    target.value = target.value + target.growth;
    target.backgroundTotal = target.backgroundTotal + target.growth;
    document.getElementById(target.refHTML).innerHTML = formatOutput(target.value);
  }