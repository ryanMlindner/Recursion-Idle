
//how deep to template?
//how to call the value of 'chara' and then use a more complex data type to connect everything?
//TODO object definitions in HTML vs. JS

//creating and linking list of resources (linked list lol jk), refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
/*
plugins for to get T1 working:
chara
keyboards
autoclickers
macros
monitors
summons
plugins plugged in, working ish **need to test GEN 2-5 and connect buttons, only keyboards is connected up
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
    this.growth = (this.growthFactor * BigInt(this.amount));
  }
}

//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT first two numbers are base cost and cost growth, last is amount of chara generated per 1/10 sec
let $keyboards = new generatorChara(100, 1.21, "keyboardsCost", "keyboards", document.getElementById("gen1"), 1n);
let $autoclickers = new generatorChara(1000, 1.31, "autoclickersCost", "autoclickers", document.getElementById("gen2"), 10n);
let $macros = new generatorChara(10000, 1.41, "macrosCost", "macros", document.getElementById("gen3"), 100n);
let $monitors = new generatorChara(100000, 1.51, "monitorsCost", "monitors", document.getElementById("gen4"), 1000n);
let $summons = new generatorChara(1000000, 1.61, "summonsCost", "summons", document.getElementById("gen5"), 10000n);

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
//NOT IN USE YET, NO DEBUG

//3 prestige tiers & growth factors
let charaGrowth = 0n;
let ideasGrowth = 0n;
let packagingGrowth = 0n;
