import formatOutput from "/formatOutput.js";
export default
class upgrade {
    constructor(name, currencyBuy, cost, effectStrength, effectTarget, button, costDisplay) {
      this.name = name;
      this.currencyBuy = currencyBuy;
      this.cost = cost;
      this.effectStrength = effectStrength;
      this.effectTarget = effectTarget;
      this.button = button;
      this.on = false;
      this.show = cost / 2;
      this.costDisplay = costDisplay;

      this.costDisplay.innerHTML = formatOutput(this.cost);
    }
    turnOn() {
      this.on = true;
      this.updateMulti();
      this.effectTarget.updateGrowth();
      this.button.style.backgroundColor = "green";
    }
    updateMulti() {
      if(this.effectStrength.amount == 0) {this.effectTarget.upgradeMulti = 1;}
      else this.effectTarget.upgradeMulti = this.effectStrength.amount;
      this.effectTarget.updateGrowth();
    }
    prestigeClean() {
      this.on = false;
      this.updateMulti();
      this.effectTarget.updateGrowth();
      this.button.style.backgroundColor = "#111";
    }
  }
