
//how deep to template?
//how to call the value of 'chara' and then use a more complex data type to connect everything?
//TODO object definitions in HTML vs. JS

setInterval(resourceCounting(document.getElementById("chara")), 1000);
function resourceCounting(resource) {
  counter = resource.innerHTML;
  counterGrowth = resource.growth;
  counter += counterGrowth;
}
