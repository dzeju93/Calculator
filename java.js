const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// funkcja, która nadpisuje wartość początkową ("0") na wyświetlaczu, zastępując ciągiem wprowadzonym klikaniem
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;

    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } else {
        calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
    }

    console.log(calculator);
};

// funkcja, która pozwala na wprowadzenie kropki dziesiętnej
function inputDeclimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
        calculator.displayValue = "0."
        calculator.waitingForSecondOperand = false;
        return
    }

    if (!calculator.displayValue.includes(dot)) { // 
        calculator.displayValue += dot;
    }
};

// funkcja dzięku której po naciśnięciu operatora wyświetlana wartość jest konwertowana na liczbę zmiennoprzecinkową
function handleOperator(nextOperator) {
    const { firstOperand, displayValue, operator } = calculator
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
};

function calculate(firstOperand, secondOperand, operator) {
    if (operator === "+") {
        return firstOperand + secondOperand;
    } else if (operator === "-") {
        return firstOperand - secondOperand;
    } else if (operator === "*") {
        return firstOperand * secondOperand;
    } else if (operator === "/") {
        return firstOperand / secondOperand;
    }

    return secondOperand;
};

// funkcja, która resetuje kalkulator do ustawień domyślnych
function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function updateDisplay() {
    const display = document.querySelector(".calculator-screen"); // wybiera element HMTL który stanowi wyświetlacz
    display.value = calculator.displayValue;
}

// Włączenie funkcji ^
updateDisplay();

// nasłuchowanie kliknięć 
// po każdym typie (operator/kropka/AC/itp.) jest funkcja updateDisplay, która odświeża wyświetlacz kalkulatora
const keys = document.querySelector('.calculator');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDeclimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});