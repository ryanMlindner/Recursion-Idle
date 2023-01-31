import updateGenGrowth from "./updateGenGrowth.js";
import updateGenUI from "./updateGenUI.js";
import realcost from "./realCost.js";
export default
    function buyOneGenerator() {
    if (this.currencyBuy.value >= realcost(this)) {
        this.currencyBuy.value = this.currencyBuy.value - realcost(this);
        this.amount++;
        updateGenGrowth(this);
        updateGenUI(this);
    }
}
