let first = { num: "", isInteger: true, };
let second = { num: "", isInteger: true, };
let operator = "";
let operationCompleted = false;
let maxDisplayChars = 10;

console.log(operate(Number(first.num), operator, Number(second.num)));

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
    let result = operate(Number(first.num), operator, Number(second.num));

    if (input == "ac") {
        resetValues();
    }

    if (input == "equals") {
        if (hasValue(second.num)) {
            display.textContent = result;
            setTileColors();
            operationCompleted = true;
        }
    }

    if (isNumber(input)) {
        if (operationCompleted) {
            resetValues();
        }
        
        if (isEmpty(operator)) {
            if (isValidLength(first.num)) {
                first.num += input;
                display.textContent = first.num;
            }
        }
        else if (isValidLength(second.num)) {
            second.num += input;
            display.textContent = second.num;
            setTileColors();
        }
    }

    if (isOperator(input)) {
        if (hasValue(second.num)) {
            resetValues();
            display.textContent = result;
            first.num = result;
            operator = input;
        }
        else if (hasValue(first.num)) {
                operator = input;
                setTileColors(input);
        }
    }

    if (input == "decimal") {
        if (isEmpty(operator) && first.isInteger) {
            if (isValidLength(first.num)) {
                first.num += ".";
                display.textContent = first.num;
                first.isInteger = false;
            }
        }
        else if (hasValue(operator) && second.isInteger) {
            if (isValidLength(second.num)) {
                second.num += ".";
                display.textContent = second.num;
                second.isInteger = false;
            }
        }
    }


    if (input == "backspace") {
        if (isEmpty(operator) && hasValue(first.num)) {
            first.num = removeLastCharFrom(first.num);
            display.textContent = first.num;
        } 
        else if (hasValue(operator) && isEmpty(second.num)) {
            operator = "";
            setTileColors();
        }
        else if (hasValue(second.num)) {
              second.num = removeLastCharFrom(second.num);
              display.textContent = second.num;  
        }
    }
};


function resetValues() {
    first.num = "";
    second.num = "";
    first.isInteger = true;
    second.isInteger = true;
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

function isValidLength(str) {
    return (str.length < maxDisplayChars) 
};

function removeLastCharFrom(str) {
    let arr = Array.from(str);
    let indexToRemove = (arr.length - 1);
    arr.splice(indexToRemove);
    return arr.join("");
}

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
    // check first digit after cutoff to determine how to round number 
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
