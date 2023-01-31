import formatOutput from "/formatOutput.js";
export default
//prestige resetter, update next prestige layer and reset current
function prestige(this) {
    //currency
    if (this.backgroundTotal) {
      if (this.prestigeAmount !== 0) {
        this.prestigethis.value = this.prestigethis.value + this.prestigeAmount;
        this.value = 100;
        this.growth = 0;
        this.backgroundTotal = 100;
        this.prestigeAmount = 0;
        document.getElementById(this.prestigeButtonID).style.visibility = "hidden";
      }
    }
    //generator
    else if (this.currencyGen) {
      this.amount = 0;
      this.growth = 0;
      this.upgradeMulti = 1;
      document.getElementById(this.costRef).innerHTML = formatOutput(this.basecost);
      document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth * 10);
      document.getElementById(this.name).innerHTML = formatOutput(this.amount);
    }
    //upgrade
    else if (this.effectStrength) {
    this.on = false;
    this.updateMulti();
    this.effectthis.updateGrowth();
    document.getElementById(this.buttonID).style.backgroundColor = "#111";
    }
  }