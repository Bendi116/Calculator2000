//bacis operators
function add(a,b){return a + b}
function subtract(a,b){return a - b}
function multiple(a,b){return a * b}
function divide(a,b){return a / b}

//variables
let firstOperand = null
let secondOperand = null
let operator = ""

//operate func
function operate(firstOperand, secondOperand, operator){
    let result;
    switch(operator){
        case "+":
            result = add(firstOperand, secondOperand)
            break
        case "-":
            result = subtract(firstOperand, secondOperand)
            break
        case "*":
            result = multiple(firstOperand, secondOperand)
            break
        case "/":
            result = divide(firstOperand, secondOperand)
            break    
    }
    return result;
}