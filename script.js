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
    const calcButtons = document.querySelectorAll('.calc-buttons')

/* Event Listeners */
    //test only first
    numberButtons.forEach(button => button.addEventListener('click', testEvent))
    operatorButtons.forEach(button => button.addEventListener('click', testEvent))
    clearButton.addEventListener('click', testEvent)
    deleteButton.addEventListener('click', testEvent)
    decimalButton.addEventListener('click', testEvent)
    equalButton.addEventListener('click', testEvent)


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

function playSoundButton() {
    
}