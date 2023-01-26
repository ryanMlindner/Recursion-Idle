export default
class currencies {
    constructor(tier, refHTML, value, growth, unlocked, prestigeTarget, prestigeButton) {
      this.tier = tier;
      this.refHTML = refHTML;
      this.value = value;
      this.growth = growth;
      this.backgroundTotal = value;
      this.unlocked = unlocked;
      this.prestigeAmount = 0;
      this.prestigeTarget = prestigeTarget;
      this.prestigeButton = prestigeButton;
    }
    updateValue() {
      this.value = this.value + this.growth;
      if (this.backgroundTotal < this.value) {this.backgroundTotal = this.value}
      this.backgroundTotal = this.backgroundTotal + this.growth;
    }
    updatePrestige() {
      this.prestigeAmount = Math.floor(Math.sqrt(this.backgroundTotal / 1E9)) * 100;
    }
    prestige() {
      if (this.prestigeAmount != 0) {
        this.prestigeTarget.value = this.prestigeTarget.value + this.prestigeAmount;
        this.value = 100;
        this.growth = 0;
        this.backgroundTotal = 100;
        this.prestigeAmount = 0;
        this.prestigeButton.style.visibility = "hidden";
        return true;
      }
      return false;
    }
  }