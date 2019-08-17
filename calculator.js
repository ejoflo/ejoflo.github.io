let screen = document.querySelector('#scrn');
let result = null;
let operatorSymbol = null;
let equalPressed = false;

function getUserInput () {
  let digitButton = document.querySelectorAll('button');

  digitButton.forEach(function(button) {
    button.addEventListener('click', () => {

      if ((equalPressed == true) && 
        (button.textContent !== '+') &&
        (button.textContent !== '-') &&
        (button.textContent !== '×') &&
        (button.textContent !== '÷')) 
      {   // if user presses equals, clear values
          screen.textContent = '';
          result = null;
          operatorSymbol = null;
          equalPressed = false;
          screen.setAttribute('style', 'color: white');
      } 
      
      if (!isNaN(button.textContent) || button.textContent == '.') {   // display digits on screen
        showOnScreen(button.textContent);  
      
      } else if ((button.textContent == 'C') || (button.textContent == '⌫') || (button.textContent == '=')) {   // perform a utility function
        updateDisplay(button.textContent);
      
      } else {   // perform an operation
        operate(button.textContent);
        operatorSymbol = button.textContent;        
      }
    });  
  });
}

function showOnScreen (digit) {   
  screen.setAttribute('style', 'color: white');

  if ((digit == 0) && (screen.textContent == 0)) {   // prevents users from inputting zeroes
    screen.textContent = 0;
  
  } else if (screen.textContent.length > 10) {   // warn user if digits exceed 10
    alert ('Cannot exceed 10 digits. Please try again.');
  
  } else if ((screen.textContent == 0) && (digit != 0)) {   // displays the first non-zero number
    screen.textContent = '';
    screen.textContent += digit;

  } else {   // draw digits onto calculator screen
    screen.textContent += digit;
  }
}

function operate(operator) {
  switch (operator) {
      
    case '+':
      if (result == null) {
        result = +screen.textContent;

      } else if ((operatorSymbol != '+') && (operatorSymbol != null)) {
        operate(operatorSymbol);
        
      } else if (operatorSymbol != null) {
        add(screen.textContent);
      
      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '+';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    case '-':
      if (result == null) {
        result = +screen.textContent;
      
      } else if ((operatorSymbol != '-') && (operatorSymbol != null)) {
        operate(operatorSymbol);
      
      } else if (operatorSymbol != null) {
        subtract(screen.textContent);
      
      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '-';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    case '×':
      if (result == null) {
        result = +screen.textContent;

      } else if ((operatorSymbol != '×') && (operatorSymbol != null)) {
        operate(operatorSymbol);

      } else if (operatorSymbol != null) {
        multiply(screen.textContent);

      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '×';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    case '÷':
      if (result == null) {
        result = +screen.textContent;

      } else if ((operatorSymbol != '÷') && (operatorSymbol != null)) {
        operate(operatorSymbol);
        
      } else if (operatorSymbol != null) {
        divide(screen.textContent);
      
      } else if ((equalPressed == true) && (operatorSymbol == null)) {
        operatorSymbol = '÷';
        equalPressed = false;
      }
      screen.textContent = '';
      break;

    default:
      break;
    }
}

function add(number) {

  return result += +number;
}

function subtract(number) {

  return result -= +number;

}

function multiply(number) {

  return result *= number;
}

function divide(number) {
  if (number != 0) {
    return result /= number;
  } else {
    alert("Can't divide by nothing! Please enter a different number.")
  }
}

function updateDisplay(operator) {
  switch (operator) {
  
    case 'C':
      screen.textContent = 0;
      result = null;
      operatorSymbol = null;
      equalPressed = false;
      screen.setAttribute('style', 'color: white');
      break;

    case '⌫':
      if (screen.textContent != '') {
        screen.textContent = screen.textContent.slice(0, -1);
      }
      break;
      
    case '=':
      finalResult(operatorSymbol);
      break;

    default:
      break;
    }
}

function finalResult(opSymbol) {
  screen.setAttribute('style', 'color: yellow');
  
  switch (opSymbol) {
  
    case '+':
      screen.textContent = +result + +screen.textContent;
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;

    case '-':
      screen.textContent = +result - +screen.textContent;
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;

    case '×':
      screen.textContent = +result * +screen.textContent;
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;
      
    case '÷':
      screen.textContent = +result / +screen.textContent;
      result = +screen.textContent;
      operatorSymbol = null;
      equalPressed = true;
      break;
  }
}

getUserInput();