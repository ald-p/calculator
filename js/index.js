const operators = {
  "+": (a, b) => a + b,
  "-": (a, b) => a - b,
  "x": (a, b) => a * b,
  "÷": (a, b) => a / b
}

const btnFunc = {
  "num": btn => btn.addEventListener('click', numButtonsClicked, false),
  "operator": btn => btn.addEventListener('click', opBtnClicked, false),
  "clear": btn => btn.addEventListener('click', clearBtnClicked, false),
  "equals": btn => btn.addEventListener('click', eqBtnClicked, false),
  "neg-pos": btn => btn.addEventListener('click', negPosBtnClicked, false),
  "percent": btn => btn.addEventListener('click', pctBtnClicked, false),
  "decimal": btn => btn.addEventListener('click', decBtnClicked, false)
}

const currentNumEl = document.getElementById('current-num');
const previousNumEl = document.getElementById('previous-num');
const btns = document.querySelectorAll('button');
btns.forEach( btn => btnFunc[btn.className](btn));

class Calculator {
  constructor(previous, current, operator) {
    this.previous = previous;
    this.current = current;
    this.operator = operator;
  }

  operate() {
    if (this.operator == "÷" && this.current == 0) {
      return "ERROR";
    } 
    const operationFunc = operators[this.operator];
    const result = operationFunc(Number(this.previous), Number(this.current));
    return Number.isInteger(result) ? result : result.toFixed(2);
  }

  renderVal(element, val) {
    element.textContent = val;
  }

  clear() {
    this.previous = '';
    this.current = '';
    this.operator = '';
  }

  addNeg() {
    this.current = `-${this.current}`;
  }

  getPct(val) {
    return val / 100;
  }

  addDecimal() {
    this.current = `${this.current}.`;
  }
}

const calc = new Calculator("", "", ""); // default

function numButtonsClicked(e) {
  if (!calc.previous && !calc.current && !calc.operator) {
    previousNumEl.style.visibility = 'hidden';
  }
  calc.current += e.currentTarget.getAttribute('data-value');
  calc.renderVal(currentNumEl, calc.current);
}

function opBtnClicked(e) {
  if (calc.previous) {
    const result = calc.operate();
    calc.renderVal(currentNumEl, result);
    calc.previous = result;
    calc.operator = e.currentTarget.getAttribute('data-value');
    calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
  } else {
    calc.previous = calc.current;
    calc.operator = e.currentTarget.getAttribute('data-value');
    calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
  }
  calc.current = '';
  previousNumEl.style.visibility = 'visible';
}

function clearBtnClicked() {
  calc.clear();
  calc.renderVal(currentNumEl, '0');
  previousNumEl.style.visibility = 'hidden';
}

function eqBtnClicked() {
  if (!calc.previous || !calc.current || !calc.operator) {
    return;
  }
  calc.renderVal(currentNumEl, calc.operate());
  calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator} ${calc.current}`);
  calc.clear();
}

function negPosBtnClicked() {
  calc.addNeg();
  calc.renderVal(currentNumEl, calc.current);
}

function pctBtnClicked() {
  if (!calc.previous) {
    calc.current = calc.getPct(calc.current);
    calc.renderVal(currentNumEl, calc.current);
  } else {
    calc.previous = calc.getPct(calc.previous);
    calc.renderVal(currentNumEl, calc.previous);
  }
}

function decBtnClicked() {
  if ((calc.current).includes('.')) return;
  calc.addDecimal();
  calc.renderVal(currentNumEl, calc.current);
}
