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

  addNeg() {
    this.current = `-${this.current}`;
  }
}

const calc = new Calculator("", "", ""); // default
const currentNumEl = document.getElementById('current-num');
const previousNumEl = document.getElementById('previous-num');
const btns = document.querySelectorAll('button');
btns.forEach( btn => btnFunc[btn.className](btn));

function numButtonsClicked(e) {
  if (!calc.previous && !calc.current && !calc.operator) {
    previousNumEl.style.visibility = 'hidden';
  }
  calc.current += e.currentTarget.getAttribute('data-value');
  calc.renderVal(currentNumEl, calc.current);
  console.log(calc)
}

function opBtnClicked(e) {
  calc.operator = e.currentTarget.getAttribute('data-value');
  calc.previous = calc.current;
  calc.current = '';
  calc.renderVal(currentNumEl, '0');
  previousNumEl.style.visibility = 'visible';
  calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
}

function clearBtnClicked() {
  calc.clear();
  calc.renderVal(currentNumEl, '0');
  previousNumEl.style.visibility = 'hidden';
}

function eqBtnClicked() {
  calc.renderVal(currentNumEl, calc.operate());
  calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator} ${calc.current}`);
  calc.clear();
}

function negPosBtnClicked() {
  calc.addNeg();
  calc.renderVal(currentNumEl, calc.current);
}

function pctBtnClicked() {

}

function decBtnClicked() {

}
