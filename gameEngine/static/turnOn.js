import updateGenGrowth from "./updateGenGrowth.js";
//TODO refactor save data map to remove self references
export default
function turnOn(target) {
  if (target.currencyBuy.value >= target.cost && target.on == false) {
    target.currencyBuy.value = target.currencyBuy.value - target.cost;
    updateMulti(target);
    updateGenGrowth(target.effectTarget);
    updateStatus(target);
  }
  function updateMulti() {
    if(target.effectStrength.amount == 0) {target.effectTarget.upgradeMulti = 1;}
    else target.effectTarget.upgradeMulti = target.effectStrength.amount;
  }
  function updateStatus(target) {
    target.on = true;
    document.getElementById(target.buttonID).style.backgroundColor = "green";
  }
}