//creating and linking list of resources (linked list lol jk), 
//refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML
//TODO import some form of break_infinity.js to use DECIMAL instead of Number
/*
*/
//game driver support
import turnOn from "./turnOn.js";
import updateGenGrowth from "./updateGenGrowth.js";
import buyOneGenerator from "./buyOneGenerator.js";
import updateMulti from "./updateMulti.js";
import updateValue from "./updateValue.js";
import updateGenUI from "./updateGenUI.js";
//TODO easily templated tab control, not hyper important for now, this works
import openGenTab from "./genTabControl.js";
import openSuperTab from "./superTabControl.js";
//database support
import deleteFile from "./databaseConnection/deleteFile.js";
import loadFile from "./databaseConnection/loadFile.js";
import saveExistingUser from "./databaseConnection/saveExistingUser.js";
import saveNewUser from "./databaseConnection/saveNewUser.js";
import saveContainer from "/saveContainer.js";

//raw JS does not support environment variables, so
const DEBUG = true;

//LOADING SCRIPT
onload:(openGenTab('charaGen'));
onload:(openSuperTab('gameTab'));
//handy dandy container class for recieving async saves
let container = new saveContainer(null, false);
//container to keep track of game progress
let saveItems = new Array();
//UI tutor container
let itemsToDraw = new Array();
//currency container
let currencies = new Array();
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
  $memory = {tier: "memory", refHTML: "memoryTotal", value: 0, growth: 0, 
    backgroundTotal: 0, unlocked: false, 
    prestigeAmount: 0, prestigeTarget: null, prestigeButtonID: null};
  addCurrenciesToArrays($memory); 
  $memoryLeak = {tier: "memoryLeak", refHTML: "memoryLeakTotal", value: 0, growth: 0, 
    backgroundTotal: 0, unlocked: true, 
    prestigeAmount: 0, prestigeTarget: null, prestigeButtonID: null};
  addCurrenciesToArrays($memoryLeak);  
  $chara = {tier: "chara", refHTML: "charaTotal", value: 100, growth: 0, 
    backgroundTotal: 100, unlocked: false, 
    prestigeAmount: 0, prestigeTarget: "memory", prestigeButtonID: "charaPrestige"};
  addCurrenciesToArrays($chara);
  
  // generators instantiation
  // prestige layer 1 gen
  $keyboards = {currencyBuy: "chara", currencyGen: "chara", nextTier: "memoryLeak", 
    basecost: 100, costgrowth: 1.21, 
    costRef: "keyboardsCost", name: "keyboards",
    buttonID: "gen1", growthFactor: 1, growth: 0,
    amount: 0, growthDisplay: "keyboardsGen", upgradeMulti: 1, show: 50,
    prestigeMulti: 1, descriptor: "descriptor1"};
  addGeneratorToArrays($keyboards);
  $autoclickers = {currencyBuy: "chara", currencyGen: "chara", nextTier: "memoryLeak", 
    basecost: 2000, costgrowth: 1.31, 
    costRef: "autoclickersCost", name: "autoclickers", 
    buttonID: "gen2", growthFactor: 10, growth: 0,
    amount: 0, growthDisplay: "autoclickersGen", upgradeMulti: 1, show: 1000,
    prestigeMulti: 1, descriptor: "descriptor2"};
  addGeneratorToArrays($autoclickers);
  $macros = {currencyBuy: "chara", currencyGen: "chara", nextTier: "memoryleak", 
    basecost: 40000, costgrowth: 1.41,
    costRef: "macrosCost", name: "macros",
    buttonID: "gen3", growthFactor: 100, growth: 0,
    amount: 0, growthDisplay: "macrosGen", upgradeMulti: 1, show: 20000,
    prestigeMulti: 1, descriptor: "descriptor3"};
  addGeneratorToArrays($macros);
  $monitors = {currencyBuy: "chara", currencyGen: "chara", nextTier: "memoryleak", 
    basecost: 800000, costgrowth: 1.51,
    costRef: "monitorsCost", name: "monitors",
    buttonID: "gen4", growthFactor: 1000, growth: 0,
    amount: 0, growthDisplay: "monitorsGen", upgradeMulti: 1, show: 400000,
    prestigeMulti: 1, descriptor: "descriptor4"};
  addGeneratorToArrays($monitors);
  $summons = {currencyBuy: "chara", currencyGen: "chara", nextTier: "memoryleak", 
    basecost: 16000000, costgrowth: 1.61,
    costRef: "summonsCost", name: "summons",
    buttonID: "gen5", growthFactor: 10000, growth: 0,
    amount: 0, growthDisplay: "summonsGen", upgradeMulti: 1, show: 80000000,
    prestigeMulti: 1, descriptor: "descriptor5"};
  addGeneratorToArrays($summons);

  // prestige layer 2 gen
  $tickertape = {currencyBuy: "memory", currencyGen: "memoryleak", nextTier: null, 
    basecost: 100, costgrowth: 1.21,
    costRef: "tickertapeCost", name: "tickertapes",
    buttonID: "gen6", growthFactor: 1, growth: 0,
    amount: 0, growthDisplay: "tickertapeGen", upgradeMulti: 1, show: 50,
    prestigeMulti: 1, descriptor: "descriptor6"};
  addGeneratorToArrays($tickertape);
  $etchasketch = {
    currencyBuy: "memory", currencyGen: "memoryleak", nextTier: null,
    basecost: 2000, costgrowth: 1.31,
    costRef: "etchasketchCost", name: "etchasketchs",
    buttonID: "gen7", growthFactor: 10, growth: 0,
    amount: 0, growthDisplay: "etchasketchGen", upgradeMulti: 1, show: 1000,
    prestigeMulti: 1, descriptor: "descriptor7"};
  addGeneratorToArrays($etchasketch);
  $floppydisc = {
    currencyBuy: "memory", currencyGen: "memoryleak", nextTier: null,
    basecost: 40000, costgrowth: 1.41,
    costRef: "floppydiscCost", name: "floppydiscs",
    buttonID: "gen8", growthFactor: 100, growth: 0,
    amount: 0, growthDisplay: "floppydiscGen", upgradeMulti: 1, show: 20000,
    prestigeMulti: 1, descriptor: "descriptor8"};
  addGeneratorToArrays($floppydisc);
  $ssd = {
    currencyBuy: "memory", currencyGen: "memoryleak", nextTier: null,
    basecost: 800000, costgrowth: 1.51,
    costRef: "ssdCost", name: "ssds",
    buttonID: "gen9", growthFactor: 1000, growth: 0,
    amount: 0, growthDisplay: "ssdGen", upgradeMulti: 1, show: 400000,
    prestigeMulti: 1, descriptor: "descriptor9"};
  addGeneratorToArrays($ssd);
  $faustdeal = {
    currencyBuy: "memory", currencyGen: "memoryleak", nextTier: null,
    basecost: 16000000, costgrowth: 1.61,
    costRef: "faustdealCost", name: "faustdeals",
    buttonID: "gen10", growthFactor: 10000, growth: 0,
    amount: 0, growthDisplay: "faustdealGen", upgradeMulti: 1, show: 8000000,
    prestigeMulti: 1, descriptor: "descriptor10"};
  addGeneratorToArrays($faustdeal);
  generators.forEach(updateUI);
  function updateUI(gen) {
    updateGenUI(gen);
  }
  //upgrade layer one
  $gen11Upgrade = {name: "upgradeGenOne1", currencyBuy: "chara", cost: 4000, 
    effectStrength: "autoclickers", effectTarget: "keyboards", 
    buttonID: "upgradeGenOne1", on: false, show: 2000,
    costDisplay: "upgradeOneCost"};
  addUpgradeToArrays($gen11Upgrade);
  $gen21Upgrade = {name: "upgradeGenTwo1", currencyBuy: "chara", cost: 80000, 
    effectStrength: "macros", effectTarget: "autoclickers", 
    buttonID: "upgradeGenTwo1", on: false, show: 40000,
    costDisplay: "upgradeTwoCost"};
  addUpgradeToArrays($gen21Upgrade);
  $gen31Upgrade = {name: "upgradeGenThree1", currencyBuy: "chara", cost: 1600000, 
    effectStrength: "monitors", effectTarget: "macros", 
    buttonID: "upgradeGenThree1", on: false, show: 800000,
    costDisplay: "upgradeThreeCost"};
  addUpgradeToArrays($gen31Upgrade);
  $gen41Upgrade = {name: "upgradeGenFour1", currencyBuy: "chara", cost: 32000000, 
    effectStrength: "summons", effectTarget: "monitors", 
    buttonID: "upgradeGenFour1", on: false, show: 16000000,
    costDisplay: "upgradeFourCost"};
  addUpgradeToArrays($gen41Upgrade);
  $gen51Upgrade = {name: "upgradeGenFive1", currencyBuy: "chara", cost: 640000000, 
    effectStrength: "keyboards", effectTarget: "summons", 
    buttonID: "upgradeGenFive1", on: false, show: 320000000,
    costDisplay: "upgradeFiveCost"};
  addUpgradeToArrays($gen51Upgrade);

  upgrades.forEach(updateUpgradeUI);
  function updateUpgradeUI(upgrade) {
    document.getElementById(upgrade.costDisplay).innerHTML = upgrade.cost;
  }
  activateButtons();
}

function loadWithFile(dataArray) {
  clearButtons();
  unloadGame();
  if (DEBUG) {
  console.log(saveItems);
  }
  
  //currency 
  $memory = dataArray[0];
    addCurrenciesToArrays($memory);
  $memoryLeak = dataArray[1];
    addCurrenciesToArrays($memoryLeak); 
  $chara = dataArray[2];
    addCurrenciesToArrays($chara); 
  
  //generators
  $keyboards = dataArray[3];
    addGeneratorToArrays($keyboards);
  $autoclickers = dataArray[4];
    addGeneratorToArrays($autoclickers);
  $macros = dataArray[5];
    addGeneratorToArrays($macros);
  $monitors = dataArray[6];
    addGeneratorToArrays($monitors);
  $summons = dataArray[7];
    addGeneratorToArrays($summons);
  $tickertape = dataArray[8];
    addGeneratorToArrays($tickertape);
  $etchasketch = dataArray[9];
    addGeneratorToArrays($etchasketch);
  $floppydisc = dataArray[10];
    addGeneratorToArrays($floppydisc);
  $ssd = dataArray[11];
    addGeneratorToArrays($ssd);
  $faustdeal = dataArray[12];
    addGeneratorToArrays($faustdeal);
  
  generators.forEach(updateUI);
  function updateUI(gen) {
    updateGenUI(gen);
  }

  //upgrades
  $gen11Upgrade = dataArray[13];
    addUpgradeToArrays($gen11Upgrade);
  $gen21Upgrade = dataArray[14];
    addUpgradeToArrays($gen21Upgrade);
  $gen31Upgrade = dataArray[15];
    addUpgradeToArrays($gen31Upgrade);
  $gen41Upgrade = dataArray[16];
    addUpgradeToArrays($gen41Upgrade);
  $gen51Upgrade = dataArray[17];
    addUpgradeToArrays($gen51Upgrade);
  
  upgrades.forEach(updateUpgradeUI);
  function updateUpgradeUI(upgrade) {
    document.getElementById(upgrade.costDisplay).innerHTML = upgrade.cost;
  }
  if (DEBUG) {
    console.log(saveItems);
    }
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
  currencies.push(itemToAdd);
}

function activateButtons() {
  saveItems.forEach(attachButton);
  function attachButton(target) {
    if (target.currencyGen) {
      document.getElementById(target.buttonID).addEventListener(
          "click", function () { buyOneGenerator(target, getCurrencyBuy(target));});
    }
    else if (target.effectStrength) {
      document.getElementById(target.buttonID).addEventListener(
          "click", function () { turnOn(target, getCurrencyBuy(target));});
    }
  }
  //refactor
  //document.getElementById("charaPrestige").addEventListener("click", prestige.bind($chara));
}

function clearButtons() {
  saveItems.forEach(cloneButtons);
  function cloneButtons(target) {
    if (target.currencyGen) {
      let element = document.getElementById(target.buttonID)
      element.replaceWith(element.cloneNode(true));
    }
    else if (target.effectStrength) {
      let element = document.getElementById(target.buttonID)
      element.replaceWith(element.cloneNode(true));
    }
  }
}
//TODO eventually I've got to come across a less sloppy way to do this
//but for now if it works then MVP!
function unloadGame() {
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
//TODO fix references in save data like so
function getCurrencyBuy(target) {
  let reference = null;
  currencies.forEach(checkTier);
  function checkTier(currency) {
    if (currency.tier === target.currencyBuy) {reference = currency;}
  }
  return reference;
}
//IMPORTANT FUNCTION for guiding gameplay
//refactor?
function checkUnlocks() {

  itemsToDraw.forEach(checkToDraw);
  function checkToDraw(object) {
    if (getCurrencyBuy(object).backgroundTotal >= object.show) {
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

function updateCurrencyGrowth(currencyTarget) {
  let growthValue = 0;
  generators.forEach(growthUpdateCheck)
  function growthUpdateCheck(gen) {
    if (getCurrencyBuy(gen).tier === currencyTarget.tier) {
      growthValue = growthValue + gen.growth; 
    }
  }
  return growthValue;
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
function loadOp() {
  let userName = document.getElementById("username").value;
  container.empty();
  loadFile(userName, container);
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

//game driver
setInterval(Grow, 100);
function Grow(){

  //check to load a save
  if (container.checkStatus()) {
    let newSaveData = container.getSaveDataAndEmpty();
    loadWithFile(newSaveData);
  }
  generators.forEach(updateGen)
  function updateGen(gen) {
    updateGenGrowth(gen);
    //refactor
    //updatePrestigeMulti(gen);
  }
  upgrades.forEach(updateUpgrades);
  function updateUpgrades(upgrade) {
    if (upgrade.on) {
      updateMulti(upgrade);
    }
  }

  $chara.growth = updateCurrencyGrowth($chara);
  $memoryLeak.growth = updateCurrencyGrowth($memoryLeak);
  checkUnlocks($chara);
  if ($memory.unlocked) {
    checkUnlocks($memory);
    //refactor
    //document.getElementById("charaPrestigeAmount").innerHTML = formatOutput($chara.prestigeAmount);
  }

  currencies.forEach(updateCurrencies);
  function updateCurrencies(currency) {
    updateValue(currency);
  }

  //keep track of prestige amounts
  //refactor
  //$chara.updatePrestige();
}
