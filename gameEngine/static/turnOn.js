import updateGenGrowth from "./updateGenGrowth.js";
//TODO configure like buyonegenerator
export default
function turnOn() {
  if (this.currencyBuy.value >= this.cost && this.on == false) {
    this.currencyBuy.value = this.currencyBuy.value - this.cost;
    updateMulti(this);
    updateGenGrowth(this.effectTarget);
    updateStatus(this);
  }
  function updateMulti() {
    if(this.effectStrength.amount == 0) {this.effectTarget.upgradeMulti = 1;}
    else this.effectTarget.upgradeMulti = this.effectStrength.amount;
  }
  function updateStatus(target) {
    target.on = true;
    document.getElementById(target.buttonID).style.backgroundColor = "green";
  }
}