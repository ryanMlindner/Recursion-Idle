
//how deep to template?
//how to call the value of 'chara' and then use a more complex data type to connect everything?
//TODO object definitions in HTML vs. JS

//creating and linking list of resources (linked list lol jk), refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
/*
plugins for to get T1 working:
TODO::
upgrades
enum of upgrades and class for upgrade objects
*/

/*
PDL for upgrade framework

for each upgrade, define connections to the growth factors it affects (default to ALL?), what it costs, when it unlocks (using .hidden?)
class upgrade {
  constructor(cost, tier, unlockCondition, button, generators, multiplier(flat or based on other changing #s))
  
  routine for determining variable multiplier() not required for every upgrade, but most?

  routine for receiving current growth factors, updating upgraded growth? 
  OR
  routine to update external(in an enum?) flags for each upgrade
  routine works on a seperated enum class of all upgrades in the game, and sets booleans for which upgrade was purchased(if affordable)
  can make everything private to the enum except COST and IF ACTIVE?
  TODO
  what about upgrades that change base values of other things in the game? time manipulation?
  goal is ONE place to define upgrades, ONE place to tweak balance numbers, and code reuseability
  }
*/

//class for generators to keep track of cost, costgrowth, and change in chara growth
class generatorChara {
  constructor(basecost, costgrowth, costRef, name, button, growthFactor) {
  this.basecost = basecost;
  this.costgrowth = costgrowth;
  this.costRef = costRef;
  this.name = name;
  this.button = button;
  this.growthFactor = growthFactor;
  this.growth = 0n;
  this.amount = 0;
  document.getElementById(costRef).innerHTML = basecost;
  }
  realcost() {
    return Math.floor((this.basecost*(Math.pow(this.costgrowth, this.amount))))
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
  //templated buy function? pass in amount that UI can change (1x, 10x, 100x, etc)?
  //TODO would have to update buttons to be able to show amount to buy, add more buttons to toggle buy amount
  totalCostBuyAmount(amount) {
    let totalCost = 0n;
    let index = this.amount;
    let goalTotal = index + amount;
    for (let i = index; i < goalTotal; i++ ) {
      totalCost = totalCost + (this.basecost*this.costgrowth*i);
    }
    return totalCost;
  }
  updateGrowth() {
    this.growth = (this.growthFactor * BigInt(this.amount));
  }
}

//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT first two numbers are base cost and cost growth, last is amount of chara generated per 1/10 sec
let $keyboards = new generatorChara(100, 1.21, "keyboardsCost", "keyboards", document.getElementById("gen1"), 1n);
let $autoclickers = new generatorChara(2000, 1.31, "autoclickersCost", "autoclickers", document.getElementById("gen2"), 10n);
let $macros = new generatorChara(40000, 1.41, "macrosCost", "macros", document.getElementById("gen3"), 100n);
let $monitors = new generatorChara(800000, 1.51, "monitorsCost", "monitors", document.getElementById("gen4"), 1000n);
let $summons = new generatorChara(16000000, 1.61, "summonsCost", "summons", document.getElementById("gen5"), 10000n);

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


//use explicit type definitions to enforce addition instead of concatenation due to JS automatic typing
let $chara = BigInt(document.getElementById("charaTotal").innerHTML);
let $charaGrowth = 0n;

$keyboards.button.addEventListener("click", buyOneGenerator.bind($keyboards));
$autoclickers.button.addEventListener("click", buyOneGenerator.bind($autoclickers));
$macros.button.addEventListener("click", buyOneGenerator.bind($macros));
$monitors.button.addEventListener("click", buyOneGenerator.bind($monitors));
$summons.button.addEventListener("click", buyOneGenerator.bind($summons));

//TODO change to accept buying any amount? toggle buttons to change amount bought and return floor amount?
//GOAL IS ABSTRACTION
function buyOneGenerator(genID) {
  if ($chara >= this.realcost()) {
    $chara = $chara - BigInt(this.realcost());
    this.amount++;
    this.updateGrowth();
    document.getElementById(this.name).innerHTML = this.amount;

    let output = this.realcost();
      if (this.realcost() > 10000) {
      output = output.toExponential(2);
      }
    document.getElementById(this.costRef).innerHTML = output;
    }
  }

setInterval(charaGrow, 100);
function charaGrow(){
  $charaGrowth = $keyboards.growth + $autoclickers.growth + $macros.growth + $monitors.growth + $summons.growth;
  $chara = $chara + $charaGrowth;
  document.getElementById("charaTotal").innerHTML = $chara;
}
/*NOT IN USE YET, NO DEBUG

//3 prestige tiers & growth factors
let charaGrowth = 0n;
let ideasGrowth = 0n;
let packagingGrowth = 0n;
*/
