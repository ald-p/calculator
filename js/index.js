const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "*": (a, b) => a * b,
  "/": (a, b) => a / b
}

class Calculator {
  constructor(prev, current, operator) {
    this.a = prev;
    this.b = current;
    this.operator = operator;
  }

  operate() {
    const operationFunc = operators[this.operator];
    const result = operationFunc(this.a, this.b);
    return result;
  }

  renderVal(element, val) {
    element.textContent = val;
  }
}

const calc = new Calculator(0, 0, "+"); // default
let previousVal = 0;
let currentVal = 0;
let operator;

const currentNumEl = document.getElementById('current-num');
const previousNumEl = document.getElementById('previous-num');
const numButtons = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');

const numButtonClicked = (e) => {
  currentVal = e.currentTarget.getAttribute('data-value');
  calc.b = Number(currentVal);
  console.log(calc)
  calc.renderVal(currentNumEl, currentVal);
}

const opBtnClicked = (e) => {
  operator = e.currentTarget.getAttribute('data-value');
  previousVal = currentVal;
  currentVal = 0;
  calc.a = previousVal;
  calc.b = currentVal;
  calc.operator = operator;
  previousNumEl.style.visibility = 'visible';
  calc.renderVal(previousNumEl, `${previousVal} ${operator}`);
  calc.renderVal(currentNumEl, currentVal);
}

numButtons.forEach( button => button.addEventListener('click', numButtonClicked, false));

operatorBtns.forEach( button => button.addEventListener('click', opBtnClicked, false));

