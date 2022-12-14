const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function operate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function del(){
  calculator.displayValue = calculator.displayValue.slice(0, -1);
}

function percentage() {
  if(calculator.displayValue !== ''){
    calculator.displayValue = calculator.displayValue / 100;
    display.value = calculator.displayValue;
  }
  else{
    calculator.displayValue = '0';
  }
}

function invertSign() {
  if(calculator.displayValue !==''){
    calculator.displayValue = calculator.displayValue * -1;
    display.value = calculator.displayValue;
  }
  else{
    calculator.displayValue ='0';
  }
}

function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
  	calculator.displayValue = "0."
    calculator.waitingForSecondOperand = false;
    return
  }

  if (!calculator.displayValue.includes(dot)) {
    calculator.displayValue += dot;
  }
}

function allClear() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator
  const inputValue = parseFloat(displayValue);
  
  if (operator && calculator.waitingForSecondOperand)  {
    calculator.operator = nextOperator;
    return;
  }
  if (firstOperand == null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.value = calculator.displayValue.substring(0,9);
}

updateDisplay();

const keys = document.querySelector('.keys');
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  }

  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '=':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
      allClear();
      break;
    case 'del':
      del();
      break;
    case '%':
      percentage();
      break;
    case '+/-':
      invertSign();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      }
  }

  updateDisplay();
});