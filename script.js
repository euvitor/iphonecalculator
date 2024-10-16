const theme = document.getElementById('theme');
theme.addEventListener('click', () =>{
    document.body.classList.toggle('light-theme')
})

const display = document.getElementById('display');
const topDisplay = document.getElementById('topDisplay');

let hasError = false;


function checkError() {
    if (hasError) {
        clearDisplay();
        hasError = false;
    }
}

function clearDisplay() {
    display.value = '';
    topDisplay.value = '';
    hasError = false;
}

function insertValue(value) {
    checkError();
    display.value += value;
}

function insertOperator(operator) {
    checkError();
    if(display.value === '-'){
        if(operator === '+'){
            display.value = ''
        }
        return;
    }
    if (display.value === '' && operator !== '-') {
        return;
    }
    if (/[+\-×÷%]$/.test(display.value)){
        display.value = display.value.slice(0,-1);
    }

    display.value += operator;
}

function toggleSign() {
    let expression = display.value;
    let regex = /([+\-]?)(\d+)([.,]?\d*)$/;
    let match = expression.match(regex);

    if (match) {
        let sign = match[1];
        let number = match[2] + match[3];
        let newSign = sign === '-' ? '+' : '-';

        expression = expression.replace(regex, newSign + number);
        display.value = expression;
    }
    
}

function calculate() {
    if(display.value === '-'||display.value === ''){return}
    try {
        let expression = display.value;

        expression = expression.replace(/,/g, '.').replace(/÷/g, '/').replace(/×/g, '*').replace(/(\d+(\.\d+)?)%/, '$1/100');


        let result = eval(expression).toString().replace(/\./g, ',');

        topDisplay.value = display.value
        display.value = result;
    } catch (error) {
        display.value = 'Erro';
        hasError = true;
    }
}