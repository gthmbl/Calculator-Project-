// Access DOM elements of the calculator

const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');


// Define expression and result variable

let expression = '';
let result = '';

// Define event handler for button clicks

function buttonClick(event) {

    // Get values from clicked button

    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    // console.log(target, action, value);

    //Switch case to control the calculator
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
            
            // Add result to expression as a starting point if expression is empty
        
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if (expression === '' && result !== '') {
                startFromResult(value);
            }   else if (expression !== '' && !isLastCharOperator
            ()) {
                addValue(value)
            }
            break;

        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
    }

    //Update display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

function addValue(value) {
    if (value === '.') {
        // Split the expression by operators to get the current number segment
        const segments = expression.split(/[+\-*/]/);
        const lastSegment = segments[segments.length - 1];

        // Only add a decimal if the current segment doesn't already contain one
        if (!lastSegment.includes('.')) {
            expression += value;
        }
    } else { 
        expression += value;
    }
}


function updateDisplay(expression, result) {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

function clear() {
    expression = '';
    result = '';
}

function backspace() {
    expression = expression.slice(0, -1);
}

function isLastCharOperator() {
    return isNaN(parseInt(expression.slice(-1)));
}

function startFromResult(value) {
    expression += result + value;
}

function submit() {
    result = evaluateExpression();
    expression = '';
}

function evaluateExpression() {
    const evalResult = eval(expression);
    // checks if evalResult isNaN or infinite.
    return isNaN(evalResult) || !isFinite(evalResult)
    ? ' '
    : evalResult < 1 
    ? parseFloat(evalResult.toFixed(10)) 
    : parseFloat(evalResult.toFixed(2));
}

function negate() {
    // negate funciton if expression is empty and result is present
    if (expression === '' && result !== '') {
        result = -result;
        // toggle sign of expression if it's not already negative and not empty
    } else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
        // remove minus sign from expression if it's already negative
    } else if (expression.startsWith('-')){
        expression = expression.slice(1);
    }
}

function percentage() {
    // evaluate the expression, or else it will only take percentage of first number
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result /= 100;
        } else {
          result = '';
        }
    } else if (result !== '') {
        result = parseFloat(result) / 100;
    }
}

function decimal(value) {
    if (!expression.endsWith('.') && !isNaN(expression.slice(-1))) {
        addValue(value)
    }
} 

