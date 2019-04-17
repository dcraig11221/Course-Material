let decimalBtn = document.getElementById('calc-decimal')
let clearBtn = document.getElementById('calc-clear')
let backspaceBtn = document.getElementById('calc-backspace')

let displayValElement = document.getElementById('calc-display-val')
let displayVal = '0';
let pendingVal;
let evalStringArray = [];

let calcNumBtns = document.getElementsByClassName('calc-number-btn')
let calcOpBtns = document.getElementsByClassName('calc-operator-btn')

let updateDisplayVal = (clickObj) => {
  let btnText = clickObj.target.innerText;
  if (displayVal === '0') {
    displayVal = '';
  }
  displayVal += btnText;
  displayValElement.innerText = displayVal;
}

var performOperation = (clickObj) => {
  var operator = clickObj.target.innerText;
  switch (operator) {
    case '+':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('+');
      break;
    case '−':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('-')
      break;
    case '×':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('*')
      break;
    case '÷':
      pendingVal = displayVal;
      displayVal = '0';
      displayValElement.innerText = displayVal;
      evalStringArray.push(pendingVal);
      evalStringArray.push('/')
      break;
    case '=':
      evalStringArray.push(displayVal);
      var evaluation = eval(evalStringArray.join(' '));
      displayVal = evaluation + '';
      displayValElement.innerText = displayVal;
      evalStringArray = [];
      break;
    default:
      break;
  }
}

for (let i = 0; i < calcNumBtns.length; i++) {
  calcNumBtns[i].addEventListener('click', updateDisplayVal)
}
for (let i = 0; i < calcOpBtns.length; i++) {
  calcOpBtns[i].addEventListener('click', performOperation)
}

clearBtn.onclick = () => {
  displayVal = '0';
  pendingVal = undefined;
  evalStringArray = [];
  displayValElement.innerHTML = displayVal;
}

backspaceBtn.onclick = () => {
  let lengthOfDisplayVal = displayVal.length;
  displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);
  if (displayVal === '') {
    displayVal = '0';
  }
  displayValElement.innerText = displayVal;
}

decimalBtn.onclick = () => {
  if (!displayVal.includes('.')) {
    displayVal += '.';
  }
  displayValElement.innerText = displayVal;
}
