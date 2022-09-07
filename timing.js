
//how deep to template?
//how to call the value of 'chara' and then use a more complex data type to connect everything?
//TODO object definitions in HTML vs. JS

//NOT IN USE YET, NO DEBUG
let chara = 0n;
let charaGrowth = 0n;
setInterval(resourceCounting(document.getElementById("charaTotal"), chara, charaGrowth), 1000);
function resourceCounting(resource, resourceType, resourceGrowth) {
  counter = 0n;
  counterGrowth = 0n;
  counter = resource.innerHTML;
  counterGrowth = resourceGrowth;
  counter += counterGrowth;
}
