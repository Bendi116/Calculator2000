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
    num.addEventListener("click",numEventManager)
})
opKeys.forEach((op)=>{
    op.addEventListener("click",operatorEventManager)
})
equalKey.addEventListener("click", calculate)
clearKey.addEventListener("click",clear)
onOffKey.addEventListener("click",onOff)
pointKey.addEventListener("click",addPoint)
backSpaceKey.addEventListener("click",backSpace)
document.addEventListener("keydown",keyBoardEventManager,true)


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
    if (on && !calculated){
        displayText.innerText = displayText.innerText.slice(0, -1)
        if(displayText.innerText ===""){
            displayText.innerText = "0"
        }
    }
    
}

//memory srote function

function numEventManager(e){
    numStoreInMemory(e.target.innerText)
}


function numStoreInMemory(num){
    if(on){
        manageDisplay()
        if(!operator){
            firstOperand += num
            displayNum(num);
        }else{
            secondOperand += num
            displayNum(num)
        }
        calculated = false;
        hasOp = false;
    }
    
    console.log(`firstOperand: ${firstOperand}`)
    console.log(`secondOperand: ${secondOperand}`)

}
function operatorEventManager(e){
    operatorStoreInMemory(e.target.innerText)

}
function operatorStoreInMemory(op){
    if(on && firstOperand !=="Error"){
        if(op ==="-" && !firstOperand ){
            displayClear()
            displayText.innerText = "-" + displayText.innerText
            firstOperand = "-" + firstOperand

        }else if(op ==="-" && operator){
            displayClear()
            displayText.innerText = "-" + displayText.innerText
            secondOperand = "-" + secondOperand
        }
        else if(!firstOperand){
            displayOperator(op)
        }else{
            if(operator && secondOperand){
                calculate()
            }
            operator = op;
            displayOperator(operator);
            hasOp = true;
        }
        
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
    if(hasOp && secondOperand[0] != "-"){
        displayClear();
    }
    if(calculated && !operator){
        firstOperand = "";
        displayClear();
    }
    if(displayText.innerText[0] == "+" || displayText.innerText[0] == "*" || displayText.innerText[0] == "/"){
        displayClear()
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

//keyboard event manager
function keyBoardEventManager(e){
    if(e.defaultPrevented){return}
    
    switch (e.key){
        case '1':
            numStoreInMemory('1');
            break;
        case "2":
            numStoreInMemory("2");
            break;
        case '3':
            numStoreInMemory('3');
            break;
        case "4":
            numStoreInMemory("4");
            break;
        case '5':
            numStoreInMemory('5');
            break;
        case "6":
            numStoreInMemory("6");
            break;
            case '7':
            numStoreInMemory('7');
            break;
        case "8":
            numStoreInMemory("8");
            break;
        case "9":
            numStoreInMemory("9");
            break;
        case "0":
            numStoreInMemory("0");
            break;
        case "Backspace":
            backSpace();
            break;
        case ".":
            addPoint()
            break;
        case "+":
            operatorStoreInMemory("+");
            break;
        case "-":
            operatorStoreInMemory("-");
            break;
        case "*":
            operatorStoreInMemory("*");
            break;
        case "/":
            operatorStoreInMemory("/");
            break;
        case"Enter":
            calculate();
            break;
        case"=":
            calculate();
            break;
        default:
            return;
    }

    e.preventDefault()

}

