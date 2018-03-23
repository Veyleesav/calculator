var numbers = document.querySelectorAll('.number'),
    operations = document.querySelectorAll('.operation'),
    clearButtons = document.querySelectorAll('.clear-btn'),
    decimalButton = document.getElementById('decimal'),
    instructionButton = document.getElementById('howWork'),
    display = document.getElementById('display'),
    operationsList = document.getElementById('operationsList'),
    currentNumber = 0,
    newNumber = false,
    pendingOperation = '';

for (var i = 0; i < numbers.length; i++) {
    var number = numbers[i];
    number.addEventListener('click', function (e) {
        pressNumber(e.target.textContent);
    });
}
for (var j = 0; j < operations.length; j++) {
    var operationBtn = operations[j];
    operationBtn.addEventListener('click', function (e) {
        operation(e.target.textContent);
    });
}
for (var x = 0; x < clearButtons.length; x++) {
    var clearBtn = clearButtons[x];
    clearBtn.addEventListener('click', function (e) {
        clear(e.target.id);
    });
}
decimalButton.addEventListener('click', decimal);
instructionButton.addEventListener('click', howWork);

function pressNumber(number) {
    if (newNumber) {
        display.value = number;
        newNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}

function operation(op) {
    var localOperationMemory = display.value;

    if (newNumber && pendingOperation !== '=') {
        display.value = currentNumber;
    } else {
        newNumber = true;
        if (pendingOperation === '+') {
            currentNumber += parseFloat(localOperationMemory);
        } else if (pendingOperation === '-') {
            currentNumber -= parseFloat(localOperationMemory);
        } else if (pendingOperation === '*') {
            currentNumber *= parseFloat(localOperationMemory);
        } else if (pendingOperation === '/') {
            currentNumber /= parseFloat(localOperationMemory);
        } else {
            currentNumber = parseFloat(localOperationMemory);
        }
        display.value = currentNumber;
        pendingOperation = op;
    }
}

function decimal() {
    var localDecimalMemory = display.value;

    if (newNumber) {
        localDecimalMemory = '0.';
        newNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}

function clear(id) {
    if (id === 'ce') {
        display.value = '0';
        newNumber = true;
    } else if (id === 'c') {
        display.value = '0';
        newNumber = true;
        currentNumber = 0;
        pendingOperation = '';
    }
}

function howWork() {
    if (howWork.uniqueTest !== 1) {

        for (i = 0; i < operations.length; i++) {

            var newLi = document.createElement('li');
            newLi.innerText = operations[i].value;
            operationsList.appendChild(newLi);
        }
        howWork.uniqueTest = 1;
    }
    else {

        while (operationsList.firstChild) {
            operationsList.removeChild(operationsList.firstChild);
        }
        howWork.uniqueTest = 0;
    }
}
