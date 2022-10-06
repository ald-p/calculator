class Calculation {
  constructor(num1, num2, operator) {
    this.a = num1;
    this.b = num2;
    this.operator = operator;
  }

  operate() {
    const operators = {
      "+": (a, b) => a + b,
      "-": (a, b) => a - b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b
    }
    const operationFunc = operators[this.operator];
    const result = operationFunc(this.a, this.b);
    return result;
  }
}