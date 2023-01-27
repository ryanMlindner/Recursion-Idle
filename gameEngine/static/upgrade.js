import formatOutput from "/formatOutput.js";
export default
class upgrade {
    constructor(name, currencyBuy, cost, effectStrength, effectTarget, buttonID, on, show, costDisplay) {
      this.name = name;
      this.currencyBuy = currencyBuy;
      this.cost = cost;
      this.effectStrength = effectStrength;
      this.effectTarget = effectTarget;
      this.buttonID = buttonID;
      this.on = on;
      this.show = show;
      this.costDisplay = costDisplay;

      this.attachButton();
      document.getElementById(this.costDisplay).innerHTML = formatOutput(this.cost);
    }
    turnOn() {
      if (this.currencyBuy.value >= this.cost && this.on == false) {
        this.currencyBuy.value = this.currencyBuy.value - this.cost;
        this.on = true;
        this.updateMulti();
        this.effectTarget.updateGrowth();
        document.getElementById(this.buttonID).style.backgroundColor = "green";
      }
    }
    updateMulti() {
      if(this.effectStrength.amount == 0) {this.effectTarget.upgradeMulti = 1;}
      else this.effectTarget.upgradeMulti = this.effectStrength.amount;
      this.effectTarget.updateGrowth();
    }
    attachButton() {
      document.getElementById(this.buttonID).addEventListener(
        "click", this.turnOn.bind(this));
    }
    prestigeClean() {
      this.on = false;
      this.updateMulti();
      this.effectTarget.updateGrowth();
      document.getElementById(this.buttonID).style.backgroundColor = "#111";
    }
  }
