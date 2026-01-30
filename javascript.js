let firstNum = "";
let secondNum = "";
let operator = "";
let operationCompleted = false;

let tiles = {
    add: document.querySelector("#add"),
    subtract: document.querySelector("#subtract"),
    multiply: document.querySelector("#multiply"),
    divide: document.querySelector("#divide"),
}


const display = document.querySelector("#displaySpan");
const btns = document.querySelectorAll(".btn");
btns.forEach((button) => {
    button.addEventListener("click", () => {
        evaluateInput(button.id);
    });
});



function evaluateInput(input) {
    // if AC pressed or OperationCompleted true: clear all variables, wipe display, and exit function (if AC)
    if (input == "ac" || operationCompleted == true) {
        resetValues();
        if (input == "ac") return;
    };
    // if secondNum has value, call operate()
    // we check this early in function so using operators as pseudo-equals button 
    // doesn't result in endless loop
    if (hasValue(secondNum)) {
        let result = operate(Number(firstNum), operator, Number(secondNum));
        
        if (input == "equals") {          
            // write result to display
            display.textContent = result;
            // unshade selected operator
            setTilesTo("white");
            operationCompleted = true;
        };

        // preserves results so you can do additional operations on the data
        if (isOperator(input)) {
            resetValues();
            display.textContent = result;
            firstNum = result;
            operator = input;
        };
    };
    // if operator is undefined, write/concatenate number inputs to firstNum
    if (isEmpty(operator) && isNumber(input)) {
        firstNum += input;
        // write to display
        display.textContent = firstNum;
        return;
    };
    // if firstNum has a value, write operator inputs to operator variable
    if (hasValue(firstNum) && isOperator(input)) {
        operator = input;
        // shade selected operator, resetting any previously shaded operators
        setTilesTo("white");
        tiles[input].style.backgroundColor = "DarkSeaGreen";
        return;
    };
    // if operator has value, then number inputs are stored/concatenate to secondNum
        // also check if secondNum has value so that 
    if (hasValue(operator) && isNumber(input)) {
        secondNum += input;
        // display switches to displaying secondNum
        display.textContent = secondNum;
    };
;}

function resetValues() {
    firstNum = "";
    secondNum = "";
    operator = "";
    operationCompleted = false;
    display.textContent = "";
    setTilesTo("white");
}

function setTilesTo(str) {
    for (const tile in tiles) {
            tiles[tile].style.backgroundColor = str;
        }
};

function isEmpty(str) {
    return (str == "");
};

function isNumber(str) {
    return (Number(str) >= 0);
};

function hasValue(str) {
    return (str != "");
};

function isOperator(str) {
    if (str == "add" || str == "subtract" || str == "multiply" || str == "divide") {
        return true;
    }
};


function operate(firstNum, operator, secondNum) {
    switch (operator) {
        case "add":
            return add(firstNum, secondNum);
            break;
        case "subtract":
            return subtract(firstNum, secondNum);
            break;
        case "multiply":
            return multiply(firstNum, secondNum);
            break;
        case "divide":
            if (divide(firstNum, secondNum) == 0) {
                return "Congrats, now you get nothing.";
             } else { 
                return divide(firstNum, secondNum);
             };
            break;
        default:
            console.log("An unexpected string was used as an operator in operate()");
    };
};

function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return (a == 0 || b == 0) ? 0 : (a / b);
};