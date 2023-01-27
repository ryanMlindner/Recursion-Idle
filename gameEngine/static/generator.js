import formatOutput from "/formatOutput.js";
export default
class generator {
    constructor(currencyBuy, currencyGen, nextTier, basecost, costgrowth, costRef,
        name, buttonID, growthFactor, growth, amount, growthDisplay, upgradeMulti,
        show, prestigeMulti, descriptor) {
        this.currencyBuy = currencyBuy;
        this.currencyGen = currencyGen;
        this.nextTier = nextTier;
        this.basecost = basecost;
        this.costgrowth = costgrowth;
        this.costRef = costRef;
        this.name = name;
        this.buttonID = buttonID;
        this.growthFactor = growthFactor;
        this.growth = growth;
        this.amount = amount;
        this.growthDisplay = growthDisplay;
        this.upgradeMulti = upgradeMulti;
        this.show = show;
        this.prestigeMulti = prestigeMulti;
        this.descriptor = descriptor;
        
        this.attachButton();
        this.updateGrowth();
        this.updateUI();
    }
    realcost() {
        return Math.floor((this.basecost * (Math.pow(this.costgrowth, this.amount))))
    }

    updateGrowth() {
        this.growth = (this.growthFactor * this.amount * this.upgradeMulti * this.prestigeMulti);
        document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth * 10);
    }
    updatePrestigeMulti() {
        if (this.nextTier) {
            this.prestigeMulti = Math.floor(1 + (this.nextTier.backgroundTotal / 1000))
        }
    }
    prestigeClean() {
        this.amount = 0;
        this.growth = 0;
        this.upgradeMulti = 1;
        document.getElementById(this.costRef).innerHTML = formatOutput(this.basecost);
        document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth * 10);
        document.getElementById(this.name).innerHTML = formatOutput(this.amount);
    }
    attachButton() {
    document.getElementById(this.buttonID).addEventListener(
        "click", this.buyOneGenerator.bind(this));
    }
    buyOneGenerator() {
        if (this.currencyBuy.value >= this.realcost()) {
            this.currencyBuy.value = this.currencyBuy.value - this.realcost();
            this.amount++;
            this.updateGrowth();
            this.updateUI();
        }
    }
    updateUI() {
        document.getElementById(this.name).innerHTML = formatOutput(this.amount);
        document.getElementById(this.costRef).innerHTML = formatOutput(this.realcost());
        document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth * 10);
    }
}
