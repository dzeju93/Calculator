const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};


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

    const target = event.target;

    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        console.log('operator', target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDeclimal(target.value);
        updateDisplay();
        return;
    }

    if (target.classList.contains('all-clear')) {
        console.log('clear', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});


// funkcja, która nadpisuje wartość początkową ("0") na wyświetlaczu, zastępując ciągiem wprowadzonym klikaniem
function inputDigit(digit) {
    const { displayValue } = calculator;
    calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
};

// funkcja, która pozwala na wprowadzenie kropki dziesiętnej
function inputDeclimal(dot) {
    if (!calculator.displayValue.includes(dot)) { // 
        calculator.displayValue += dot;
    }
};