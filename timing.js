//creating and linking list of resources (linked list lol jk), refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML

//TODO import some form of break_infinity.js to use DECIMAL instead of BigInt and Number
/*

*/
//LOADING SCRIPT
onload:(openGenTab('charaGen'));
onload:(openSuperTab('game'));

//container to keep track of game progress
itemsToDraw = new Array();
//container to neatly call/update all upgrade effects
upgrades = new Array();

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
class upgrade {
  constructor(name, cost, effectStrength, effectTarget, button, costDisplay) {
    this.name = name;
    this.cost = cost;
    this.effectStrength = effectStrength;
    this.effectTarget = effectTarget;
    this.button = button;
    this.on = false;
    this.show = cost / 2;
    this.costDisplay = costDisplay;

    document.getElementById(costDisplay).innerHTML = formatOutput(Number(this.cost));
    itemsToDraw.push(this);
    upgrades.push(this);
  }
  turnOn() {
    this.on = true;
    this.updateMulti();
    this.effectTarget.updateGrowth();
    this.button.style.backgroundColor = "green";
  }
  updateMulti() {
    if(this.effectStrength.amount == 0) {this.effectTarget.upgradeMulti = 1;}
    else this.effectTarget.upgradeMulti = this.effectStrength.amount;
    this.effectTarget.updateGrowth();
  }
}


//class for generators to keep track of cost, costgrowth, and change in chara growth
class generatorChara {
  constructor(basecost, costgrowth, costRef, name, button, growthFactor, growthDisplay, descriptor) {
    //create object in JS, connect to references in HTML
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
    //update UI
    itemsToDraw.push(this);
    document.getElementById(costRef).innerHTML = formatOutput(Number(basecost));
  }
  realcost() {
    return Math.floor((this.basecost*(Math.pow(this.costgrowth, this.amount))))
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
    this.growth = BigInt(this.growthFactor * BigInt(this.amount) * BigInt(this.upgradeMulti));
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(Number(this.growth*10n));
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
let $gen11Upgrade = new upgrade
("upgradeGenOne1", 4000, $autoclickers, $keyboards, document.getElementById("upgradeGenOne1"), "upgradeOneCost");
let $gen21Upgrade = new upgrade
("upgradeGenTwo1", 40000, $macros, $autoclickers, document.getElementById("upgradeGenTwo1"), "upgradeTwoCost");
let $gen31Upgrade = new upgrade
("upgradeGenThree1", 400000, $monitors, $macros, document.getElementById("upgradeGenThree1"), "upgradeThreeCost");
let $gen41Upgrade = new upgrade
("upgradeGenFour1", 4000000, $summons, $monitors, document.getElementById("upgradeGenFour1"), "upgradeFourCost");
let $gen51Upgrade = new upgrade
("upgradeGenFive1", 40000000, $keyboards, $summons, document.getElementById("upgradeGenFive1"), "upgradeFiveCost");

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
  //math
  if ($chara >= this.realcost()) {
    $chara = $chara - BigInt(this.realcost());
    this.amount++;
    this.updateGrowth();

    //redo math for variable changes in upgrades
    upgrades.forEach(update);
    function update(upgrade) {
      if (upgrade.on) {
        upgrade.updateMulti();
      }
    }
    //update UI
    document.getElementById(this.name).innerHTML = formatOutput(this.amount);
    document.getElementById(this.costRef).innerHTML = formatOutput(this.realcost());
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(Number(this.growth*10n));
  }
}

function formatOutput(output) {
  if (output >= 10000) {
    output = output.toExponential(2);
  }
  return output;
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
