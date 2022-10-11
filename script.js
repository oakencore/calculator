//Grabs all buttons
const buttons = document.querySelectorAll(
  ".Data-Number,.Data-Operator,.Data-AllClear,.Data-Equals,.Data-Decimal,.Data-Delete"
);
//Grabs the div that will act as the 'display' of the calculator
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
function del() {
  if (displayValue.at(-1) == ".") {
    displayValue = displayValue.slice(0, -1);
    displayPrimary.textContent = displayValue;
    decimalCounter = 0;
  } else if (displayValue.at(-1) !== ".") {
    displayValue = displayValue.slice(0, -1);
    displayPrimary.textContent = displayValue;
  }
}

function numbers(number) {
  // Limits the numbers to stop them 'falling off' the display.
  if (displayValue.length !== 10) {
    displayValue += number;
    displayPrimary.textContent = displayValue;
  } else {
    displayPrimary.textContent = displayValue;
  }
}

function decimal(decimal) {
  // Limits the amounts of decimals on the display to one.
  if (decimalCounter >= 1) displayPrimary.textContent = displayValue;
  else {
    displayValue += decimal;
    displayPrimary.textContent = displayValue;
    decimalCounter++;
  }
}

function operand(operand) {
  // If no previous operands have been selected and there is no ongoing total do this:
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

// Similar to allClear except it omits previousNumber and updating the display
function intermittentClear() {
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
  // If equals is only pressed once do this: 
  if (operandCounter === 0) {
    displayPrimary.textContent = displayValue;
  // If the user tries to divide by 0 do this:
  } else if (displayValue == 0 && selectedOperand == "/") {
    displayPrimary.textContent = "#DIV/0!";
  } else if (operandCounter == 0 || ongoingTotal.length === 0) {
    operateResult =
      Math.round(
        operate(firstNumber, displayValue, selectedOperand) * 10000000
      ) / 10000000;
    displayValue = operateResult
    displayPrimary.textContent = operateResult;
  } else {
    firstNumber = displayValue;
    previousNumber = ongoingTotal;
    operateResult =
      Math.round(
        operate(previousNumber, firstNumber, selectedOperand) * 10000000
      ) / 10000000;
    displayValue = operateResult
    displayPrimary.textContent = operateResult;
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

// Delete button event listener
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if ((buttonValue = button.getAttribute("data-delete"))) {
      del();
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

//Keyboard Support
//TODO: Combine all event listeners into a single function. Something similar to:
// document.addEventListener("keydown", function (e) {
//   const buttonEventSelectors = document.querySelectorAll(
//     `button[data-num="${e.key}"]`,
//     `button[data-op="${e.key}"]`,
//     `button[data-equals="${e.key}"]`,
//     `data-allClear="${e.key}"]`,
//     `button[data-decimal="${e.key}"]`
//   );
//   buttonEventSelectors.forEach((e) => {
//     e.addEventListener("keydown", (e) => {
//       if (!e) {
//         return;
//       }
//       button.click();
//     });
//   });
// });

document.addEventListener("keydown", function (e) {
  let button = document.querySelector(`button[data-num="${e.key}"]`);
  if (!button) return; // Halts function if a non accepted button is pressed
  button.click();
});

document.addEventListener("keydown", function (e) {
  let button = document.querySelector(`button[data-op="${e.key}"]`);
  if (!button) return; // Halts function if a non accepted button is pressed
  button.click();
});

document.addEventListener("keydown", function (e) {
  let button = document.querySelector(`button[data-equals="${e.key}"]`);
  if (!button) return; // Halts function if a non accepted button is pressed
  button.click();
});

//Alternative equals key handler
document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") equals();
});

document.addEventListener("keydown", function (e) {
  let button = document.querySelector(`button[data-allClear="${e.key}"]`);
  if (!button) return; // Halts function if a non accepted button is pressed
  button.click();
});

document.addEventListener("keydown", function (e) {
  let button = document.querySelector(`button[data-decimal="${e.key}"]`);
  if (!button) return; // Halts function if a non accepted button is pressed
  button.click();
});

// Backspace handler
document.addEventListener("keydown", function (e) {
  if (e.key === "Backspace") del();
});
