import formatOutput from "/formatOutput.js";
//TODO configure like buyonegenerator
export default
function turnOn() {
  if (this.currencyBuy.value >= this.cost && this.on == false) {
    this.currencyBuy.value = this.currencyBuy.value - this.cost;
    this.on = true;
    updateMulti(this);
    updateGrowth(this.effectTarget);
    document.getElementById(this.buttonID).style.backgroundColor = "green";
  }
  function updateMulti() {
    if(this.effectStrength.amount == 0) {this.effectTarget.upgradeMulti = 1;}
    else this.effectTarget.upgradeMulti = this.effectStrength.amount;
  }
}