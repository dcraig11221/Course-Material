(function calculator() {
  "use strict"
  // SELECTORS
  let decimalBtn = document.getElementById('calc-decimal')
  let clearBtn = document.getElementById('calc-clear')
  let backspaceBtn = document.getElementById('calc-backspace')

  let displayValElement = document.getElementById('calc-display-val')
  let insertValElement = document.getElementById('insert')
  let insertVal = [];
  let displayVal = '0';
  let pendingVal;
  let evalStringArray = [];

  let calcNumBtns = document.getElementsByClassName('calc-number-btn')
  let calcOpBtns = document.getElementsByClassName('calc-operator-btn')

  // METHODS

  function updateDisplayVal(event) {
    if (event.type === 'click') {
      let btnText = event.target.innerText;
      if (displayVal === '0') {
        displayVal = '';
      }
      displayVal += btnText;
      displayValElement.innerText = displayVal;
    }
    let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    if (event.type === 'keydown' && arr.includes(event.key)) {
      let keyText = event.key;
      if (displayVal === '0') {
        displayVal = '';
      }
      displayVal += keyText;
      displayValElement.innerText = displayVal;
    }
  }
  /* "Insert" refers to the characters that appear at top left in
  Display window. I'm aware that this will only display a max set of
  characters, and that needs to be addressed */
  function updateInsertVal(event) {
    if (event.type === 'click') {
      let btnText = event.target.innerText;
      if (displayVal === '0') {
        displayVal = '';
      }
      insertVal.push(btnText);
      insertValElement.innerText = insertVal.join(' ');
    }
    let charArray = ['0', '1', '2', '3', '4', '5', '6',
      '7', '8', '9', '+', '-', '/', '*', '.', 'Enter'
    ];
    if (event.type === 'keydown' && charArray.includes(event.key)) {
      let keyText = event.key;
      if (displayVal === '0') {
        displayVal = '';
      }
      if (event.key === "Enter") {
        keyText = '='
      }
      insertVal.push(keyText);
      insertValElement.innerText = insertVal.join(' ');
    }
  }

  function updateInsertOp(event) {
    if (event.type === 'click') {
      let calcOpBtnText = event.target.innerText;
      if (displayVal === '0') {
        displayVal = '';
      }
      insertVal.push(calcOpBtnText);
      insertText = insertVal.join(' ')
      insertValElement.innerText = insertText;
    }
    if (event.type === 'keydown') {
      let calcOpKeyText = event.key;
      if (displayVal === '0') {
        displayVal = '';
      }
      insertVal.push(calcOpKeyText);
      insertText = insertVal.join(' ')
      insertValElement.innerText = insertText;
    }
  }

  function performOperation(event) {
    if (event.type === 'click') {
      var operator = event.target.innerText;
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
      }
    }
    if (event.type === 'keydown') {
      var operator = event.key;
      switch (operator) {
        case '+':
          pendingVal = displayVal;
          displayVal = '0';
          displayValElement.innerText = displayVal;
          evalStringArray.push(pendingVal);
          evalStringArray.push('+');
          break;
        case '-':
          pendingVal = displayVal;
          displayVal = '0';
          displayValElement.innerText = displayVal;
          evalStringArray.push(pendingVal);
          evalStringArray.push('-')
          break;
        case '*':
          pendingVal = displayVal;
          displayVal = '0';
          displayValElement.innerText = displayVal;
          evalStringArray.push(pendingVal);
          evalStringArray.push('*')
          break;
        case '/':
          pendingVal = displayVal;
          displayVal = '0';
          displayValElement.innerText = displayVal;
          evalStringArray.push(pendingVal);
          evalStringArray.push('/')
          break;
        case 'Enter':
          evalStringArray.push(displayVal);
          var evaluation = eval(evalStringArray.join(' '));
          displayVal = evaluation + '';
          displayValElement.innerText = displayVal;
          evalStringArray = [];
          break;
      }
    }
  }

  function clear(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key ===
        'Delete')) {
      displayVal = '0';
      pendingVal = undefined;
      evalStringArray = [];
      insertVal = [];
      displayValElement.innerHTML = displayVal;
      insertValElement.innerText = '';
    }
  }

  function backspace(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key ===
        'Backspace')) {
      let lengthOfDisplayVal = displayVal.length;
      displayVal = displayVal.slice(0, lengthOfDisplayVal - 1);
      insertVal.pop();
      if (displayVal === '') {
        displayVal = '0';
      }
      displayValElement.innerText = displayVal;
      insertValElement.innerText = insertVal.join(' ');
    }
  }

  function decimal(event) {
    if (event.type === 'click' || (event.type === 'keydown' && event.key ===
        '.')) {
      if (!displayVal.includes('.')) {
        displayVal += '.';
      }
      displayValElement.innerText = displayVal;
    }
  }

  // EVENTS
  for (let i = 0; i < calcNumBtns.length; i++) {
    calcNumBtns[i].addEventListener('click', updateDisplayVal);
    calcNumBtns[i].addEventListener('click', updateInsertVal);
  }
  for (let i = 0; i < calcOpBtns.length; i++) {
    calcOpBtns[i].addEventListener('click', performOperation);
    calcOpBtns[i].addEventListener('click', updateInsertOp);
  }

  clearBtn.addEventListener('click', clear)
  backspaceBtn.addEventListener('click', backspace)
  decimalBtn.addEventListener('click', decimal)
  decimalBtn.addEventListener('click', updateInsertVal)

  window.addEventListener('keydown', updateDisplayVal)
  window.addEventListener('keydown', updateInsertVal)
  window.addEventListener('keydown', performOperation)
  window.addEventListener('keydown', clear)
  window.addEventListener('keydown', backspace)
  window.addEventListener('keydown', decimal)

})();
