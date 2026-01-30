let first = {
    num: "",
    hasDecimal: false,
};
let second = {
    num: "",
    hasDecimal: false,
};
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
    if (input == "ac" || (operationCompleted && isNumberChar(input))) {
        resetValues();
        if (input == "ac") return;
    };

    // check second.num for value early so using operators as pseudo-equals button 
    // doesn't result in endless loop
    if (hasValue(second.num)) {
        let result = operate(Number(first.num), operator, Number(second.num));
        
        if (input == "equals") {          
            display.textContent = result;
            setTilesTo("white");
            operationCompleted = true;
        };

        // preserves results so you can do additional operations on the data
        if (isOperator(input)) {
            resetValues();
            display.textContent = result;
            first.num = result;
            operator = input;
        };
    };

    if (isEmpty(operator) && isNumberChar(input)) {
        if (input == "." && first.hasDecimal) {
            return;
        } else if (input == ".") {
            first.hasDecimal = true;
        }
        first.num += input;
        display.textContent = first.num;
        return;
    };

    if (hasValue(first.num) && isOperator(input)) {
        operator = input;
        setTilesTo("white");
        tiles[input].style.backgroundColor = "DarkSeaGreen";
        return;
    };

    if (hasValue(operator) && isNumberChar(input)) {
        if (input == "." && second.hasDecimal) {
            return;
        } else if (input == ".") {
            second.hasDecimal = true;
        }
        second.num += input;
        display.textContent = second.num;
    };
;}


function resetValues() {
    first.num = "";
    second.num = "";
    first.hasDecimal = false;
    second.hasDecimal = false;
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

function isNumberChar(str) {
    return (Number(str) >= 0 || str == ".");
};

function hasValue(str) {
    return (str != "");
};

function isOperator(str) {
    if (str == "add" || str == "subtract" || str == "multiply" || str == "divide") {
        return true;
    }
};