//creating and linking list of resources (linked list lol jk), refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML

//TODO import some form of break_infinity.js to use DECIMAL instead of Number
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
//TODO doublecheck functionality
class currencies {
  constructor(tier, refHTML, growth, backgroundTotal) {
    this.tier = tier;
    this.refHTML = refHTML;
    this.value = Number(refHTML.innerHTML);
    this.growth = growth;
    this.backgroundTotal = backgroundTotal;
  }
  updateValue() {
    this.value = this.value + this.growth;
  }
}

//generic upgrade class
class upgrade {
  constructor(name, currency, cost, effectStrength, effectTarget, button, costDisplay) {
    this.name = name;
    this.currency = currency;
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
class generator {
  constructor(currency, basecost, costgrowth, costRef, name, button, growthFactor, growthDisplay, descriptor) {
    //create object in JS, connect to references in HTML
    this.currency = currency;
    this.basecost = basecost;
    this.costgrowth = costgrowth;
    this.costRef = costRef;
    this.name = name;
    this.button = button;
    this.growthFactor = growthFactor;
    this.growth = 0;
    this.amount = 0;
    this.growthDisplay = growthDisplay;
    this.upgradeMulti = 1;
    this.show = basecost / 2;
    this.descriptor = document.getElementById(descriptor);
    //update UI
    itemsToDraw.push(this);
    document.getElementById(costRef).innerHTML = formatOutput(basecost);
  }
  realcost() {
    return Math.floor((this.basecost*(Math.pow(this.costgrowth, this.amount))))
  }

  //templated buy function? pass in amount that UI can change (1x, 10x, 100x, etc)?
  //TODO would have to update buttons to be able to show amount to buy, add more buttons to toggle buy amount
  totalCostBuyAmount(amount) {
    let totalCost = 0;
    let index = this.amount;
    let goalTotal = index + amount;
    for (let i = index; i < goalTotal; i++ ) {
      totalCost = totalCost + (this.basecost*this.costgrowth*i);
    }
    return totalCost;
  }
  updateGrowth() {
    this.growth = (this.growthFactor * this.amount * this.upgradeMulti);
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth*10);
  }
}

//use explicit type definitions to enforce addition instead of concatenation due to JS automatic typing
let $chara = new currencies("chara", document.getElementById("charaTotal"), 0, 100);

let $memory = new currencies("memory", document.getElementById("memoryTotal"), 0, 0);


//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT first two numbers are base cost and cost growth, second to last is amount of chara generated per 1/10 sec
let $keyboards = new generator($chara, 100, 1.21, "keyboardsCost", "keyboards", document.getElementById("gen1"), 1, "keyboardsGen", "descriptor1");
let $autoclickers = new generator($chara, 2000, 1.31, "autoclickersCost", "autoclickers", document.getElementById("gen2"), 10, "autoclickersGen", "descriptor2");
let $macros = new generator($chara, 40000, 1.41, "macrosCost", "macros", document.getElementById("gen3"), 100, "macrosGen", "descriptor3");
let $monitors = new generator($chara, 800000, 1.51, "monitorsCost", "monitors", document.getElementById("gen4"), 1000, "monitorsGen", "descriptor4");
let $summons = new generator($chara, 16000000, 1.61, "summonsCost", "summons", document.getElementById("gen5"), 10000, "summonsGen", "descriptor5");

// prestige layer 2 gen
let $tickertape = new generator($memory, 100, 1.21, "tickertapeCost", "tickertapes", document.getElementById("gen6"), 1, "tickertapeGen", "descriptor6");
let $etchasketch = new generator($memory, 4000, 1.31, "etchasketchCost", "etchasketchs", document.getElementById("gen7"), 10, "etchasketchGen", "descriptor7");
let $floppydisc = new generator($memory, 40000, 1.41, "floppydiscCost", "floppydiscs", document.getElementById("gen8"), 100, "floppydiscGen", "descriptor8");
let $ssd = new generator($memory, 800000, 1.51, "ssdCost", "ssds", document.getElementById("gen9"), 1000, "ssdGen", "descriptor9");
let $faustdeal = new generator($memory, 16000000, 1.61, "faustdealCost", "faustdeals", document.getElementById("gen10"), 10000, "faustdealGen", "descriptor10");

let apip = 0;
// prestige layer 3 gen, apip == api power
let dots = 0;
let vectors = 0;
let nodes = 0;
let graphs = 0;
let codeCleanliness = 0;

//upgrade layer one iteration one
let $gen11Upgrade = new upgrade
("upgradeGenOne1", $chara, 4000, $autoclickers, $keyboards, document.getElementById("upgradeGenOne1"), "upgradeOneCost");
let $gen21Upgrade = new upgrade
("upgradeGenTwo1", $chara, 80000, $macros, $autoclickers, document.getElementById("upgradeGenTwo1"), "upgradeTwoCost");
let $gen31Upgrade = new upgrade
("upgradeGenThree1", $chara, 1600000, $monitors, $macros, document.getElementById("upgradeGenThree1"), "upgradeThreeCost");
let $gen41Upgrade = new upgrade
("upgradeGenFour1", $chara, 32000000, $summons, $monitors, document.getElementById("upgradeGenFour1"), "upgradeFourCost");
let $gen51Upgrade = new upgrade
("upgradeGenFive1", $chara, 640000000, $keyboards, $summons, document.getElementById("upgradeGenFive1"), "upgradeFiveCost");

//button activations for upgrades
//bundled
$gen11Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen11Upgrade));
$gen21Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen21Upgrade));
$gen31Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen31Upgrade));
$gen41Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen41Upgrade));
$gen51Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen51Upgrade));


function turnUpgradeOn(upgradeID) {
  if (this.currency.value >= this.cost && this.on == false) {
    this.currency.value = this.currency.value - this.cost;
    this.turnOn();
  }
}

//IMPORTANT FUNCTION for guiding gameplay
//templated!
function checkUnlocks() {

  itemsToDraw.forEach(checkToDraw);
  
  function checkToDraw(object) {
    if (object.currency.value >= object.show) {
      object.button.style.visibility = "visible";
      if (object.descriptor) {object.descriptor.style.visibility = "visible";}
    }
  }
  //special cases / tutorial
  if ($chara.backgroundTotal > 100)  {
    document.getElementById("greet").innerHTML = "wow wasn't that fun. press more? find upgrades?"
  }
  if ($chara.backgroundTotal > 10000) {
    document.getElementById("title").style.visibility = "visible";
    document.getElementById("greet").innerHTML = "good job pressing button, keep going";
  }
  if ($memory.backgroundTotal >= 0) {
    document.getElementById("memoryTab").visibility = "visible";
  }
}

$keyboards.button.addEventListener("click", buyOneGenerator.bind($keyboards));
$autoclickers.button.addEventListener("click", buyOneGenerator.bind($autoclickers));
$macros.button.addEventListener("click", buyOneGenerator.bind($macros));
$monitors.button.addEventListener("click", buyOneGenerator.bind($monitors));
$summons.button.addEventListener("click", buyOneGenerator.bind($summons));

//TODO change to accept buying any amount? toggle buttons to change amount bought and return floor amount?
//GOAL IS ABSTRACTION
function buyOneGenerator() {
  //math
  if (this.currency.value >= this.realcost()) {
    this.currency.value = this.currency.value - this.realcost();
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
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth*10);
  }
}

function formatOutput(output) {
  if (output >= 10000) {
    output = output.toExponential(2);
  }
  return output;
}

setInterval(Grow, 100);
function Grow(){
  $chara.growth = $keyboards.growth + $autoclickers.growth + $macros.growth + $monitors.growth + $summons.growth;
  //backgroundtotal is used for unlocks, so that buying upgrades/generators doesn't hinder progress in a meaningful way cause that feels bad as a game
  $chara.backgroundTotal = $chara.backgroundTotal + $chara.growth;
  checkUnlocks($chara);
  checkUnlocks($memory);

  //keep track of spendable money
  $chara.updateValue();
  $chara.refHTML.innerHTML = formatOutput($chara.value);
}
