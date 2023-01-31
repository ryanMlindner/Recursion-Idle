export default
function realcost(target) {
    return Math.floor((target.basecost * 
        (Math.pow(target.costgrowth, target.amount))))
    }