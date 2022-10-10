//Create variables for HTML query selectors
const buttons = document.querySelectorAll(
  ".Data-Number,.Data-Operator,.Data-AllClear,.Data-Equals,.Data-Decimal"
);
const displayPrimary = document.querySelector(".DisplayPrimary");

// variables to store display data
let displayValue = [];
let firstNumber = 0;
let previousNumber = 0;
let selectedOperand = "";
let previousOperand = "";
let ongoingTotal = [];
let operandCounter = 0;
let decimalCounter = 0;

// FUNCTIONS
function numbers(number) {
  displayValue += number;
  displayPrimary.textContent = displayValue;
}

function decimal(decimal) {
  if (decimalCounter >= 1) displayPrimary.textContent = displayValue;
  else {
    displayValue += decimal;
    displayPrimary.textContent = displayValue;
    decimalCounter++;
  }
}

function operand(operand) {
  if (operandCounter == 0 && ongoingTotal.length === 0) {
    operandCounter++;
    selectedOperand = buttonValue;
    previousOperand = buttonValue;
    firstNumber = parseFloat(displayValue);
    displayValue = [];
    displayPrimary.textContent = selectedOperand;
    decimalCounter = 0;
  } else {
    if (ongoingTotal.length === 0) {
      selectedOperand = buttonValue;
      previousNumber = parseFloat(displayValue);
      ongoingTotal = parseFloat(
        operate(firstNumber, previousNumber, previousOperand)
      );
      displayPrimary.textContent = ongoingTotal;
      displayValue = [];
      previousOperand = buttonValue;
      decimalCounter = 0;
    } else if (ongoingTotal.length != 0) {
      selectedOperand = buttonValue;
      firstNumber = parseFloat(displayValue);
      previousNumber = ongoingTotal;
      ongoingTotal = parseFloat(
        operate(previousNumber, firstNumber, previousOperand)
      );
      displayValue = [];
      previousOperand = buttonValue;
      displayPrimary.textContent = ongoingTotal;
      decimalCounter = 0;
    }
  }
}

function allClear() {
  displayValue = [];
  selectedOperand = "";
  previousOperand = "";
  ongoingTotal = [];
  operandCounter = 0;
  firstNumber = 0;
  previousNumber = 0;
  decimalCounter = 0;
  displayPrimary.textContent = displayValue;
}

function intermittentClear() {
  displayValue = [];
  selectedOperand = "";
  previousOperand = "";
  ongoingTotal = [];
  operandCounter = 0;
  firstNumber = 0;
  decimalCounter = 0;
}

// Operate Switch function
const operate = function (number1, number2, operator) {
  switch (operator) {
    case "+":
      return parseFloat(number1) + parseFloat(number2);
      break;
    case "-":
      return parseFloat(number1) - parseFloat(number2);
      break;
    case "*":
      return parseFloat(number1) * parseFloat(number2);
      break;
    case "/":
      return parseFloat(number1) / parseFloat(number2);
      break;
  }
};

function equals() {
  if (operandCounter === 0) {
    console.log("first statement hit");
    displayPrimary.textContent = displayValue;
  } else if (displayValue == 0 && selectedOperand == "/") {
    console.log("second statement hit");
    displayPrimary.textContent = "#DIV/0!";
    //intermittentClear()
  } else if (operandCounter == 0 || ongoingTotal.length === 0) {
    console.log("third statement hit");
    operateResult =
      Math.round(
        operate(firstNumber, displayValue, selectedOperand) * 10000000
      ) / 10000000;
    displayPrimary.textContent = operateResult;
    //intermittentClear()
  } else {
    console.log("fourth statement hit");
    firstNumber = displayValue;
    previousNumber = ongoingTotal;
    operateResult =
      Math.round(
        operate(previousNumber, firstNumber, selectedOperand) * 10000000
      ) / 10000000;
    displayPrimary.textContent = operateResult;
    //intermittentClear()
  }
  intermittentClear();
}

//EVENT LISTENERS
//Event listener for number buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-num"))) {
      numbers(buttonValue);
    }
  });
});

// '.' button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-decimal"))) {
      decimal(buttonValue);
    }
  });
});

// Equals button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("Data-Equals")) {
      equals();
    }
  });
});

// OPERAND event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-op"))) {
      operand(buttonValue);
    }
  });
});

// All clear button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("Data-AllClear")) {
      allClear();
    }
  });
});

//TODO: Keyboard support
document.addEventListener("keypress", (event) => {
  numbers(event.key);
});