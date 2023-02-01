import updateGenGrowth from "./updateGenGrowth.js";
import updateMulti from "./updateMulti.js";
//TODO refactor save data map to remove self references
export default
function turnOn(target, targetCurrency, multiplier, genTarget) {
  if (targetCurrency.value >= target.cost && target.on == false) {
    targetCurrency.value = targetCurrency.value - target.cost;
    updateMulti(multiplier, genTarget);
    updateGenGrowth(genTarget);
    target.on = true;
    document.getElementById(target.buttonID).style.backgroundColor = "green";
  }
}