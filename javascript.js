let firstNum = "";
let secondNum = "";
let operator = "";
let operationCompleted = false;

const tiles = {
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
    if (input == "ac" || (operationCompleted && isNumber(input))) {
        resetValues();
        if (input == "ac") return;
    };

    // check secondNum for value early so using operators as pseudo-equals button 
    // doesn't result in endless loop
    if (hasValue(secondNum)) {
        let result = operate(Number(firstNum), operator, Number(secondNum));
        
        if (input == "equals") {          
            display.textContent = result;
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

    if (isEmpty(operator) && isNumber(input)) {
        firstNum += input;
        display.textContent = firstNum;
        return;
    };

    if (hasValue(firstNum) && isOperator(input)) {
        operator = input;
        setTilesTo("white");
        tiles[input].style.backgroundColor = "DarkSeaGreen";
        return;
    };

    if (hasValue(operator) && isNumber(input)) {
        secondNum += input;
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

function trim(number, length = 10) {
    let arr = Array.from(String(number));
    // check first digit after cutoff, and trim accordingly
    if (arr[length] >= 5) arr[(length - 1)]++; 
    arr.splice(length);
    return Number(arr.join(""));
}


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