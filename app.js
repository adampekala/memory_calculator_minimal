var STATE_TYPE = {
    initial: "start",
    next: "next",
    check: "check",
    asses: "asses",
};
var OPERATION_TYPE = {
    addition: "add",
    substraction: "minus",
    multiplication: "multiply",
};
var state = STATE_TYPE.initial;
var arytmeticOperation = OPERATION_TYPE.multiplication;
var scoreNumber = 0;
var score = document.getElementById("score");
var result = document.getElementById("result");
var leftNumber = document.getElementById("left_number");
var operationSign = document.getElementById("operation_sign");
var rightNumber = document.getElementById("right_number");
var randomNumber = function () {
    return Math.floor(Math.random() * 10) + 1;
};
// const leftDigit
var leftNumberValue = 0;
var rightNumberValue = 0;
var operationSignValue = "x";
var operationResult = 0;
leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "0";
var buttonMain = document.getElementById("main_button");
var buttonExit = document.getElementById("button_exit");
//!!!!!!!!!!!
// const score = document.getElementById("score") as HTMLDivElement;
buttonMain.addEventListener("click", function (ev) {
    switch (true) {
        case state === STATE_TYPE.initial: {
            leftNumberValue = randomNumber();
            rightNumberValue = randomNumber();
            leftNumber.innerText = leftNumberValue.toString();
            rightNumber.innerText = rightNumberValue.toString();
            state = STATE_TYPE.check;
            buttonMain.innerText = state;
            break;
        }
        case state === STATE_TYPE.check: {
            /////////CLAS/////////CLAS/////////CLAS/////////CLAS/////////CLAS/////////CLAS
            /////////CLAS/////////CLAS/////////CLAS/////////CLAS/////////CLAS/////////CLAS
            buttonExit.classList.add("active");
            state = STATE_TYPE.asses;
            buttonMain.innerText = "good";
            buttonExit.innerText = "bed";
            switch (true) {
                case arytmeticOperation === OPERATION_TYPE.addition: {
                    operationResult = leftNumberValue + rightNumberValue;
                    result.innerText = operationResult.toString();
                    break;
                }
                case arytmeticOperation === OPERATION_TYPE.substraction: {
                    operationResult = leftNumberValue - rightNumberValue;
                    result.innerText = operationResult.toString();
                    break;
                }
                case arytmeticOperation === OPERATION_TYPE.multiplication: {
                    operationResult = leftNumberValue * rightNumberValue;
                    result.innerText = operationResult.toString();
                    break;
                }
                default:
                    break;
            }
            break;
        }
        case state === STATE_TYPE.asses: {
            scoreNumber++;
            state = STATE_TYPE.check;
            buttonExit.classList.remove("active");
            buttonMain.innerText = state;
            buttonExit.innerText = "exit";
            leftNumberValue = randomNumber();
            rightNumberValue = randomNumber();
            leftNumber.innerText = leftNumberValue.toString();
            rightNumber.innerText = rightNumberValue.toString();
            score.innerText = scoreNumber.toString();
            break;
        }
        default:
            break;
    }
});
buttonExit.addEventListener("click", function (ev) {
    if (state === STATE_TYPE.asses) {
        console.log(ev.target.id);
        scoreNumber--;
        state = STATE_TYPE.check;
        buttonMain.innerText = state;
        buttonExit.innerText = "exit";
        leftNumberValue = randomNumber();
        rightNumberValue = randomNumber();
        leftNumber.innerText = leftNumberValue.toString();
        rightNumber.innerText = rightNumberValue.toString();
        score.innerText = scoreNumber.toString();
    }
    console.log("Other event");
});
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
// const optionButton = document.getElementById("option_button") as HTMLDivElement;
// const optionButtonClose = document.getElementById(
//   "option_button-close"
// ) as HTMLDivElement;
// const optionContainer = document.getElementById(
//   "option_container"
// ) as HTMLDivElement;
// optionButton.addEventListener("mousedown", (ev) => {
//   console.log("option_button");
//   optionButton.classList.add("clicked");
//   optionContainer.classList.add("shown");
// });
// optionButton.addEventListener("mouseup", (ev) => {
//   console.log("option_button");
//   optionButton.classList.remove("clicked");
// });
// optionButtonClose.addEventListener("mousedown", (ev) => {
//   optionButtonClose.classList.add("clicked");
//   optionContainer.classList.remove("shown");
// });
// optionButtonClose.addEventListener("mouseup", (ev) => {
//   optionButtonClose.classList.remove("clicked");
// });
// const sqrPlus = document.getElementById("sqr-plus") as HTMLDivElement;
// const sqrMinus = document.getElementById("sqr-minus") as HTMLDivElement;
// const sqrMultiply = document.getElementById("sqr-multiply") as HTMLDivElement;
// sqrPlus.addEventListener("click", (ev) => {
//   screenOperationSign = "+";
//   arytmeticOperation = OPERATION_TYPE.addition;
// });
// sqrMinus.addEventListener("click", (ev) => {
//   screenOperationSign = "-";
//   arytmeticOperation = OPERATION_TYPE.substraction;
// });
// sqrMultiply.addEventListener("click", (ev) => {
//   screenOperationSign = "x";
//   arytmeticOperation = OPERATION_TYPE.multiplication;
// });
// --------------------------
// const changeToAdditionBtn = document.querySelector(
//   "#changeToAdditionBtn"
// ) as HTMLButtonElement;
// const changeToMuiltiplicationBtn = document.querySelector(
//   "#changeToMuiltiplicationBtn"
// ) as HTMLButtonElement;
// const changeToSubstractionBtn = document.querySelector(
//   "#changeToSubstractionBtn"
// ) as HTMLButtonElement;
// changeToAdditionBtn.addEventListener("click", (event) => {
//   screenOperationSign = "+";
//   arytmeticOperation = OPERATION_TYPE.addition;
//   console.log(screenOperationSign);
//   console.log(arytmeticOperation);
// });
// changeToMuiltiplicationBtn.addEventListener("click", (event) => {
//   screenOperationSign = "x";
//   arytmeticOperation = OPERATION_TYPE.multiplication;
//   console.log(screenOperationSign);
//   console.log(arytmeticOperation);
// });
// changeToSubstractionBtn.addEventListener("click", (event) => {
//   screenOperationSign = "-";
//   arytmeticOperation = OPERATION_TYPE.substraction;
//   console.log(screenOperationSign);
//   console.log(arytmeticOperation);
// });
