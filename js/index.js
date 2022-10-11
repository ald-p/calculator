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
  "decimal": btn => btn.addEventListener('click', decBtnClicked, false),
  "erase": btn => btn.addEventListener('click', eraseBtnClicked, false)
}

const currentNumEl = document.getElementById('current-num');
const previousNumEl = document.getElementById('previous-num');
const btns = document.querySelectorAll('button');
btns.forEach( btn => btnFunc[btn.className](btn));
addEventListener('keydown', keyPressed, false);

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
    console.log(Number(val) / 100);
    return Number(val) / 100;
  }

  addDecimal() {
    if (this.current === '') {
      this.current = `0.`
    } else {
      this.current = `${this.current}.`;
    }
  }

  erase() {
    this.current = (this.current).slice(0, -1);
  }
}

const calc = new Calculator("", "", ""); // default

function numButtonsClicked(e) {
  if (!calc.previous && !calc.current && !calc.operator) {
    previousNumEl.style.visibility = 'hidden';
  }
  calc.current += getKeyOrClickVal(e);
  calc.renderVal(currentNumEl, calc.current);
  console.log(calc);
}

function opBtnClicked(e) {
  if (!calc.previous && !calc.current && !calc.operator) {
    return;
  }

  if (calc.previous && !calc.current) {
    calc.operator = getKeyOrClickVal(e);
    calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
    return;
  }

  if (calc.previous) {
    const result = calc.operate();
    calc.renderVal(currentNumEl, result);
    calc.previous = result;
    calc.operator = getKeyOrClickVal(e);
    calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
  } else {
    calc.previous = calc.current;
    calc.operator = getKeyOrClickVal(e);
    calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
  }
  calc.current = '';
  previousNumEl.style.visibility = 'visible';
  console.log(calc);
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
  const result = calc.operate();
  calc.renderVal(currentNumEl, result);
  calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator} ${calc.current}`);
  calc.previous = result;
  calc.current = '';
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
    calc.renderVal(previousNumEl, `${calc.previous} ${calc.operator}`);
  }
  console.log(calc);
}

function decBtnClicked() {
  if ((calc.current).includes('.')) return;
  calc.addDecimal();
  calc.renderVal(currentNumEl, calc.current);
}

function eraseBtnClicked() {
  calc.erase();
  if (calc.current === '') {
    calc.renderVal(currentNumEl, '0');
    return;
  }
  calc.renderVal(currentNumEl, calc.current);
}

function keyPressed(e) {
  if (Number.isInteger(Number(e.key))) {
    numButtonsClicked(e);
  } else if (e.key === "*" || e.key === "/" || e.key === "+") {
    opBtnClicked(e);
  } else if (e.key === "-") {
    if (!calc.previous && !calc.current && !calc.operator) {
      negPosBtnClicked();
    } else {
      opBtnClicked(e);
    }
  } else if (e.key === "Enter") {
    eqBtnClicked();
    console.log(calc);
  } else if (e.key === ".") {
    decBtnClicked();
  } else if (e.key === "Delete") {
    clearBtnClicked();
  } else if (e.key === "Backspace") {
    eraseBtnClicked();
  } else if (e.key === "%") {
    pctBtnClicked();
  }
}

function getKeyOrClickVal(e) {
  if (e.type === "click") {
    return e.currentTarget.getAttribute('data-value');
  } else {
    if (e.key === "*") {
      return "x";
    } else if (e.key === "/") {
      return "÷";
    } else {
      return e.key;
    }
  }
}


