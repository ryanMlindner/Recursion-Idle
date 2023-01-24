//creating and linking list of resources (linked list lol jk), 
//refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
//TODO import some form of break_infinity.js to use DECIMAL instead of Number
/*
*/
//LOADING SCRIPT
onload:(openGenTab('charaGen'));
onload:(openSuperTab('game'));
let debug = true;
//container to keep track of game progress
saveItems = new Array();
//UI tutor container
itemsToDraw = new Array();
//container to neatly call/update all upgrade effects
upgrades = new Array();
//generator container
generators = new Array();


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


//TODO private
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
    saveItems.push(this);
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

//generic upgrade class
class upgrade {
  constructor(name, currencyBuy, cost, effectStrength, effectTarget, button, costDisplay) {
    this.name = name;
    this.currencyBuy = currencyBuy;
    this.cost = cost;
    this.effectStrength = effectStrength;
    this.effectTarget = effectTarget;
    this.button = button;
    this.on = false;
    this.show = cost / 2;
    this.costDisplay = costDisplay;

    document.getElementById(costDisplay).innerHTML = formatOutput(this.cost);
    saveItems.push(this);
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
  prestigeClean() {
    this.on = false;
    this.updateMulti();
    this.effectTarget.updateGrowth();
    this.button.style.backgroundColor = "#111";
  }
}


//class for generators to keep track of cost, costgrowth, and change in chara growth
class generator {
  constructor(currencyBuy, currencyGen, basecost, costgrowth, costRef,
     name, button, growthFactor, growthDisplay, descriptor) {
    //create object in JS, connect to references in HTML
    this.currencyBuy = currencyBuy;
    this.currencyGen = currencyGen;
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
    this.prestigeMulti = 1;
    this.descriptor = document.getElementById(descriptor);
    //update UI
    saveItems.push(this);
    itemsToDraw.push(this);
    generators.push(this);
    document.getElementById(this.costRef).innerHTML = formatOutput(this.basecost);
  }
  realcost() {
    return Math.floor((this.basecost*(Math.pow(this.costgrowth, this.amount))))
  }

  updateGrowth() {
    this.growth = (this.growthFactor * this.amount * this.upgradeMulti * this.prestigeMulti);
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth*10);
  }
  updatePrestigeMulti() {
    if (this.currencyGen == $chara) {
    this.prestigeMulti = Math.floor(1 + ($memoryLeak.backgroundTotal/1000))
    }
  }
  prestigeClean() {
    this.amount = 0;
    this.growth = 0;
    this.upgradeMulti = 1;
    document.getElementById(this.costRef).innerHTML = formatOutput(this.basecost);
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth*10);
    document.getElementById(this.name).innerHTML = formatOutput(this.amount);
  }
}

//BALANCEPOINT
let $memory = new currencies
  ("memory", document.getElementById("memoryTotal"), 0, 0, false, null, null);
let $memoryLeak = new currencies
  ("memoryLeak", document.getElementById("memoryLeakTotal"), 0, 0, true, null, null);
let $chara = new currencies
  ("chara", document.getElementById("charaTotal"), 100, 0, true, $memory, document.getElementById("charaPrestige"));

//TODO class definitions done, rewrite variables as generators when appropriate
// prestige layer 1 gen

//BALANCEPOINT
let $keyboards = new generator
  ($chara, $chara, 100, 1.21, "keyboardsCost", "keyboards",
    document.getElementById("gen1"), 1, "keyboardsGen", "descriptor1");
let $autoclickers = new generator
  ($chara, $chara, 2000, 1.31, "autoclickersCost", "autoclickers", 
    document.getElementById("gen2"), 10, "autoclickersGen", "descriptor2");
let $macros = new generator
  ($chara, $chara, 40000, 1.41, "macrosCost", "macros", 
    document.getElementById("gen3"), 100, "macrosGen", "descriptor3");
let $monitors = new generator
  ($chara, $chara, 800000, 1.51, "monitorsCost", "monitors", 
    document.getElementById("gen4"), 1000, "monitorsGen", "descriptor4");
let $summons = new generator
  ($chara, $chara, 16000000, 1.61, "summonsCost", "summons", 
    document.getElementById("gen5"), 10000, "summonsGen", "descriptor5");

// BALANCEPOINT prestige layer 2 gen
let $tickertape = new generator
  ($memory, $memoryLeak, 100, 1.21, "tickertapeCost", "tickertapes", 
    document.getElementById("gen6"), 1, "tickertapeGen", "descriptor6");
let $etchasketch = new generator
  ($memory, $memoryLeak, 4000, 1.31, "etchasketchCost", "etchasketchs", 
    document.getElementById("gen7"), 10, "etchasketchGen", "descriptor7");
let $floppydisc = new generator
  ($memory, $memoryLeak, 40000, 1.41, "floppydiscCost", "floppydiscs", 
    document.getElementById("gen8"), 100, "floppydiscGen", "descriptor8");
let $ssd = new generator
  ($memory, $memoryLeak, 800000, 1.51, "ssdCost", "ssds", 
    document.getElementById("gen9"), 1000, "ssdGen", "descriptor9");
let $faustdeal = new generator
  ($memory, $memoryLeak, 16000000, 1.61, "faustdealCost", "faustdeals", 
    document.getElementById("gen10"), 10000, "faustdealGen", "descriptor10");

let apip = 0;
// prestige layer 3 gen, apip == api power
let dots = 0;
let vectors = 0;
let nodes = 0;
let graphs = 0;
let codeCleanliness = 0;

//upgrade layer one iteration one
let $gen11Upgrade = new upgrade
  ("upgradeGenOne1", $chara, 4000, $autoclickers, $keyboards,
    document.getElementById("upgradeGenOne1"), "upgradeOneCost");
let $gen21Upgrade = new upgrade
  ("upgradeGenTwo1", $chara, 80000, $macros, $autoclickers,
    document.getElementById("upgradeGenTwo1"), "upgradeTwoCost");
let $gen31Upgrade = new upgrade
  ("upgradeGenThree1", $chara, 1600000, $monitors, $macros,
    document.getElementById("upgradeGenThree1"), "upgradeThreeCost");
let $gen41Upgrade = new upgrade
  ("upgradeGenFour1", $chara, 32000000, $summons, $monitors,
    document.getElementById("upgradeGenFour1"), "upgradeFourCost");
let $gen51Upgrade = new upgrade
  ("upgradeGenFive1", $chara, 640000000, $keyboards, $summons,
    document.getElementById("upgradeGenFive1"), "upgradeFiveCost");

//button activations for upgrades
//bundled
$gen11Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen11Upgrade));
$gen21Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen21Upgrade));
$gen31Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen31Upgrade));
$gen41Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen41Upgrade));
$gen51Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen51Upgrade));


function turnUpgradeOn(upgradeID) {
  if (this.currencyBuy.value >= this.cost && this.on == false) {
    this.currencyBuy.value = this.currencyBuy.value - this.cost;
    this.turnOn();
  }
}

//IMPORTANT FUNCTION for guiding gameplay
//templated!
function checkUnlocks() {

  itemsToDraw.forEach(checkToDraw);
  
  function checkToDraw(object) {
    if (object.currencyBuy.backgroundTotal >= object.show) {
      object.button.style.visibility = "visible";
      if (object.descriptor) {object.descriptor.style.visibility = "visible";}
    }
  }
  let memoryUnlockGoal = Number(1E9);

  //special cases / tutorial
  if ($chara.backgroundTotal > 100)  {
    document.getElementById("greet").innerHTML = "wow wasn't that fun. press more?";
  }
  if ($chara.backgroundTotal >= 2000) {
    document.getElementById("greet").innerHTML = "there's something new in the upgrades tab";
  }
  if ($chara.backgroundTotal > 10000) {
    document.getElementById("title").style.visibility = "visible";
    document.getElementById("greet").style.display = "none";
  }
  if ($memory.unlocked == false && $chara.backgroundTotal >= memoryUnlockGoal) {
    $memory.unlocked = true;
    document.getElementById("memoryHeader").style.visibility = "visible";
    document.getElementById("memoryLeakHeader").style.visibility = "visible";
    document.getElementById("charaPrestige").style.visibility = "visible";
    document.getElementById("prestigelayeroneUnlock").style.visibility = "visible";
  }
  if ($chara.backgroundTotal >= memoryUnlockGoal) {
    document.getElementById("charaPrestige").style.visibility = "visible";
  }
  if ($memory.backgroundTotal > 0) {
    document.getElementById("memoryTab").visibility = "visible";
  }
}

$keyboards.button.addEventListener("click", buyOneGenerator.bind($keyboards));
$autoclickers.button.addEventListener("click", buyOneGenerator.bind($autoclickers));
$macros.button.addEventListener("click", buyOneGenerator.bind($macros));
$monitors.button.addEventListener("click", buyOneGenerator.bind($monitors));
$summons.button.addEventListener("click", buyOneGenerator.bind($summons));

$tickertape.button.addEventListener("click", buyOneGenerator.bind($tickertape));
$etchasketch.button.addEventListener("click", buyOneGenerator.bind($etchasketch));
$floppydisc.button.addEventListener("click", buyOneGenerator.bind($floppydisc));
$ssd.button.addEventListener("click", buyOneGenerator.bind($ssd));
$faustdeal.button.addEventListener("click", buyOneGenerator.bind($faustdeal));

document.getElementById("charaPrestige").addEventListener("click", prestige.bind($chara));

//TODO change to accept buying any amount?
//GOAL IS ABSTRACTION
function buyOneGenerator() {
  //math
  if (this.currencyBuy.value >= this.realcost()) {
    this.currencyBuy.value = this.currencyBuy.value - this.realcost();
    this.amount++;
    this.updateGrowth();
    //update UI
    document.getElementById(this.name).innerHTML = formatOutput(this.amount);
    document.getElementById(this.costRef).innerHTML = formatOutput(this.realcost());
    document.getElementById(this.growthDisplay).innerHTML = formatOutput(this.growth*10);
  }
}

function prestige() {
  currency = this;
  if (this.prestige()) {
    itemsToDraw.forEach(prestigeUpdate)
    function prestigeUpdate(objects) {
      if (objects.currencyBuy == currency) {
        objects.prestigeClean();
      }
    }
  }
}

//private
function formatOutput(output) {
  if (output >= 10000) {
    output = output.toExponential(2);
  }
  return output;
}

//private
//SAVESTATE work
let userName = '';
let safeInput = false;

//TODO convert console logs to UI messages on save/load UI API page
function saveNewUser() {
  //get serialized json string to send
  let saveItemsObjectNotated = bundleSavetoSend();
  if (safeInput) {
    fetch('/dbSave', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: saveItemsObjectNotated,
    })
    .then((response) => response.json())
    .then((data) => {
      if (debug) {
        console.log(data);
        console.log('post success!');
      }
    })
  }
  else return false;
}

function saveExistingUser() {
  let saveItemsObjectNotated = bundleSavetoSend();
  if (safeInput) {
    fetch('/dbSave', {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: saveItemsObjectNotated,
    })
    .then((response) => response.json())
    .then((data) => {
      if (debug) {
        console.log(data);
        console.log('put success!');
      }
    })
  }
  else return false;
}

function load() {
  checkUsername();
  if (safeInput) {
    fetch('/dbLoad', {
      method: "POST",
      body: JSON.stringify(userName),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json()
    )
    .then((data) => {
      console.log(data);
      if (data != 'savefile not found') {
        if (debug) {
          console.log('before load: ', saveItems);
        }
        parseSaveToUse(data);
        if (debug) console.log('after load: ', saveItems);
        }
      else console.log('invalid username');
    })
  }
}

function deleteSave() {
  checkUsername();
  if (safeInput) {
    fetch('/dbSave', {
      method: "DELETE",
      body: JSON.stringify(userName),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => {
      console.log('delete response: ');
      console.log(response);
    })
  }
}

//updates username value if no illegal characters are present
function checkUsername() {
  userName = document.getElementById("username").value;
  let pattern = /^[A-Za-z0-9]*$/;
  let safe = pattern.test(userName); //only allows alphanumeric characters
  if (safe && userName != '') safeInput = true;
  else {
    console.log("unsafe user input");
  }
}

//packages username + savestring into a JSON string to send
function bundleSavetoSend() {
  checkUsername();
  if (safeInput) {
    saveItems.unshift(userName);
    let saveItemsObjectNotated = JSON.stringify(saveItems);
    saveItems.shift(userName);
    console.log(saveItemsObjectNotated);
    return saveItemsObjectNotated;
  }
  else return false;
}

//reads server response and updates as the currently used save array
//TODO doesnt work correctly, need to iterate over all game values and replace them
//somehow, will figure out how soon
/*
convert back to usable save state
need to accept new save string as json string from server for load
then convert (and replace current save data) with new save data
*/
function parseSaveToUse(saveData) {
  let recievedData = new Array();
  recievedData = saveData;
  recievedData.forEach(updateSaveData)

  function updateSaveData(item, index) {
    saveItems[index] = item;
    console.log(item);
  }
  delete recievedData;
}

//timer private?
setInterval(Grow, 100);

function Grow(){

  generators.forEach(updateAll)
  function updateAll(gen) {
    gen.updateGrowth();
    gen.updatePrestigeMulti();
  }
  //redo math for variable changes in upgrades
  upgrades.forEach(update);
  function update(upgrade) {
    if (upgrade.on) {
      upgrade.updateMulti();
    }
  }
  
  $chara.growth = 
    $keyboards.growth + $autoclickers.growth + $macros.growth + $monitors.growth + $summons.growth;

  $memoryLeak.growth =
    $tickertape.growth + $etchasketch.growth + $floppydisc.growth + $ssd.growth + $faustdeal.growth;

  //backgroundtotal is used for unlocks
  $chara.backgroundTotal = $chara.backgroundTotal + $chara.growth;
  $memoryLeak.backgroundTotal = $memoryLeak.backgroundTotal + $memoryLeak.growth;

  checkUnlocks($chara);
  if ($memory.unlocked) {
    checkUnlocks($memory);
    document.getElementById("charaPrestigeAmount").innerHTML = formatOutput($chara.prestigeAmount);
  }
  //keep track of spendable money
  $chara.updateValue();
  $chara.refHTML.innerHTML = formatOutput($chara.value);

  $memory.updateValue();
  $memory.refHTML.innerHTML = formatOutput($memory.value);

  $memoryLeak.updateValue();
  $memoryLeak.refHTML.innerHTML = formatOutput($memoryLeak.value);
  //keep track of prestige amounts
  $chara.updatePrestige();
}
