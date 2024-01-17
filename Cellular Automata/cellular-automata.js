
/* add the chosen rule and initialization type into text in the html message boxes  */

function displayMessage(rule, centered) {
    const body = document.body;
    const panel = document.createElement('div');
    panel.setAttribute('class', 'msgBox01');
    body.appendChild(panel);

    const msg01 = document.createElement('p');
    msg01.textContent = 'You chose rule number ' + rule;
    panel.appendChild(msg01);

    const msg02 = document.createElement('p');
    if (centered == true) {
        msg02.textContent = 'You chose centered cell initialization';
    } else {
        msg02.textContent = 'You chose random cell initialization';
    }
    panel.appendChild(msg02);

    const msg03 = document.createElement('p');
    msg03.textContent = 'Reload the page to see different rules for both centered and random initialization!';
    panel.appendChild(msg03);
}

function displayMessage02() {
    const body = document.body;
    const panel = document.createElement('div');
    panel.setAttribute('class', 'msgBox02');
    body.appendChild(panel);

    const msg = document.createElement('p');
    msg.textContent = 'In mathematics and computability theory, an elementary cellular automaton is a one-dimensional' +
    'cellular automaton where there are two possible states (labeled 0 and 1) and the rule to determine the state of a cell' +
     'in the next generation depends only on the current state of the cell and its two immediate neighbors.' +
     '   - Wikipedia'
    panel.appendChild(msg);

}

/* ----------------------------------------------------------------- */
// main function to run program 
function Run() {
   let rule = setRule(); // get rule from user 
   //let config = new Array(100);
   let centered = setInitialization(); // get initialization style from user, either centered or random
   let config = initialize(centered);

    displayMessage(rule, centered);
   displayMessage02();
   drawState(config, rule);
} // run

function setRule() {
    let ruleNum = -1;
    while (ruleNum < 0 || ruleNum > 255) {
        ruleNum = Number(prompt("What rule number would you like to see (0-255)?: ", "57"));
    }
    return ruleNum;
} // setRule

function setInitialization() {
    let option = window.prompt('Type "c" to initialize centered, type "r" to initialize random', 'c');
    let centered;
    while (option !== "c" && option !== "r"){
        option = prompt("Invalid input. Choose between 'c' or 'r'")
    } 
    if (option == 'c') {
       centered = true;
    } else {
       centered = false;
    }
    return centered;
} // setInitialization



/* function to initialize to one live cell in the center */
function initialize(centered) {
    let config = new Array(100);
    if (centered == true) {
        for (let i = 0; i < config.length; i++) {
            config[i] = 0;
        } // for i
        // prevents me from having to manually change the center if I change the number of cells 
        config[Math.floor(config.length/2)] = 1;
    } else {
        for (let i = 0; i < config.length; i++) {
            config[i] =  Math.round(Math.random());
        }
    }
   return config;
} // initialize
/* ----------------------------------------------------- */
// apply rule to update each gen  
function applyRule(config, rule) {
    let binaryRule = rule.toString(2).padStart(8, '0');
    let updatedState = new Array(config.length);
    let prev = 0;
    let next = 0;
    let neighborhood;
        for (let i = 0; i < config.length; i++) {
            if (i == 0) {
                prev = config.length - 1;
            }
            else {
                prev = i - 1;
            }
            if (i == (config.length - 1)) {
                next = 0;
            } else {
                next = i + 1;
            }
     
            neighborhood = config[prev].toString() + config[i].toString() + config[next].toString();
            
            // set the relevant cell in updatedState to the proper value
            switch(neighborhood) {
     
                case "111":
                    updatedState[i] = binaryRule[0];
                    break;
                case "110":
                    updatedState[i] = binaryRule[1];
                    break;
                case "101":
                    updatedState[i] = binaryRule[2];
                    break;
                case "100":
                    updatedState[i] = binaryRule[3];
                    break;
                case "011":
                    updatedState[i] = binaryRule[4];
                    break;
                case "010":
                    updatedState[i] = binaryRule[5];
                    break;
                case "001":
                    updatedState[i] = binaryRule[6];
                    break;
     
                case "000":
                    updatedState[i] = binaryRule[7];
                    break;
            } // switch 
    } // for i

    for (let i = 0; i < config.length; i++) {
        config[i] = updatedState[i];
    }
    return config;
} // applyRule

//
/* -----------------------------------------------------*/
// draws the simulation in the webpage container 
function drawState(config, rule, centered) {
   const canvas = document.querySelector(".grid-layout");
   // iterate 100 times (100 gens)
   for (let i = 0; i < config.length; i++) {
        // iterate each 100 cells in the neighborhood
       for (let j = 0; j < config.length; j++) {
           const cell = document.createElement("div");
           cell.classList.add("cell");
           cellColor = `rgb(${29}, ${185}, ${84})`;
           if (config[j] == 1) {
               cellColor = "black";
           }
           cell.style.backgroundColor = cellColor;
           canvas.appendChild(cell);
       } // for j
       config = applyRule(config, rule);
   } // for i
} // drawState

module.exports = { applyRule };