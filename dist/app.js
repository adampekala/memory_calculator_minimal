import { calculateNumberHelper } from "./helpers.js";
import { STATE_TYPE, appState, OPERATION_TYPE } from "./mode.js";
console.log(calculateNumberHelper(appState.arytmeticOperation, appState.difficulty));
// console.log(appState.arytmeticOperation);
// console.log(appState.difficulty);
let scoreNumber = 0;
const score = document.getElementById("score");
const result = document.getElementById("result");
const leftNumber = document.getElementById("left_number");
const operationSign = document.getElementById("operation_sign");
const rightNumber = document.getElementById("right_number");
const timeCounter = document.getElementById("time_counter");
let leftNumberValue = 0;
let rightNumberValue = 0;
let operationSignValue = "x";
let operationResult = 0;
leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "---";
const buttonMain = document.getElementById("main_button");
const buttonExit = document.getElementById("button_exit");
//!!!!!!!!!!!
// const score = document.getElementById("score") as HTMLDivElement;
let counterIntervalIndex;
let counterProgress = 1;
buttonMain.addEventListener("click", (ev) => {
    switch (true) {
        case appState.state === STATE_TYPE.initial: {
            let numbers = calculateNumberHelper(appState.arytmeticOperation, appState.difficulty);
            leftNumberValue = numbers[0];
            rightNumberValue = numbers[1];
            leftNumber.innerText = leftNumberValue.toString();
            rightNumber.innerText = rightNumberValue.toString();
            appState.state = STATE_TYPE.check;
            buttonMain.innerText = appState.state;
            counterIntervalIndex = setInterval(() => {
                console.log(counterProgress);
                if (!(counterProgress > 99)) {
                    timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${counterProgress}%, transparent ${counterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                    counterProgress++;
                }
                else {
                    clearInterval(counterIntervalIndex);
                }
            }, 50);
            break;
        }
        case appState.state === STATE_TYPE.check: {
            buttonExit.classList.add("active");
            counterProgress = 1;
            clearInterval(counterIntervalIndex);
            appState.state = STATE_TYPE.asses;
            buttonMain.innerText = "good";
            buttonExit.innerText = "wrong";
            switch (true) {
                case appState.arytmeticOperation === OPERATION_TYPE.addition: {
                    operationResult = leftNumberValue + rightNumberValue;
                    result.innerText = operationResult.toString();
                    break;
                }
                case appState.arytmeticOperation === OPERATION_TYPE.substraction: {
                    operationResult = leftNumberValue - rightNumberValue;
                    result.innerText = operationResult.toString();
                    break;
                }
                case appState.arytmeticOperation === OPERATION_TYPE.multiplication: {
                    operationResult = leftNumberValue * rightNumberValue;
                    result.innerText = operationResult.toString();
                    break;
                }
                default:
                    break;
            }
            break;
        }
        case appState.state === STATE_TYPE.asses: {
            scoreNumber++;
            appState.state = STATE_TYPE.check;
            buttonExit.classList.remove("active");
            buttonMain.innerText = appState.state;
            buttonExit.innerText = "exit";
            let numbers = calculateNumberHelper(appState.arytmeticOperation, appState.difficulty);
            leftNumberValue = numbers[0];
            rightNumberValue = numbers[1];
            leftNumber.innerText = leftNumberValue.toString();
            rightNumber.innerText = rightNumberValue.toString();
            score.innerText = scoreNumber.toString();
            result.innerText = "---";
            counterIntervalIndex = setInterval(() => {
                console.log(counterProgress);
                if (!(counterProgress > 99)) {
                    timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${counterProgress}%, transparent ${counterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                    counterProgress++;
                }
                else {
                    clearInterval(counterIntervalIndex);
                }
            }, 50);
            break;
        }
        default:
            break;
    }
});
buttonExit.addEventListener("click", (ev) => {
    if (appState.state === STATE_TYPE.asses) {
        console.log(ev.target.id);
        scoreNumber--;
        appState.state = STATE_TYPE.check;
        buttonMain.innerText = appState.state;
        buttonExit.innerText = "exit";
        let numbers = calculateNumberHelper(appState.arytmeticOperation, appState.difficulty);
        leftNumberValue = numbers[0];
        rightNumberValue = numbers[1];
        leftNumber.innerText = leftNumberValue.toString();
        rightNumber.innerText = rightNumberValue.toString();
        score.innerText = scoreNumber.toString();
        result.innerText = "---";
        counterIntervalIndex = setInterval(() => {
            console.log(counterProgress);
            if (!(counterProgress > 99)) {
                timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${counterProgress}%, transparent ${counterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                counterProgress++;
            }
            else {
                clearInterval(counterIntervalIndex);
            }
        }, 50);
    }
    else {
        navigationContainer.classList.remove("closed");
    }
});
const optionButtonClose = document.getElementById("backToCalculator_button");
const navigationContainer = document.getElementById("navigation");
optionButtonClose.addEventListener("click", (ev) => {
    console.log("working");
    navigationContainer.classList.add("closed");
});
const sqrPlus = document.getElementById("operation_toggler-add");
const sqrMinus = document.getElementById("operation_toggler-substract");
const sqrMultiply = document.getElementById("operation_toggler-multiply");
sqrPlus.addEventListener("click", (ev) => {
    operationSignValue = "+";
    operationSign.innerText = "+";
    appState.arytmeticOperation = OPERATION_TYPE.addition;
    console.log(appState.arytmeticOperation);
});
sqrMinus.addEventListener("click", (ev) => {
    operationSignValue = "-";
    operationSign.innerText = "-";
    appState.arytmeticOperation = OPERATION_TYPE.substraction;
});
sqrMultiply.addEventListener("click", (ev) => {
    operationSignValue = "x";
    operationSign.innerText = "x";
    appState.arytmeticOperation = OPERATION_TYPE.multiplication;
});
