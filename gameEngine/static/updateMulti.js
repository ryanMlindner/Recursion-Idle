export default
function updateMulti(target) {
    if(target.effectStrength.amount === 0) {target.effectTarget.upgradeMulti = 1;}
    else target.effectTarget.upgradeMulti = target.effectStrength.amount;
  }