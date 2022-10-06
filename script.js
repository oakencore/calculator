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

//Event listener for number buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-num"))) {
      displayValue += buttonValue;
      displayPrimary.textContent = displayValue;
    }
  });
});

// . button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-decimal"))) {
      displayValue += buttonValue;
      displayPrimary.textContent = displayValue;
    }
  });
});

//Event listener for Data Operands
//DONE: Chain multiple operations together 12 + 7 - 5 * 3 = 42
//DONE: Handle single AND multiple operations.
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-op"))) {
      // If no operators have been pressed, do this:
      if (operandCounter == 0 && ongoingTotal.length === 0) {
        operandCounter++;
        selectedOperand = buttonValue;
        previousOperand = buttonValue;
        firstNumber = parseInt(displayValue);
        displayValue = [];
        displayPrimary.textContent = selectedOperand;
        // If 1 operators have been pressed already, do this:
      } else {
        if (ongoingTotal.length === 0) {
          selectedOperand = buttonValue;
          previousNumber = parseInt(displayValue);
          ongoingTotal = parseInt(
            operate(firstNumber, previousNumber, previousOperand)
          );
          displayPrimary.textContent = ongoingTotal;
          displayValue = [];
          previousOperand = buttonValue;
        } else if (ongoingTotal.length != 0) {
          selectedOperand = buttonValue;
          firstNumber = parseInt(displayValue);
          previousNumber = ongoingTotal;
          ongoingTotal = parseInt(
            operate(previousNumber, firstNumber, previousOperand)
          );
          displayValue = [];
          previousOperand = buttonValue;
          displayPrimary.textContent = ongoingTotal;
        }
      }
    }
  });
});



// Equals button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("Data-Equals")) {
      if (operandCounter === 0) {
        displayPrimary.textContent = displayValue;
      } else if (displayValue == 0 && selectedOperand == "/") {
        displayPrimary.textContent = "You cannot divide by zero LMFAO";
        displayValue = [];
        selectedOperand = "";
        previousOperand = "";
        ongoingTotal = [];
        operandCounter = 0;
        firstNumber = 0;
      } else if (operandCounter == 0 || ongoingTotal.length === 0) {
        operateResult = operate(firstNumber, displayValue, selectedOperand);
        displayPrimary.textContent = operateResult;
        displayValue = [];
        selectedOperand = "";
        previousOperand = "";
        ongoingTotal = [];
        operandCounter = 0;
        firstNumber = 0;
      } else {
        firstNumber = displayValue;
        previousNumber = ongoingTotal;
        operateResult = operate(previousNumber, firstNumber, selectedOperand);
        displayPrimary.textContent = operateResult;
        displayValue = [];
        selectedOperand = "";
        previousOperand = "";
        ongoingTotal = [];
        operandCounter = 0;
        firstNumber = 0;
      }
    }
  });
});

// All clear button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.getAttribute("Data-AllClear")) {
      displayValue = [];
      selectedOperand = "";
      previousOperand = "";
      ongoingTotal = [];
      operandCounter = 0;
      firstNumber = 0;
      previousNumber = 0;
      displayPrimary.textContent = displayValue;
      console.log("ALL_CLEAR");
    }
  });
});

// Operate Switch function
const operate = function (number1, number2, operator) {
  switch (operator) {
    case "+":
      return parseInt(number1) + parseInt(number2);
      break;
    case "-":
      return parseInt(number1) - parseInt(number2);
      break;
    case "*":
      return parseInt(number1) * parseInt(number2);
      break;
    case "/":
      return parseInt(number1) / parseInt(number2);
      break;
  }
};
