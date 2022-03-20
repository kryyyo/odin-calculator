/* Element Selectors */
    const calcEyes = document.querySelector('.calc-eyes')
    const calcScreenLast = document.querySelector('#calc-screen-last')
    const calcScreenCurrent = document.querySelector('#calc-screen-current')

    const numberButtons = document.querySelectorAll('.btn-num')
    const operatorButtons = document.querySelectorAll('.btn-operator')
    const clearButton = document.querySelector('#btn-clear')
    const deleteButton = document.querySelector('#btn-delete')
    const decimalButton = document.querySelector('#btn-decimal')
    const equalButton = document.querySelector('#btn-equals')

    // For the clicking animation and sound of buttons
    const calcButtons = document.querySelectorAll('#calc-buttons button')

/* Event Listeners */
    calcButtons.forEach(button => button.addEventListener('click', animateButton))
    numberButtons.forEach(button => button.addEventListener('click', addNumber))
    operatorButtons.forEach(button => button.addEventListener('click', addOperator))
    clearButton.addEventListener('click', clearAllScreens)
    deleteButton.addEventListener('click', deleteOne)
    decimalButton.addEventListener('click', addDecimal)
    equalButton.addEventListener('click', getAnswer)
    window.addEventListener('keydown', whatKey)
    

/* Function Tester */
function testEvent(e) {
    console.log(e.key)
}

/* Global Variables */
let firstNum = null;
let secondNum = null;
let operator = null;
let answer = null;

/* Functions */
function animateButton() {
    this.setAttribute('style', 'filter: grayscale(50%)')
    setTimeout(() => this.removeAttribute('style', 'filter: grayscale(50%)'), 30)
}

function deleteEyes() {
    calcEyes.style.display = 'none';
}

function returnEyes() {
    calcEyes.removeAttribute('style')
}

function emptyVariables() {
    firstNum = null;
    secondNum = null;
}

function emptyOperator() {
    operator = null;
}

function clearAllScreens() {
    emptyVariables();
    emptyOperator();
    returnEyes();

    calcScreenLast.textContent = '';
    calcScreenCurrent.textContent = '';
}

function deleteOne() {

    let currentNumber = calcScreenCurrent.textContent
    
    let newNumber = currentNumber.slice(0, currentNumber.length - 1)

    calcScreenCurrent.textContent = `${newNumber}`
}

function whatKey(e) {
    e.preventDefault()
    
    if (e.key >= 0) {
        addNumber(e)
    }
    
    switch (e.key) {
        case '.': 
            addDecimal(e)
            break;

        case '+':
        case '-':
        case '*':
        case '/':
            addOperator(e)
            break;

        case '=':
        case 'Enter':
            getAnswer()
            break;

        case 'Backspace':
            deleteOne()
            break;
        
        case 'Escape':
            clearAllScreens()
            break;
    } 
}

function addNumber(e) {
    deleteEyes()

    let currentNumber = calcScreenCurrent.textContent
    let input = this.textContent || e.key

    if (currentNumber.length < 14) {
        let newNumber = currentNumber + + input
        calcScreenCurrent.textContent = `${newNumber}`
    } else {
        return
    }
    
}

function addDecimal(e) {
    deleteEyes()

    let currentNumber = calcScreenCurrent.textContent
    let input = this.textContent || e.key

    if (currentNumber.length < 14) {
        let numberArray = currentNumber.split('')

        if (currentNumber === '') {
            let newNumber = '0' + input
            calcScreenCurrent.textContent = `${newNumber}`
        } else if (!numberArray.includes('.')) {
            let newNumber = currentNumber + input
            calcScreenCurrent.textContent = `${newNumber}`
        } else {
            return
        }
    } else {
        return
    }
    
}

function isEmpty(number) {
    if (number === null) {
        return true
    }
}

function displayError() {
    calcScreenCurrent.textContent = `Division Error. Clearing screen in 5seconds` 
    setTimeout(clearAllScreens, 5000)
}

function performOperation() {
    
    secondNum = parseFloat(calcScreenCurrent.textContent)

    switch (operator) {
        case '+':
            answer = firstNum + secondNum
        break;

        case '-': 
            answer = firstNum - secondNum
        break;

        case '×':
        case '*':
            answer = firstNum * secondNum
        break;
        
        case '÷': 
        case '/':
            if (secondNum === 0) {
                return displayError()
            } else {
                answer = firstNum / secondNum
            }
        break;
    }

    answer = Math.round(answer * 1000) / 1000
}

function addOperator(e) {
    if (isEmpty(firstNum)) {
        if (calcScreenCurrent.textContent < 1) {
            return
        } else {
            firstNum = parseFloat(calcScreenCurrent.textContent)
            operator = this.textContent || e.key

            if (operator === '*') {
                console.log(operator)
            }

            calcScreenLast.textContent = `${firstNum} ${operator}`
            calcScreenCurrent.textContent = '';
        }
    } else {
        if (calcScreenCurrent.textContent < 1) {
            operator = this.textContent || e.key

            calcScreenLast.textContent = `${firstNum} ${operator}`
        } else {
            secondNum = parseFloat(calcScreenCurrent.textContent)

            performOperation() 
            firstNum = parseFloat(answer)
            calcScreenCurrent.textContent = '';

            operator = this.textContent || e.key

            calcScreenLast.textContent = `${firstNum} ${operator}`

            secondNum = null
        }
    }
}

function getAnswer() {
    if (isEmpty(firstNum)){
        return
    } else {
        performOperation()
        calcScreenLast.textContent += ` ${secondNum} =`
        calcScreenCurrent.textContent = `${answer}`
        emptyOperator()
        emptyVariables()
    }
}

