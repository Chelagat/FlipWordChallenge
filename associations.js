NUM_BUTTONS = 0;
HORIZONTAL_FACTOR = 4;
ASSOCIATION_MAP = {};
BUTTONS = new Array();
OFF_COLOR = 'gray';
ON_COLOR = 'gold';
DEFAULT_NUM_BUTTONS = 4;
DEFAULT_NUM_ASSOCIATIONS = 1;
DURATION = 10
DEFAULT_DURATION = 30
NUM_ASSOCIATIONS = 1;
PLAYER_NAME = "Stranger";

let timerElem = document.getElementById('timer');
function initialize(){
    buttonsInput = document.getElementById("numButtons").value;
    associationsInput = document.getElementById("numAssociations").value;
    PLAYER_NAME = document.getElementById("playerName").value;
    durationInput = document.getElementById("duration").value;
    DURATION = isValidNum(durationInput)? durationInput: DEFAULT_DURATION;
    num_buttons_input = parseInt(buttonsInput);
    num_associations_input = parseInt(associationsInput);
    NUM_BUTTONS = isValidNum(num_buttons_input)?num_buttons_input: DEFAULT_NUM_BUTTONS;
    NUM_ASSOCIATIONS = isValidNum(num_associations_input)?num_associations_input: DEFAULT_NUM_ASSOCIATIONS;
    HORIZONTAL_FACTOR = Math.floor(Math.sqrt(NUM_BUTTONS));
    console.log('HORIZONTAL_FACTOR', HORIZONTAL_FACTOR);
    document.getElementById('introduction').classList.add('hidden');
    document.getElementsByClassName('button-area')[0].classList.remove('hidden');
    initializeButtons();
    timeLeft = DURATION;
    timerId = setInterval(countDown,1000);

}

function isValidNum(value){
  return !isNaN(value) && isFinite(value) && value > 1
}

function countDown() {
  if (timeLeft == 0) {
    endGame(false);
  } else {
    timerElem.innerHTML = timeLeft + ' seconds remaining';
    timeLeft--;
  }
}

function endGame(playerWon){
  clearTimeout(timerId);
  timerElem.classList.add('hidden');
  document.getElementsByClassName("button-area")[0].classList.add('hidden');
  if (playerWon){
    let audio = new Audio('ta-da.mp3');
    audio.play();
    document.getElementById("message").classList.remove('hidden');
    document.getElementById("header_1").innerHTML = "You Won!"
    document.getElementById("header_2").innerHTML = "Good job,"+PLAYER_NAME+"!";
  }else{
    let audio = new Audio('you-lose.mp3');
    audio.play();
    document.getElementById("message").classList.remove('hidden');
    document.getElementById("header_1").innerHTML = "You Lost :("
    document.getElementById("header_2").innerHTML = "Better luck next time, "+PLAYER_NAME+"!";
  }

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
       findPartners(i);
    }

    console.log("AssociationMap: ",ASSOCIATION_MAP)
}

function validateForm(){
    console.log("validate");
    document.getElementById('introduction').classList.add('hidden');
}

function flipState(event){
     let targetElement = event.target;
     index = parseInt(targetElement.innerHTML) - 1;
     flipColor(targetElement);
     let partnerElements = ASSOCIATION_MAP[index];
     console.log("partner elements of index: ",index," are: ",partnerElements)
     for (let i= 0; i < partnerElements.length; i++){
        let partnerElement = partnerElements[i];
        flipColor(partnerElement);
     }

     if (gameWon()){
         endGame(true);
     }
}

function gameWon(){
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
  element.style.backgroundColor = (element.style.backgroundColor == OFF_COLOR)? ON_COLOR: OFF_COLOR;
}

function getValidPartner(index, partnerIndexes){
    while(true){
      let curr_index = (Math.floor(Math.random() * (NUM_BUTTONS)) + 1) -1;
      if (curr_index != index && !(partnerIndexes.has(curr_index))){
          return curr_index;
      }
    }
}


function findPartners(index){
    let partnerIndexes = new Set()
    for (let i=0; i<NUM_ASSOCIATIONS; i++) {
      let partner_index = getValidPartner(index,partnerIndexes);
      partnerIndexes.add(partner_index);
      if (index in ASSOCIATION_MAP) {
        ASSOCIATION_MAP[index].push(BUTTONS[partner_index]);
      }else{
        ASSOCIATION_MAP[index] = [BUTTONS[partner_index]];
      }
    }
}
