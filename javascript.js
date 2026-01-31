let operandA = { value: "", isInteger: true, };
let operandB = { value: "", isInteger: true, };
let operator = "";
let operationCompleted = false;
let maxDisplayChars = 10;

const display = document.querySelector("#display");
const tiles = {
    add: document.querySelector("#add"),
    subtract: document.querySelector("#subtract"),
    multiply: document.querySelector("#multiply"),
    divide: document.querySelector("#divide"),
}
const btns = document.querySelectorAll(".btn");
btns.forEach((button) => {
    button.addEventListener("click", () => {
        getResultOf(button.id);
    });
});


function getResultOf(input) {
    let result = operate(operandA.value, operator, operandB.value);

    if (input == "ac") {
        resetValues();
    }

    if (input == "equals") {
        if (hasValue(operandB.value)) {
            display.textContent = result;
            setTileColors();
            operationCompleted = true;
        }
    }

    if (isNumber(input)) {
        if (operationCompleted) resetValues();
 
        if (isEmpty(operator)) {
            append(input, operandA);
            display.textContent = operandA.value;
        } else {
            append(input, operandB);
            display.textContent = operandB.value;
            setTileColors();
        }
    }

    if (isOperator(input)) {
        if (hasValue(operandB.value)) {
            resetValues();
            display.textContent = result;
            operandA.value = result;
            operator = input;
        }
        else if (hasValue(operandA.value)) {
                operator = input;
                setTileColors(input);
        }
    }

    if (input == "decimal") {
        if (isEmpty(operator) && operandA.isInteger) {
            append(".", operandA);
            display.textContent = operandA.value;
            operandA.isInteger = false;
        }
        else if (hasValue(operator) && operandB.isInteger) {
            append(".", operandB);
            display.textContent = operandB.value;
            operandB.isInteger = false;
        }
    }


    if (input == "backspace" ) {
        if (isEmpty(operator) && hasValue(operandA.value)) {
            operandA.value = removeLastCharFrom(operandA.value);
            display.textContent = operandA.value;
        } 
        else if (hasValue(operator) && isEmpty(operandB.value)) {
            operator = "";
            setTileColors();
        }
        else if (hasValue(operandB.value) && operationCompleted == false) {
              operandB.value = removeLastCharFrom(operandB.value);
              display.textContent = operandB.value;  
        }
    }
};


function resetValues() {
    operandA.value = "";
    operandB.value = "";
    operandA.isInteger = true;
    operandB.isInteger = true;
    operator = "";
    operationCompleted = false;
    display.textContent = "";
    setTileColors();
};

function setTileColors(str = "") {
    for (const tile in tiles) {
        tiles[tile].style.backgroundColor = "white";
    }
    if (hasValue(str)) {
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
}

function operate(str, operator, otherStr) {
    let firstNum = Number(str);
    let secondNum = Number(otherStr);

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
             }
            break;
        default:
            break;
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

function hasValue(str) {
    return (str != "");
};

function isOperator(str) {
    if (str == "add" || str == "subtract" || str == "multiply" || str == "divide") {
        return true;
    }
};
