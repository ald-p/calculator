const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "x": (a, b) => a * b,
  "÷": (a, b) => a / b
}

class Calculator {
  constructor(previous, current, operator) {
    this.previous = previous;
    this.current = current;
    this.operator = operator;
  }

  operate() {
    const operationFunc = operators[this.operator];
    const result = operationFunc(Number(this.previous), Number(this.current));
    return result;
  }

  renderVal(element, val) {
    element.textContent = val;
  }

  clear() {
    this.previous = '';
    this.current = '';
    this.operator = '';
  }
}

const calc = new Calculator("", "", ""); // default
console.log(calc);

const currentNumEl = document.getElementById('current-num');
const previousNumEl = document.getElementById('previous-num');
const numButtons = document.querySelectorAll('.num');
const operatorBtns = document.querySelectorAll('.operator');
const equalBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');

const numButtonClicked = (e) => {
  if (!calc.previous && !calc.current && !calc.operator) {
    previousNumEl.style.visibility = 'hidden';
  }
  calc.current += e.currentTarget.getAttribute('data-value');
  console.log(calc);
  calc.renderVal(currentNumEl, calc.current);
}

const opBtnClicked = (e) => {
  calc.operator = e.currentTarget.getAttribute('data-value');
  calc.previous = calc.current;
  calc.current = '';
  calc.renderVal(currentNumEl, '0');
  previousNumEl.style.visibility = 'visible';
  calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
  console.log(calc);
}

const eqBtnClicked = () => {
  calc.renderVal(currentNumEl, calc.operate());
  calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator} ${calc.current}`);
  calc.clear();
  console.log(calc);
}

const clearBtnClicked = () => {
  calc.clear();
  calc.renderVal(currentNumEl, '0');
  previousNumEl.style.visibility = 'hidden';
}

numButtons.forEach( button => button.addEventListener('click', numButtonClicked, false));
operatorBtns.forEach( button => button.addEventListener('click', opBtnClicked, false));
equalBtn.addEventListener('click', eqBtnClicked, false);
clearBtn.addEventListener('click', clearBtnClicked, false);
