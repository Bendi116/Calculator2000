//bacis operators
function add(a,b){return a + b};
function subtract(a,b){return a - b};
function multiple(a,b){return a * b};
function divide(a,b){return b !== 0 ?  a / b : "Error"};

//variables
let firstOperand = "";
let secondOperand = "";
let operator = "";

let hasOp = false;
let calculated = false;
let on = true;

///const html element 
const displayText = document.querySelector(".display-text");
const numKeys = document.querySelectorAll(".num");
const opKeys = document.querySelectorAll(".operator-key");
const equalKey = document.querySelector(".equal-key");
const clearKey = document.querySelector(".clear-key");
const onOffKey = document.querySelector(".onoff-key");
const pointKey = document.querySelector(".point-key");
const backSpaceKey = document.querySelector(".backspace-key");



//EventListeners
numKeys.forEach((num)=>{
    num.addEventListener("click",numStoreInMemory)
})
opKeys.forEach((op)=>{
    op.addEventListener("click",operatorStoreInMemory)
})
equalKey.addEventListener("click", calculate)
clearKey.addEventListener("click",clear)
onOffKey.addEventListener("click",onOff)
pointKey.addEventListener("click",addPoint)
backSpaceKey.addEventListener("click",backSpace)

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
    return Math.round(result * 100000) / 100000;
}   
//on off function
function onOff(){
    on = !on;
    if(!on){
        setUpMemory()
        displayText.innerText = ""
    }else{
        displayText.innerText = "0"
    }
}


//calculate function

function calculate(){
    if(on){
        let result = operate(firstOperand,secondOperand,operator)
        displayClear()
        displayNum(result)
        setUpMemory()
        firstOperand = result;
        calculated = true;}
    
}
//clear function

function clear(){
    if(on){
        displayClear()
        setUpMemory()
        displayNum("0")
    }

}
//backspace
function backSpace(){
    if (on && !calculated)
    displayText.innerText = displayText.innerText.slice(0, -1)
}

//memory srote function

function numStoreInMemory(e){
    if(on){
        manageDisplay()
        if(operator === ""){
            firstOperand += e.target.innerText
            displayNum(e.target.innerText);
        }else{
            secondOperand += e.target.innerText
            displayNum(e.target.innerText)
        }
        calculated = false;
    }
    
    console.log(`firstOperand: ${firstOperand}`)
    console.log(`secondOperand: ${secondOperand}`)

}

function operatorStoreInMemory(e){
    if(on&& firstOperand !=="Error"){
        if(operator){
            calculate()
        }
        operator = e.target.innerText;
        console.log(operator)
        displayOperator(operator);
        hasOp = true;
    }
   

}

function addPoint(){
    if(on){
        if(secondOperand === "" && firstOperand === "" ){
            firstOperand+="0."
            displayNum(".")
        }
        else if(secondOperand === "" && firstOperand.indexOf(".") === -1){
            firstOperand += "."
            displayNum(".")
        }else if(secondOperand.indexOf(".") === -1 && secondOperand !==""){
            secondOperand += "."
            displayNum(".")
        }
    }
    
}

function setUpMemory(){
    firstOperand = ""
    secondOperand = ""
    operator = ""
}
//display functions
function manageDisplay(){
    console.log(calculated)
     if(displayText.innerHTML ==="0"){
        displayClear();
    }
    if(hasOp){
        displayClear();
        hasOp = false;
    }
    if(calculated && !operator){
        firstOperand = "";
        displayClear();
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

