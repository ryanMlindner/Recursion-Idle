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
import deleteFile from "./databaseConnection/deleteFile.js";
import loadFile from "./databaseConnection/loadFile.js";
import saveExistingUser from "./databaseConnection/saveExistingUser.js";
import saveNewUser from "./databaseConnection/saveNewUser.js";

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
onload:(loadWithoutFile());

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

//moved into class def
function activateButtons() {
  document.getElementById("charaPrestige").addEventListener("click", prestige.bind($chara));
}

//TODO i dont think this actually works
function deactivateButtons() {
  document.getElementById("charaPrestige").removeEventListener("click", prestige.bind($chara));
}

//TODO eventually I've got to come across a less sloppy way to do this
//but for now if it works then MVP!
function unloadGame() {
  deactivateButtons();
  for (let index = 0; index < saveItems.length; index++) {
    saveItems[index] = null; 
  }
  for (let index = 0; index < itemsToDraw.length; index++) {
    itemsToDraw[index] = null; 
  }
  for (let index = 0; index < generators.length; index++) {
    generators[index] = null; 
  }
  for (let index = 0; index < upgrades.length; index++) {
    upgrades[index] = null;
  }
  $memory = null;
  $memoryLeak = null;
  $chara = null;
  $keyboards = null;
  $autoclickers = null;
  $macros = null;
  $monitors = null;
  $summons = null;
  $tickertape = null;
  $etchasketch = null;
  $floppydisc = null;
  $ssd = null;
  $faustdeal = null;
  $gen11Upgrade = null;
  $gen21Upgrade = null;
  $gen31Upgrade = null;
  $gen41Upgrade = null;
  $gen51Upgrade = null;
  saveItems = new Array();
  itemsToDraw = new Array();
  generators = new Array();
  upgrades = new Array();
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

document.getElementById("saveNewUser").addEventListener("click", saveNewOp.bind());
function saveNewOp() {
  let userName = document.getElementById("username").value;
  let saveItemsObjectNotated = bundleSavetoSend(userName);
  saveNewUser(saveItemsObjectNotated, userName);
}

document.getElementById("saveExistingUser").addEventListener("click", saveExistingOp.bind());
function saveExistingOp() {
  let userName = document.getElementById("username").value;
  let saveItemsObjectNotated = bundleSavetoSend(userName);
  saveExistingUser(saveItemsObjectNotated, userName);
}

document.getElementById("loadFile").addEventListener("click", loadOp.bind());
async function loadOp() {
  let userName = document.getElementById("username").value;
  function resolveLoadResponse(userName) {
    return new Promise(resolve => {resolve = loadFile(userName)})
  }
  let saveArray = await resolveLoadResponse(userName);
  loadWithFile(saveArray);
}

document.getElementById("deleteFile").addEventListener("click", deleteOp.bind());
function deleteOp() {
  let userName = document.getElementById("username").value;
  deleteFile(userName);
}

//packages username + savestring into a JSON string to send
function bundleSavetoSend(userName) {
  saveItems.unshift(userName);
  let saveItemsObjectNotated = JSON.stringify(saveItems);
  saveItems.shift(userName);
  return saveItemsObjectNotated;
}

function updateGeneratorGrowth(currencyTarget) {
  let growthValue = 0;
  generators.forEach(growthUpdateCheck)
  function growthUpdateCheck(gen) {
    if (gen.currencyGen == currencyTarget) {
      growthValue = growthValue + gen.growth; 
    }
  }
  return growthValue;
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

  $chara.growth = updateGeneratorGrowth($chara);
  $memoryLeak.growth = updateGeneratorGrowth($memoryLeak)

  checkUnlocks($chara);
  if ($memory.unlocked) {
    checkUnlocks($memory);
    document.getElementById("charaPrestigeAmount").innerHTML = formatOutput($chara.prestigeAmount);
  }
  //keep track of spendable money
  $chara.updateValue();
  $memory.updateValue();
  $memoryLeak.updateValue();
  //keep track of prestige amounts
  $chara.updatePrestige();
}
