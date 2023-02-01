export default
function updateMulti(multiplier, genTarget) {
    if(multiplier.amount === 0) {genTarget.upgradeMulti = 1;}
    else genTarget.upgradeMulti = multiplier.amount;
  }