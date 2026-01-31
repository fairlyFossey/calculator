const operandA = { value: "", isInteger: true, };
const operandB = { value: "", isInteger: true, };
const operator = {
    value: "",
    symbols: ["+", "-", "*", "/"],
    descriptors: ["add", "subtract", "multiply", "divide"]
};
let operationCompleted = false;
let maxDisplayChars = 10;

const display = document.querySelector("#display");
const tiles = {
    add: document.querySelector("#add"),
    subtract: document.querySelector("#subtract"),
    multiply: document.querySelector("#multiply"),
    divide: document.querySelector("#divide"),
};

const btns = document.querySelectorAll(".btn");
btns.forEach((button) => {
    button.addEventListener("click", () => {
        getResultOf(button.id);
    });
});

document.addEventListener("keydown", (event) => {
    let input = translateInput(event.key);
    getResultOf(input);
    
});


function getResultOf(input) {
    let result = operate(operandA.value, operator.value, operandB.value);

    if (input == "ac") {
        resetValues();
    }

    if (input == "equals") {
        if (isPopulated(operandB.value)) {
            display.textContent = result;
            setTileColors();
            operationCompleted = true;
        }
    }

    if (isNumber(input)) {
        if (operationCompleted) resetValues();
 
        if (isEmpty(operator.value)) {
            append(input, operandA);
            display.textContent = operandA.value;
        } else {
            append(input, operandB);
            display.textContent = operandB.value;
            setTileColors();
        }
    }

    if (isOperator(input)) {
        if (isPopulated(operandB.value)) {
            resetValues();
            display.textContent = result;
            operandA.value = result;
            operator.value = input;
        } else if (isPopulated(operandA.value)) {
                operator.value = input;
                setTileColors(input);
        }
    }

    if (input == "decimal") {
        if (isEmpty(operator.value) && operandA.isInteger) {
            append(".", operandA);
            display.textContent = operandA.value;
            operandA.isInteger = false;
        } else if (isPopulated(operator.value) && operandB.isInteger) {
            append(".", operandB);
            display.textContent = operandB.value;
            operandB.isInteger = false;
        }
    }


    if (input == "backspace" ) {
        if (isEmpty(operator.value) && isPopulated(operandA.value)) {
            operandA.value = removeLastCharFrom(operandA.value);
            display.textContent = operandA.value;
        } else if (isPopulated(operator.value) && isEmpty(operandB.value)) {
            operator.value = "";
            setTileColors();
        } else if (isPopulated(operandB.value) && operationCompleted == false) {
              operandB.value = removeLastCharFrom(operandB.value);
              display.textContent = operandB.value;  
        }
    }
};


function translateInput(input) {
    if (isOperator(input)) {
        return getDescriptor(input);
    } else if (input == "=" || input == "Enter" ) {
        return "equals";
    } else if (input == "Delete") {
        return "ac";
    } else if (input == ".") {
        return "decimal";
    } else {
        return input.toLowerCase();
    }
};

function getDescriptor(str) {
    let i = operator.symbols.findIndex(item => item == str);
    return operator.descriptors[i];
};

function resetValues() {
    operandA.value = "";
    operandB.value = "";
    operandA.isInteger = true;
    operandB.isInteger = true;
    operator.value = "";
    operationCompleted = false;
    display.textContent = "";
    setTileColors();
};

function setTileColors(str = "") {
    for (const tile in tiles) {
        tiles[tile].style.backgroundColor = "white";
    }
    if (str != "") {
        tiles[str].style.backgroundColor = "DarkSeaGreen";
    }
};

function append(input, obj) {
    if (obj.value.length < maxDisplayChars) {
        obj.value += input;
    }
};

function removeLastCharFrom(str) {
    let arr = Array.from(str);
    let indexToRemove = (arr.length - 1);
    arr.splice(indexToRemove);
    return arr.join("");
};


function operate(str, operator, otherStr) {
    let firstNum = Number(str);
    let secondNum = Number(otherStr);

    switch (operator) {
        case "add":
            return add(firstNum, secondNum);
        case "subtract":
            return subtract(firstNum, secondNum);
        case "multiply":
            return multiply(firstNum, secondNum);
        case "divide":
            if (divide(firstNum, secondNum) == 0) {
                return "Congrats, now you get nothing.";
             } else { 
                return divide(firstNum, secondNum);
             }
        default:
            return;
    }
};

function add(a, b) {
    let result = a + b;
    return trim(result);
};

function subtract(a, b) {
    let result = a - b;
    return trim(result);
};

function multiply(a, b) {
    let result = a * b;
    return trim(result);
};

function divide(a, b) {
    let result = (a == 0 || b == 0) ? 0 : (a / b);
    return trim(result);
};

function trim(number) {
    let arr = Array.from(String(number));
    // check digit after cutoff to determine how to round number 
    if (arr[maxDisplayChars] >= 5) arr[(maxDisplayChars - 1)]++; 
    arr.splice(maxDisplayChars);
    return Number(arr.join(""));
};


function isEmpty(str) {
    return (str == "");
};

function isNumber(str) {
    return (Number(str) >= 0);
};

function isPopulated(str) {
    return (str != "");
};

function isOperator(str) {
    for (let i = 0; i < operator.descriptors.length; i++) {
        if (str == operator.descriptors[i] || str == operator.symbols[i]) {
            return true;
        }
    }
};
