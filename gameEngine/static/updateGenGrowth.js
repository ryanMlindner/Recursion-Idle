import formatOutput from "./formatOutput.js";
export default
function updateGenGrowth(target) {
    target.growth = (target.growthFactor * 
        target.amount * target.upgradeMulti * target.prestigeMulti);
    document.getElementById(target.growthDisplay).innerHTML = 
    formatOutput(target.growth * 10);
}