NUM_BUTTONS = 0;
HORIZONTAL_FACTOR = 4;
ASSOCIATION_MAP = {};
BUTTONS = new Array();
OFF_COLOR = 'gray';
ON_COLOR = 'gold';

function initialize(num_buttons){
  document.getElementById('introduction').classList.add('hidden');
  document.getElementsByClassName('button-area')[0].classList.remove('hidden');
  NUM_BUTTONS = parseInt(num_buttons);
  console.log(NUM_BUTTONS);
  initializeButtons();
}

function initializeButtons(){
    for (i=0; i < NUM_BUTTONS;i++){
          let button = document.createElement("button");
          let button_div = document.getElementsByClassName("button-area")[0];
          button.innerHTML = i+1;
          width = button_div.offsetWidth / HORIZONTAL_FACTOR;
          width_in_pixels = width + "px";
          button.style.width = width_in_pixels;
          button.addEventListener("click", flipState);
          button_div.appendChild(button);
          BUTTONS.push(button);

    }
    for(i=0; i< NUM_BUTTONS; i++){
      findPartner(i);
    }
    console.log(ASSOCIATION_MAP);
}

function validateForm(){
  console.log("validate");
  document.getElementById('introduction').classList.add('hidden');
}

function flipState(event){
   let targetElement = event.target;
   index = parseInt(targetElement.innerHTML) - 1;
   let partnerElement = ASSOCIATION_MAP[index];
   flipColor(targetElement);
   flipColor(partnerElement);
   if (hasWon()){
     let audio = new Audio('ta-da.mp3');
     audio.play();
     document.getElementsByClassName("button-area")[0].classList.add('hidden');
     document.getElementById("message").classList.remove('hidden');
   }
}

function hasWon(){
  let numOffSwitches = 0;
  for (i=0; i<BUTTONS.length; i++){
    let button =  BUTTONS[i];
    if (button.style.backgroundColor == OFF_COLOR){
      numOffSwitches++;
    }
  }
  return (numOffSwitches == BUTTONS.length);
}


function flipColor(element){
  if (element.style.backgroundColor == OFF_COLOR){
      element.style.backgroundColor = ON_COLOR;
  }else{
      element.style.backgroundColor = OFF_COLOR;
  }
}

function findPartner(index){
    while(true) {
      let curr_index = (Math.floor(Math.random() * (NUM_BUTTONS)) + 1) -1;
      if (curr_index != index ){
          ASSOCIATION_MAP[index] = BUTTONS[curr_index];
          break;
      }
    }
}
