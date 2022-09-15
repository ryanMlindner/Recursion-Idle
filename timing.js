
//how deep to template?
//how to call the value of 'chara' and then use a more complex data type to connect everything?
//TODO object definitions in HTML vs. JS

//creating and linking list of resources (linked list lol jk), refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
//TODO get plugins set up for HTML objects -> JS objects
/*
plugins for to get T1 working:
chara
keyboards
autoclickers
macros
monitors
summons
*/

let chara = 100n;

//class for generators to keep track of cost, costgrowth, and change in chara growth
class generatorChara {
  constructor(basecost, costgrowth, tier, currency, growthFactor) {
  this.basecost = basecost;
  this.costgrowth = costgrowth;
  this.tier = tier;
  this.currency = chara;
  this.growthFactor = growthFactor;
  this.realGrowth = 0n;
  this.amount = 0;
  }
  realcost() {
    //TODO this is right?
    return (this.basecost*(Math.pow(this.costgrowth, amount)))
  }
  buyOne() {
    let bought = false;
    if (chara >= this.realcost) {
      this.amount++;
      chara = chara - this.realcost;
      bought = true;
    }
    return bought;
  }
  buyAmount(amount) {
    let bought = false;
    let totalCost = 0n;
    let index = this.amount;
    let goalTotal = index + amount;
    for (let i = index; i < goalTotal; i++ ) {
      totalCost = totalCost + (this.basecost*this.costgrowth*i);
    }
    if (chara >= totalCost) {
      this.amount = this.amount + amount;
      chara = chara - totalCost;
      bought = true;
    }
    return bought;    
  }
  updateGrowth() {
    this.realGrowth = this.growthFactor*this.amount;
  }
}

//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT
let keyboards = new generatorChara(100n, 1.21, 1, chara, 10n);
let autoclickers = new generatorChara(1000n, 1.31, 2, chara, 100n);
let macros = new generatorChara(10000n, 1.41, 3, chara, 1000n);
let monitors = new generatorChara(100000n, 1.51, 4, chara, 10000n);
let summons = new generatorChara(1000000n, 1.61, 5, chara, 100000n);

let ingenuity = 0n;
// prestige layer 2 gen
let thoughts = 0n;
let theories = 0n;
let projects = 0n;
let crowdsourcing = 0n;
let faustDeals = 0n;

let apip = 0n;
// prestige layer 3 gen, apip == api power
let dots = 0n;
let vectors = 0n;
let nodes = 0n;
let graphs = 0n;
let codeCleanliness = 0n;


//create custom class to handle connections between raw amounts and things like cost increase, base cost, real cost, etc.?
/*
class ...
*/

//NOT IN USE YET, NO DEBUG

//3 prestige tiers & growth factors
let charaGrowth = 0n;
let ideasGrowth = 0n;
let packagingGrowth = 0n;

// TODO refactor setinterval to take ANY resource as args and output the same
setInterval(resourceCounting(document.getElementById("charaTotal"), chara, charaGrowth), 1000);
function resourceCounting(resource, resourceType, resourceGrowth) {
  counter = 0n;
  counterGrowth = 0n;
  counter = resource.innerHTML;
  counterGrowth = resourceGrowth;
  counter += counterGrowth;
}
