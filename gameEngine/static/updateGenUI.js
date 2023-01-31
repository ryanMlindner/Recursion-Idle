import formatOutput from "./formatOutput.js";
import realcost from "./realCost.js";
export default
function updateGenUI(target) {
    document.getElementById(target.name).innerHTML = 
        formatOutput(target.amount);
    document.getElementById(target.costRef).innerHTML = 
        formatOutput(realcost(target));
    document.getElementById(target.growthDisplay).innerHTML = 
        formatOutput(target.growth * 10);
}