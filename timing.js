
//how deep to template?
//how to call the value of 'chara' and then use a more complex data type to connect everything?
//TODO object definitions in HTML vs. JS

//creating and linking list of resources (linked list lol jk), refer to map in notebook, UPDATE HERE FIRST:: USE ID's IN HTML


let chara = 100n;
// prestige layer 1 gen
let keyboards = 0n;
let autoclickers = 0n;
let macros = 0n;
let monitors = 0n;
let summons = 0n;

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




//NOT IN USE YET, NO DEBUG

//3 prestige tiers & growth factors
let charaGrowth = 0n;
let ideasGrowth = 0n;
let packagingGrowth = 0n;

// TODO refactor setinterval to take ANY resource as args and output the same
setInterval(resourceCounting(document.getElementById("charaTotal"), chara, charaGrowth), 1000);
function resourceCounting(resource, resourceType, resourceGrowth) {
  counter = 0n;
  counterGrowth = 0n;
  counter = resource.innerHTML;
  counterGrowth = resourceGrowth;
  counter += counterGrowth;
}
