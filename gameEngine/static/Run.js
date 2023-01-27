//creating and linking list of resources (linked list lol jk), 
//refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
//TODO import some form of break_infinity.js to use DECIMAL instead of Number
/*
*/
import currencies from "/currencies.js";
import upgrade from "/upgrade.js";
import generator from "/generator.js";
import formatOutput from "/formatOutput.js";
//TODO easily templated tab control, not hyper important for now, this works
import openGenTab from "/genTabControl.js";
import openSuperTab from "/superTabControl.js";

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
//tutor function needs an array of types in the savestring

//savefile declarations to be instantiated in either
//loadfromfile or loadwithoutfile
let $memory, 
    $memoryLeak, 
    $chara,
    $keyboards,
    $autoclickers,
    $macros,
    $monitors,
    $summons,
    $tickertape,
    $etchasketch,
    $floppydisc,
    $ssd,
    $faustdeal,
    $gen11Upgrade,
    $gen21Upgrade,
    $gen31Upgrade,
    $gen41Upgrade,
    $gen51Upgrade;

if (!playerFile) {loadWithoutFile()}

//tabs
//main tabs
document.getElementById("game").addEventListener("click", openSuperTab.bind("gameTab"));
document.getElementById("upgrades").addEventListener("click", openSuperTab.bind("upgradesTab"));
document.getElementById("apiUI").addEventListener("click", openSuperTab.bind("apiUITab"));
//tabs in game tab
document.getElementById("charaTab").addEventListener("click", openGenTab.bind("charaGen"));
document.getElementById("memoryTab").addEventListener("click", openGenTab.bind("memoryGen"));
document.getElementById("apipTab").addEventListener("click", openGenTab.bind("apipGen"));

function loadWithoutFile() {
  // load the game normally

  // currencies instantiation
  $memory = new currencies
  ("memory", "memoryTotal", 0, 0, 0, false, 0, null, null);
  addCurrenciesToArrays($memory); 
  $memoryLeak = new currencies
  ("memoryLeak", "memoryLeakTotal", 0, 0, 0, true, 0, null, null);
  addCurrenciesToArrays($memoryLeak);  
  $chara = new currencies
  ("chara", "charaTotal", 100, 0, 100, true, 0, $memory, "charaPrestige");
  addCurrenciesToArrays($chara);
  
  // generators instantiation
  // prestige layer 1 gen
  $keyboards = new generator
  ($chara, $chara, $memoryLeak, 100, 1.21, "keyboardsCost", "keyboards",
    "gen1", 1, 0, 0, "keyboardsGen", 1, 50, 1, "descriptor1");
    addGeneratorToArrays($keyboards);
  $autoclickers = new generator
  ($chara, $chara, $memoryLeak, 2000, 1.31, "autoclickersCost", "autoclickers", 
    "gen2", 10, 0, 0, "autoclickersGen", 1, 1000, 1, "descriptor2");
    addGeneratorToArrays($autoclickers);
  $macros = new generator
  ($chara, $chara, $memoryLeak, 40000, 1.41, "macrosCost", "macros", 
    "gen3", 100, 0, 0, "macrosGen", 1, 20000, 1, "descriptor3");
    addGeneratorToArrays($macros);
  $monitors = new generator
  ($chara, $chara, $memoryLeak, 800000, 1.51, "monitorsCost", "monitors", 
    "gen4", 1000, 0, 0, "monitorsGen", 1, 400000, 1, "descriptor4");
    addGeneratorToArrays($monitors);
  $summons = new generator
  ($chara, $chara, $memoryLeak, 16000000, 1.61, "summonsCost", "summons", 
    "gen5", 10000, 0, 0, "summonsGen", 1, 80000000, 1, "descriptor5");
    addGeneratorToArrays($summons);

  // prestige layer 2 gen
  $tickertape = new generator
  ($memory, $memoryLeak, null, 100, 1.21, "tickertapeCost", "tickertapes", 
    "gen6", 1, 0, 0, "tickertapeGen", 1, 50, 1, "descriptor6");
    addGeneratorToArrays($tickertape);
  $etchasketch = new generator
  ($memory, $memoryLeak, null, 4000, 1.31, "etchasketchCost", "etchasketchs", 
    "gen7", 10, 0, 0, "etchasketchGen", 1, 2000, 1, "descriptor7");
    addGeneratorToArrays($etchasketch);
  $floppydisc = new generator
  ($memory, $memoryLeak, null, 40000, 1.41, "floppydiscCost", "floppydiscs", 
    "gen8", 100, 0, 0, "floppydiscGen", 1, 20000, 1, "descriptor8");
    addGeneratorToArrays($floppydisc);
  $ssd = new generator
  ($memory, $memoryLeak, null, 800000, 1.51, "ssdCost", "ssds", 
    "gen9", 1000, 0, 0, "ssdGen", 1, 400000, 1, "descriptor9");
    addGeneratorToArrays($ssd);
  $faustdeal = new generator
  ($memory, $memoryLeak, null, 16000000, 1.61, "faustdealCost", "faustdeals", 
    "gen10", 10000, 0, 0, "faustdealGen", 1, 80000000, 1, "descriptor10");
    addGeneratorToArrays($faustdeal);
  /*
  let apip = 0;
  // prestige layer 3 gen, apip == api power
  //WIP
  let dots = 0;
  let vectors = 0;
  let nodes = 0;
  let graphs = 0;
  let codeCleanliness = 0;
  */

  //upgrade layer one
  $gen11Upgrade = new upgrade
    ("upgradeGenOne1", $chara, 4000, $autoclickers, $keyboards,
      "upgradeGenOne1", false, 2000, "upgradeOneCost");
  addUpgradeToArrays($gen11Upgrade);
  $gen21Upgrade = new upgrade
    ("upgradeGenTwo1", $chara, 80000, $macros, $autoclickers,
      "upgradeGenTwo1", false, 40000, "upgradeTwoCost");
  addUpgradeToArrays($gen21Upgrade);
  $gen31Upgrade = new upgrade
    ("upgradeGenThree1", $chara, 1600000, $monitors, $macros,
      "upgradeGenThree1", false, 800000, "upgradeThreeCost");
  addUpgradeToArrays($gen31Upgrade);
  $gen41Upgrade = new upgrade
    ("upgradeGenFour1", $chara, 32000000, $summons, $monitors,
      "upgradeGenFour1", false, 16000000, "upgradeFourCost");
  addUpgradeToArrays($gen41Upgrade);
  $gen51Upgrade = new upgrade
    ("upgradeGenFive1", $chara, 640000000, $keyboards, $summons,
      "upgradeGenFive1", false, 320000000, "upgradeFiveCost");
  addUpgradeToArrays($gen51Upgrade);

  activateButtons();
}

function loadWithFile(dataArray) {
  unloadGame();
  //TODO refactor later to make pretty and for code reusability
  //we just out here to make this work at all right now
  //NOT PRETTY BUT CROSS-LANGUAGE TEMPLATING FROM PYTHON TO JS IS HARD, FRIEND
  //currency constructor takes 9 values
  let constructorArray = Object.values(dataArray[0]);
  $memory = new currencies (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8]);
    addCurrenciesToArrays($memory);
  constructorArray = Object.values(dataArray[1]);
  $memoryLeak = new currencies (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8]);
    addCurrenciesToArrays($memoryLeak); 
  constructorArray = Object.values(dataArray[2]);
  $chara = new currencies (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8]);
    addCurrenciesToArrays($chara); 
  //generator constructor takes 16 values
  constructorArray = Object.values(dataArray[3]);
  $keyboards = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($keyboards);
  constructorArray = Object.values(dataArray[4]);
  $autoclickers = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($autoclickers);
  constructorArray = Object.values(dataArray[5]);
  $macros = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($macros);
  constructorArray = Object.values(dataArray[6]);
  $monitors = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($monitors);
  constructorArray = Object.values(dataArray[7]);
  $summons = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($summons);
  constructorArray = Object.values(dataArray[8]);
  $tickertape = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($tickertape);
  constructorArray = Object.values(dataArray[9]);
  $etchasketch = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($etchasketch);
  constructorArray = Object.values(dataArray[10]);
  $floppydisc = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($floppydisc);
  constructorArray = Object.values(dataArray[11]);
  $ssd = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($ssd);
  constructorArray = Object.values(dataArray[12]);
  $faustdeal = new generator (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7],
    constructorArray[8], constructorArray[9],
    constructorArray[10], constructorArray[11],
    constructorArray[12], constructorArray[13],
    constructorArray[14], constructorArray[15],);
    addGeneratorToArrays($faustdeal);
  //upgrade constructors take 9 values
  constructorArray = Object.values(dataArray[13]);
  $gen11Upgrade = new upgrade (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7], constructorArray[8]);
    addUpgradeToArrays($gen11Upgrade);
  constructorArray = Object.values(dataArray[14]);
  $gen21Upgrade = new upgrade (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7], constructorArray[8]);
    addUpgradeToArrays($gen21Upgrade);
  constructorArray = Object.values(dataArray[15]);
  $gen31Upgrade = new upgrade (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7], constructorArray[8]);
    addUpgradeToArrays($gen31Upgrade);
  constructorArray = Object.values(dataArray[16]);
  $gen41Upgrade = new upgrade (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7], constructorArray[8]);
    addUpgradeToArrays($gen41Upgrade);
  constructorArray = Object.values(dataArray[17]);
  $gen51Upgrade = new upgrade (constructorArray[0], constructorArray[1], 
    constructorArray[2], constructorArray[3],
    constructorArray[4], constructorArray[5],
    constructorArray[6], constructorArray[7], constructorArray[8]);
    addUpgradeToArrays($gen51Upgrade);
  activateButtons();
}

function addGeneratorToArrays(itemToAdd) {
  saveItems.push(itemToAdd);
  itemsToDraw.push(itemToAdd);
  generators.push(itemToAdd);
}

function addUpgradeToArrays(itemToAdd) {
  saveItems.push(itemToAdd);
  itemsToDraw.push(itemToAdd);
  upgrades.push(itemToAdd);
}

function addCurrenciesToArrays(itemToAdd) {
  saveItems.push(itemToAdd);
}

function activateButtons() {
  document.getElementById($gen11Upgrade.buttonID).addEventListener(
    "click", turnUpgradeOn.bind($gen11Upgrade));
  document.getElementById($gen21Upgrade.buttonID).addEventListener(
    "click", turnUpgradeOn.bind($gen21Upgrade));
  document.getElementById($gen31Upgrade.buttonID).addEventListener(
    "click", turnUpgradeOn.bind($gen31Upgrade));
  document.getElementById($gen41Upgrade.buttonID).addEventListener(
    "click", turnUpgradeOn.bind($gen41Upgrade));
  document.getElementById($gen51Upgrade.buttonID).addEventListener(
    "click", turnUpgradeOn.bind($gen51Upgrade));
  
  document.getElementById($keyboards.buttonID).addEventListener(
    "click", buyOneGenerator.bind($keyboards));
  document.getElementById($autoclickers.buttonID).addEventListener(
    "click", buyOneGenerator.bind($autoclickers));
  document.getElementById($macros.buttonID).addEventListener(
    "click", buyOneGenerator.bind($macros));
  document.getElementById($monitors.buttonID).addEventListener(
    "click", buyOneGenerator.bind($monitors));
  document.getElementById($summons.buttonID).addEventListener(
    "click", buyOneGenerator.bind($summons));

  document.getElementById($tickertape.buttonID).addEventListener(
    "click", buyOneGenerator.bind($tickertape));
  document.getElementById($etchasketch.buttonID).addEventListener(
    "click", buyOneGenerator.bind($etchasketch));
  document.getElementById($floppydisc.buttonID).addEventListener(
    "click", buyOneGenerator.bind($floppydisc));
  document.getElementById($ssd.buttonID).addEventListener(
    "click", buyOneGenerator.bind($ssd));
  document.getElementById($faustdeal.buttonID).addEventListener(
    "click", buyOneGenerator.bind($faustdeal));

  document.getElementById("charaPrestige").addEventListener("click", prestige.bind($chara));
}

function deactivateButtons() {
  document.getElementById($gen11Upgrade.buttonID).removeEventListener(
    "click", turnUpgradeOn.bind($gen11Upgrade));
  document.getElementById($gen21Upgrade.buttonID).removeEventListener(
    "click", turnUpgradeOn.bind($gen21Upgrade));
  document.getElementById($gen31Upgrade.buttonID).removeEventListener(
    "click", turnUpgradeOn.bind($gen31Upgrade));
  document.getElementById($gen41Upgrade.buttonID).removeEventListener(
    "click", turnUpgradeOn.bind($gen41Upgrade));
  document.getElementById($gen51Upgrade.buttonID).removeEventListener(
    "click", turnUpgradeOn.bind($gen51Upgrade));
  
  document.getElementById($keyboards.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($keyboards));
  document.getElementById($autoclickers.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($autoclickers));
  document.getElementById($macros.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($macros));
  document.getElementById($monitors.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($monitors));
  document.getElementById($summons.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($summons));

  document.getElementById($tickertape.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($tickertape));
  document.getElementById($etchasketch.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($etchasketch));
  document.getElementById($floppydisc.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($floppydisc));
  document.getElementById($ssd.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($ssd));
  document.getElementById($faustdeal.buttonID).removeEventListener(
    "click", buyOneGenerator.bind($faustdeal));

  document.getElementById("charaPrestige").removeEventListener("click", prestige.bind($chara));
}

function unloadGame() {
  saveItems = null;
  saveItems = new Array();
  itemsToDraw = null;
  itemsToDraw = new Array();
  generators = null;
  generators = new Array();
  upgrades = null;
  upgrades = new Array();
  deactivateButtons();
}

function turnUpgradeOn() {
  if (this.currencyBuy.value >= this.cost && this.on == false) {
    this.currencyBuy.value = this.currencyBuy.value - this.cost;
    this.turnOn();
  }
}

//IMPORTANT FUNCTION for guiding gameplay
function checkUnlocks() {

  itemsToDraw.forEach(checkToDraw);
  function checkToDraw(object) {
    if (object.currencyBuy.backgroundTotal >= object.show) {
      document.getElementById(object.buttonID).style.visibility = "visible";
      if (object.descriptor) {document.getElementById(object.descriptor).style.visibility = "visible";}
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

//TODO chase down references to objects in code so that the
//loadstate behaves the same with or without a savefile
//there are some wrong assignments floating around
//but i just did 5 straight hours of coding so im getting food now
function buyOneGenerator() {
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

document.getElementById("saveNewUser").addEventListener("click", saveNewUser.bind());
function saveNewUser() {
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
        //reloads all values in game
        loadWithFile(data);
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

//game driver
setInterval(Grow, 100);
function Grow(){

  generators.forEach(updateAll)
  function updateAll(gen) {
    gen.updateGrowth();
    gen.updatePrestigeMulti();
  }

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
  document.getElementById($chara.refHTML).innerHTML = formatOutput($chara.value);

  $memory.updateValue();
  document.getElementById($memory.refHTML).innerHTML = formatOutput($memory.value);

  $memoryLeak.updateValue();
  document.getElementById($memoryLeak.refHTML).innerHTML = formatOutput($memoryLeak.value);
  //keep track of prestige amounts
  $chara.updatePrestige();
}
