//creating and linking list of resources (linked list lol jk), 
//refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
//TODO import some form of break_infinity.js to use DECIMAL instead of Number
/*
*/
import currencies from "/currencies.js";
import upgrade from "/upgrade.js";
import formatOutput from "/formatOutput.js"
//LOADING SCRIPT
onload:(openGenTab('charaGen'));
onload:(openSuperTab('gameTab'));
let debug = true;
let playerFile = false;
//container to keep track of game progress
let saveItems = new Array();
//UI tutor container
let itemsToDraw = new Array();
//container to neatly call/update all upgrade effects
let upgrades = new Array();
//generator container
let generators = new Array();


//functions to control tabs

document.getElementById("game").addEventListener("click", openSuperTab.bind("gameTab"));
document.getElementById("upgrades").addEventListener("click", openSuperTab.bind("upgradesTab"));
document.getElementById("apiUI").addEventListener("click", openSuperTab.bind("apiUITab"));

function openSuperTab(tab) {
  var index;
  var tabNames = document.getElementsByClassName("supers");
  for (index = 0; index < tabNames.length; index++) {
    tabNames[index].style.display = "none";
  }
  if (this) document.getElementById(this).style.display = "block";
  else document.getElementById(tab).style.display = "block";
}

document.getElementById("charaTab").addEventListener("click", openGenTab.bind("charaGen"));
document.getElementById("memoryTab").addEventListener("click", openGenTab.bind("memoryGen"));
document.getElementById("apipTab").addEventListener("click", openGenTab.bind("apipGen"));

function openGenTab(tab) {
  var index;
  var tabNames = document.getElementsByClassName("generators");
  for (index = 0; index < tabNames.length; index++) {
    tabNames[index].style.display = "none";
  }
  if (this) document.getElementById(this).style.display = "block";
  else document.getElementById(tab).style.display = "block";
}



//class for generators to keep track of cost, costgrowth, and change in chara growth
//generators run the game, so they are kept locally in run instead of an external file
class generator {
  constructor(currencyBuy, currencyGen, basecost, costgrowth, costRef,
     name, button, growthFactor, growthDisplay, descriptor) {
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



function addUpgradeToArrays(itemToAdd) {
  saveItems.push(itemToAdd);
  itemsToDraw.push(itemToAdd);
  upgrades.push(itemToAdd);
}

//BALANCEPOINT
//TODO refactor for pretty and for save/load
let $memory = new currencies
  ("memory", document.getElementById("memoryTotal"), 0, 0, false, null, null);
  saveItems.push($memory); //REFACTOR?
let $memoryLeak = new currencies
  ("memoryLeak", document.getElementById("memoryLeakTotal"), 0, 0, true, null, null);
  saveItems.push($memoryLeak); //REFACTOR?
let $chara = new currencies
  ("chara", document.getElementById("charaTotal"), 100, 0, true, $memory, document.getElementById("charaPrestige"));
  saveItems.push($chara); //REFACTOR?

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
    document.getElementById("upgradeGenOne1"), document.getElementById("upgradeOneCost"));
    addUpgradeToArrays($gen11Upgrade);
let $gen21Upgrade = new upgrade
  ("upgradeGenTwo1", $chara, 80000, $macros, $autoclickers,
    document.getElementById("upgradeGenTwo1"), document.getElementById("upgradeTwoCost"));
    addUpgradeToArrays($gen21Upgrade);
let $gen31Upgrade = new upgrade
  ("upgradeGenThree1", $chara, 1600000, $monitors, $macros,
    document.getElementById("upgradeGenThree1"), document.getElementById("upgradeThreeCost"));
    addUpgradeToArrays($gen31Upgrade);
let $gen41Upgrade = new upgrade
  ("upgradeGenFour1", $chara, 32000000, $summons, $monitors,
    document.getElementById("upgradeGenFour1"), document.getElementById("upgradeFourCost"));
    addUpgradeToArrays($gen41Upgrade);
let $gen51Upgrade = new upgrade
  ("upgradeGenFive1", $chara, 640000000, $keyboards, $summons,
    document.getElementById("upgradeGenFive1"), document.getElementById("upgradeFiveCost"));
    addUpgradeToArrays($gen51Upgrade);

//button activations for upgrades
//bundled
$gen11Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen11Upgrade));
$gen21Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen21Upgrade));
$gen31Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen31Upgrade));
$gen41Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen41Upgrade));
$gen51Upgrade.button.addEventListener("click", turnUpgradeOn.bind($gen51Upgrade));


function turnUpgradeOn() {
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
  let currency = this;
  if (this.prestige()) {
    itemsToDraw.forEach(prestigeUpdate)
    function prestigeUpdate(objects) {
      if (objects.currencyBuy == currency) {
        objects.prestigeClean();
      }
    }
  }
}

//SAVESTATE work
let userName = '';
let safeInput = false;
let serverMessage = 'no response';
//TODO convert console logs to UI messages on save/load UI API page
//TODO bind functions to click events like everything else is so that it works
// in strict


document.getElementById("saveNewUser").addEventListener("click", saveNewUser.bind());
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
      serverMessage = 'server response: ' + data;
      updateServerMessage(serverMessage);
    })
  }
}

document.getElementById("saveExistingUser").addEventListener("click", saveExistingUser.bind());
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
      serverMessage = 'server response: ' + data;
      updateServerMessage(serverMessage);
    })
  }
  else return false;
}

document.getElementById("loadFile").addEventListener("click", loadFile.bind());
function loadFile() {
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
      if (data != 'savefile not found') {
        serverMessage = 'file found, loaded';
        updateServerMessage(serverMessage);
        playerFile = true;
        if (debug) {
          console.log('before load: ', saveItems);
        }
        parseSaveToUse(data);
        if (debug) console.log('after load: ', saveItems);
        }
      else {
        serverMessage = 'server response: ' + data;
        updateServerMessage(serverMessage);
      }
    })
  }
}

document.getElementById("deleteFile").addEventListener("click", deleteFile.bind());
function deleteFile() {
  checkUsername();
  if (safeInput) {
    fetch('/dbSave', {
      method: "DELETE",
      body: JSON.stringify(userName),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((response) => response.json())
    .then((data) => {
      serverMessage = 'server response: ' + data;
      updateServerMessage(serverMessage);
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
    apiStatusElement.innerHtml = 'unsafe user input';
  }
}

//packages username + savestring into a JSON string to send
function bundleSavetoSend() {
  checkUsername();
  if (safeInput) {
    saveItems.unshift(userName);
    let saveItemsObjectNotated = JSON.stringify(saveItems);
    saveItems.shift(userName);
    return saveItemsObjectNotated;
  }
  else return false;
}

function updateServerMessage(message) {
  document.getElementById("apiStatus").innerHTML = message;
}

/*
TODO load state function called when page loads, called with savedata values if player loads a save
*/
function parseSaveToUse(saveData) {
  let recievedData = new Array();
  recievedData = saveData;
  recievedData.forEach(updateSaveData)

  function updateSaveData(item, index) {
    saveItems[index] = item;
  }
  recievedData = null;
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