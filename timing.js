<!-- Templating? External counting script V0 -->
setInterval(resourceCounting(getElementById("chara")), 1000);
function resourceCounting(resource) {
  counter = resource.innerHTML;
  counterGrowth = resource.growth;
  counter += counterGrowth;
}
