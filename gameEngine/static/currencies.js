//deprecated
import formatOutput from "/formatOutput.js"
export default
class currencies {
    constructor(tier, refHTML, value, growth, backgroundTotal, unlocked, prestigeAmount, prestigeTarget, prestigeButtonID) {
      this.tier = tier;
      this.refHTML = refHTML;
      this.value = value;
      this.growth = growth;
      this.backgroundTotal = backgroundTotal;
      this.unlocked = unlocked;
      this.prestigeAmount = prestigeAmount;
      this.prestigeTarget = prestigeTarget;
      this.prestigeButtonID = prestigeButtonID;
    }
    updatePrestige() {
      this.prestigeAmount = Math.floor(Math.sqrt(this.backgroundTotal / 1E9)) * 100;
    }
  }