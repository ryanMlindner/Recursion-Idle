export default
function openGenTab(tab) {
    var index;
    var tabNames = document.getElementsByClassName("generators");
    for (index = 0; index < tabNames.length; index++) {
      tabNames[index].style.display = "none";
    }
    if (this) document.getElementById(this).style.display = "block";
    else document.getElementById(tab).style.display = "block";
  }