//bacis operators
function add(a,b){return a + b}
function subtract(a,b){return a - b}
function multiple(a,b){return a * b}
function divide(a,b){return a / b}

//variables
let firstOperand = ""
let secondOperand = ""
let operator = ""

let hasOp = false;

///const html element 
const displayText = document.querySelector(".display-text")
const numKeys = document.querySelectorAll(".num")
const opKeys = document.querySelectorAll(".operator-key")
const equalKey = document.querySelector(".equal-key")



//EventListeners
numKeys.forEach((num)=>{
    num.addEventListener("click",numStoreInMemory)
})
opKeys.forEach((op)=>{
    op.addEventListener("click",operatorStoreInMemory)
})
equalKey.addEventListener("click", calculate)

//operate func
function operate(firstOperand, secondOperand, operator){
    let result;
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    switch(operator){
        case "+":
            result = add(firstOperand, secondOperand)
            break;
        case "-":
            result = subtract(firstOperand, secondOperand)
            break;
        case "*":
            result = multiple(firstOperand, secondOperand)
            break;
        case "/":
            result = divide(firstOperand, secondOperand)
            break;
    }
    return result;
}   
//calculate function
function calculate(){
    let result = operate(firstOperand,secondOperand,operator)
    displayClear()
    displayNum(result)
    setUpMemory()
}

//memory srote function

function numStoreInMemory(e){
    manageDisplay()
    if(operator === ""){
        firstOperand += e.target.innerText
        displayNum(e.target.innerText);
    }else{
        secondOperand += e.target.innerText
        displayNum(e.target.innerText)
    }
    console.log(firstOperand)
}

function operatorStoreInMemory(e){
    operator = e.target.innerText;
    displayOperator(operator);
    hasOp = true;
}

function setUpMemory(){
    firstOperand = ""
    secondOperand = ""
    operator = ""
}
//display functions
function manageDisplay(){
    if(firstOperand === ""){
        displayClear()
    }
     if(displayText.innerHTML ==="0"){
        displayClear();
    }

    if(hasOp){
        displayClear();
        hasOp = false;
    }
}

function displayClear(){
    displayText.innerText = "";
}

function displayOperator(text){
    displayText.innerText = text;
}

function displayNum(text){
    displayText.innerText += text;
}

