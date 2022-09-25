
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
//LOADING SCRIPT
onload:(openGenTab('charaGen'));
onload:(openSuperTab('game'));

//container to keep track of game progress
itemsToDraw = new Array();
/*
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

//functions to control tabs
function openSuperTab(tab) {
  var index;
  var tabNames = document.getElementsByClassName("supers");
  for (index = 0; index < tabNames.length; index++) {
    tabNames[index].style.display = "none";
  }
  document.getElementById(tab).style.display = "block";
}
function openGenTab(tab) {
  var index;
  var tabNames = document.getElementsByClassName("generators");
  for (index = 0; index < tabNames.length; index++) {
    tabNames[index].style.display = "none";
  }
  document.getElementById(tab).style.display = "block";
}

//generic upgrade class
//TODO modularize for relation to other numbers rather than just x2
class upgrade {
  constructor(name, cost, effectStrength, effectTarget, button) {
    this.name = name;
    this.cost = cost;
    this.effectStrength = effectStrength;
    this.effectTarget = effectTarget;
    this.button = button;
    this.on = false;
    this.show = cost / 2;
    itemsToDraw.push(this);
  }
  turnOn() {
    this.on = true;
    this.effectTarget.upgradeMulti = this.effectTarget.upgradeMulti * this.effectStrength;
    this.effectTarget.updateGrowth();
    this.button.style.backgroundColor = "green";
  }
}

//class for generators to keep track of cost, costgrowth, and change in chara growth
class generatorChara {
  constructor(basecost, costgrowth, costRef, name, button, growthFactor, growthDisplay, descriptor) {
  this.basecost = basecost;
  this.costgrowth = costgrowth;
  this.costRef = costRef;
  this.name = name;
  this.button = button;
  this.growthFactor = growthFactor;
  this.growth = 0n;
  this.amount = 0;
  this.growthDisplay = growthDisplay;
  this.upgradeMulti = 1n;
  this.show = basecost / 2;
  this.descriptor = document.getElementById(descriptor);
  itemsToDraw.push(this);

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
    this.growth = (this.growthFactor * BigInt(this.amount) * this.upgradeMulti);
    document.getElementById(this.growthDisplay).innerHTML = this.growth*10n;
  }
}


//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT first two numbers are base cost and cost growth, second to last is amount of chara generated per 1/10 sec
let $keyboards = new generatorChara(100, 1.21, "keyboardsCost", "keyboards", document.getElementById("gen1"), 1n, "keyboardsGen", "descriptor1");
let $autoclickers = new generatorChara(2000, 1.31, "autoclickersCost", "autoclickers", document.getElementById("gen2"), 10n, "autoclickersGen", "descriptor2");
let $macros = new generatorChara(40000, 1.41, "macrosCost", "macros", document.getElementById("gen3"), 100n, "macrosGen", "descriptor3");
let $monitors = new generatorChara(800000, 1.51, "monitorsCost", "monitors", document.getElementById("gen4"), 1000n, "monitorsGen", "descriptor4");
let $summons = new generatorChara(16000000, 1.61, "summonsCost", "summons", document.getElementById("gen5"), 10000n, "summonsGen", "descriptor5");

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

//upgrade layer one iteration one
let $gen11Upgrade = new upgrade("upgradeGenOne1", 4000, 2n, $keyboards, document.getElementById("upgradeGenOne1"));
let $gen21Upgrade = new upgrade("upgradeGenTwo1", 40000, 2n, $autoclickers, document.getElementById("upgradeGenTwo1"));
let $gen31Upgrade = new upgrade("upgradeGenThree1", 400000, 2n, $macros, document.getElementById("upgradeGenThree1"));
let $gen41Upgrade = new upgrade("upgradeGenFour1", 4000000, 2n, $monitors, document.getElementById("upgradeGenFour1"));
let $gen51Upgrade = new upgrade("upgradeGenFive1", 40000000, 2n, $summons, document.getElementById("upgradeGenFive1"));

//button activation for upgrades
$gen11Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen11Upgrade));
$gen21Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen21Upgrade));
$gen31Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen31Upgrade));
$gen41Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen41Upgrade));
$gen51Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen51Upgrade));

function turnUpgradeOn(upgradeID) {
  if ($chara >= this.cost && this.on == false) {
    $chara = $chara - BigInt(this.cost);
    this.turnOn();
  }
}

//IMPORTANT FUNCTION for guiding gameplay
function checkUnlocks(charactersMax) {

  itemsToDraw.forEach(checkToDraw);
  
  function checkToDraw(object) {
    if (charactersMax >= BigInt(object.show)) {
      object.button.style.visibility = "visible";
      if (object.descriptor) {object.descriptor.style.visibility = "visible";}
    }
  }
  //special cases / tutorial
  if (charactersMax > 100n)  {
    document.getElementById("greet").innerHTML = "wow wasn't that fun. press more? find upgrades?"
  }
  if (charactersMax > 10000n) {
    document.getElementById("title").style.visibility = "visible";
    document.getElementById("greet").innerHTML = "good job pressing button, keep going";
  }
}
//use explicit type definitions to enforce addition instead of concatenation due to JS automatic typing
let $chara = BigInt(document.getElementById("charaTotal").innerHTML);
let $backgroundTotalChara = $chara;
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
    let growingDisplay = Number(this.growth*10n);
    if (growingDisplay >= 10000) {
      growingDisplay = growingDisplay.toExponential(2);
    }
    document.getElementById(this.growthDisplay).innerHTML = growingDisplay;
    document.getElementById(this.costRef).innerHTML = output;
  }
}

setInterval(charaGrow, 100);
function charaGrow(){
  $charaGrowth = $keyboards.growth + $autoclickers.growth + $macros.growth + $monitors.growth + $summons.growth;

  //backgroundtotal is used for unlocks, so that buying upgrades/generators doesn't hinder progress in a meaningful way cause that feels bad as a game
  $backgroundTotalChara = $backgroundTotalChara + $charaGrowth;
  checkUnlocks($backgroundTotalChara);

  //keep track of spendable money
  $chara = $chara + $charaGrowth;
  let output = Number($chara);
  if (output > 10000) {
    output = output.toExponential(2);
  }
  document.getElementById("charaTotal").innerHTML = output;
}

/*NOT IN USE YET, NO DEBUG

//3 prestige tiers & growth factors
let charaGrowth = 0n;
let ideasGrowth = 0n;
let packagingGrowth = 0n;
*/
