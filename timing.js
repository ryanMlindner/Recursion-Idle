
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
  constructor(basecost, costgrowth, tier, button, growthFactor) {
  this.basecost = basecost;
  this.costgrowth = costgrowth;
  this.tier = tier;
  this.button = button;
  this.growthFactor = growthFactor;
  this.amount = 0;
  }
  realcost() {
    //TODO this is right?
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
}

//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT
let $keyboards = new generatorChara(100, 1.21, 1, document.getElementById("gen1"), 1n);
let $autoclickers = new generatorChara(1000n, 1.31, 2, document.getElementById("gen2"), 10n);
let $macros = new generatorChara(10000n, 1.41, 3, document.getElementById("gen3"), 100n);
let $monitors = new generatorChara(100000n, 1.51, 4, document.getElementById("gen4"), 1000n);
let $summons = new generatorChara(1000000n, 1.61, 5, document.getElementById("gen5"), 10000n);

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

$keyboards.button.addEventListener("click", buyOneGenerator);

function buyOneGenerator() {
  if ($chara >= $keyboards.realcost()) {
  $charaGrowth = $charaGrowth + $keyboards.growthFactor; //balancepoint for testing
  $chara = $chara - BigInt($keyboards.realcost());
  $keyboards.amount++;
  document.getElementById("keyboards").innerHTML = $keyboards.amount;
  document.getElementById("keyboardsCost").innerHTML = $keyboards.realcost();

  }
}

setInterval(charaGrow, 100);
function charaGrow(){
  $chara = $chara + $charaGrowth;
  document.getElementById("charaTotal").innerHTML = $chara;
}
//NOT IN USE YET, NO DEBUG

//3 prestige tiers & growth factors
let charaGrowth = 0n;
let ideasGrowth = 0n;
let packagingGrowth = 0n;
