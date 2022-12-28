class Calculator {
  constructor(prevOpText, curOpText) {
    this.prevOpText = prevOpText;
    this.curOpText = curOpText;
    this.clear();
  }

  // we'll make different method for different-2 operations

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const currrent = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(currrent)) return;
    switch (this.operation) {
      case "+":
        computation = prev + currrent;
        break;
      case "-":
        computation = prev - currrent;
        break;
      case "×":
        computation = prev * currrent;
        break;
      case "÷":
        computation = prev / currrent;
        break;
      default:
        break;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.curOpText.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.prevOpText.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    }else{
        this.prevOpText.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll("[data-num]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const prevOpText = document.querySelector("[data-prev-op]");
const curOpText = document.querySelector("[data-cur-op]");

const calculator = new Calculator(prevOpText, curOpText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
