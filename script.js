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
    //test only first
    calcButtons.forEach(button => button.addEventListener('click', animateButton))
    numberButtons.forEach(button => button.addEventListener('click', addNumber))
    operatorButtons.forEach(button => button.addEventListener('click', addOperator))
    clearButton.addEventListener('click', clearAllScreens)
    deleteButton.addEventListener('click', deleteOne)
    decimalButton.addEventListener('click', addDecimal)
    equalButton.addEventListener('click', getAnswer)
    

/* Function Tester */
function testEvent(e) {
    console.log(e)
}

/* Global Variables */
let firstNum = null;
let secondNum = null;
let operator = null;

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
    returnEyes()

    calcScreenLast.textContent = '';
    calcScreenCurrent.textContent = '';
}

function deleteOne() {

    let currentNumber = calcScreenCurrent.textContent
    
    let newNumber = currentNumber.slice(0, currentNumber.length - 1)

    calcScreenCurrent.textContent = `${newNumber}`
}

function addNumber() {
    deleteEyes()

    let currentNumber = calcScreenCurrent.textContent

    if (currentNumber.length < 14) {
        let newNumber = currentNumber + this.textContent
        calcScreenCurrent.textContent = `${newNumber}`
    } else {
        return
    }
    
}

function addDecimal() {
    let currentNumber = calcScreenCurrent.textContent

    if (currentNumber.length < 14) {
        let numberArray = currentNumber.split('')

        if (currentNumber === '') {
            let newNumber = '0' + this.textContent
            calcScreenCurrent.textContent = `${newNumber}`
        } else if (!numberArray.includes('.')) {
            let newNumber = currentNumber + this.textContent
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
    let answer;
    
    secondNum = parseFloat(calcScreenCurrent.textContent)

    switch (operator) {
        case '+':
            answer = firstNum + secondNum
        break;

        case '-': 
            answer = firstNum - secondNum
        break;

        case '×': 
            answer = firstNum * secondNum
        break;
        
        case '÷': 
            if (secondNum === 0) {
                return displayError()
            } else {
                answer = firstNum / secondNum
            }
        break;
    }

    answer = Math.round(answer * 1000) / 1000
}

function addOperator() {
    if (calcScreenCurrent.textContent = '') {
        return
    }

    if (isEmpty(firstNum)) {
        firstNum = calcScreenCurrent.textContent
        operator = this.textContent

        calcScreenLast.textContent = `${firstNum} ${operator}`
        calcScreenCurrent.textContent = '';
        
    } else {
        if (isEmpty(secondNum)) {
            operator = this.textContent
            calcScreenLast.textContent = `${firstNum} ${operator}`
        } else {
            performOperation() 
            firstNum = answer
            
            operator = this.textContent
            calcScreenLast.textContent = `${firstNum} ${operator}`

            secondNum = null
        }
    }
}

function getAnswer() {
    if (isEmpty(firstNum) || isEmpty(secondNum)){
        return
    } else {
        performOperation()
        calcScreenLast += " ="
        calcScreenCurrent.textContent = `${answer}`
        emptyOperator()
        emptyVariables()
    }
   
}