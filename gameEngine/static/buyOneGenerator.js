import updateGenGrowth from "./updateGenGrowth.js";
import updateGenUI from "./updateGenUI.js";
import realcost from "./realCost.js";
export default
    function buyOneGenerator(target, targetCurrency) {
    if (targetCurrency.value >= realcost(target)) {
        targetCurrency.value = targetCurrency.value - realcost(target);
        target.amount++;
        updateGenGrowth(target);
        updateGenUI(target);
    }
}
