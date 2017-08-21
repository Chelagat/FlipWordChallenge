NUM_BUTTONS = 20;
HORIZONTAL_FACTOR = 4;
ASSOCIATION_MAP = {};
BUTTONS = new Array();
for (i=0; i < NUM_BUTTONS;i++){
      var button = document.createElement("button");
      var button_div = document.getElementsByClassName("button-area")[0];
      button.innerHTML = i+1;
      width = button_div.offsetWidth / HORIZONTAL_FACTOR;
      button_width = parseInt(button_div.offsetwidth);
      str = width + "px";
      button.style.width = str;
      button.addEventListener("click", flipState);
      button_div.appendChild(button);
      BUTTONS.push(button);

}

for(i=0; i< NUM_BUTTONS; i++){
  getPartner(i);
}


console.log(ASSOCIATION_MAP);

function flipState(event){
   var targetElement = event.target;
   index = parseInt(targetElement.innerHTML) - 1;
   var partnerElement = ASSOCIATION_MAP[index];
   flipColor(targetElement);
   flipColor(partnerElement);
   if (hasWon()){
     var audio = new Audio('ta-da.mp3');
     audio.play();
     document.getElementsByClassName("button-area")[0].classList.add('hidden');
     document.getElementById("message").classList.remove('hidden');
   }
}

function hasWon(){
  numOffSwitches = 0;
  for (i=0; i<BUTTONS.length; i++){
    var button =  BUTTONS[i];
    if (button.style.backgroundColor == 'red'){
      numOffSwitches++;
    }
  }
  return (numOffSwitches == BUTTONS.length);
}

function flipColor(element){
  if (element.style.backgroundColor == 'red'){
      element.style.backgroundColor = 'gray';
  }else{
      element.style.backgroundColor = 'red';
  }
}
function getPartner(index){
    while(true) {
    curr_index = (Math.floor(Math.random() * (NUM_BUTTONS)) + 1) -1;
    if (curr_index != index ){
        ASSOCIATION_MAP[index] = BUTTONS[curr_index];
        break;
    }
  }
}
