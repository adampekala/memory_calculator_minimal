import { calculateNumberHelperMax, getAndConvertStorage, setConvertedStorage, } from "./helpers.js";
import { STATE_TYPE, appState, OPERATION_TYPE, stopGameLimit, } from "./mode.js";
import { createStatisticTable } from "./createStatisticsTableHelper.js";
let scoreNumber = 0;
let leftNumberValue = 0;
let rightNumberValue = 0;
let operationSignValue = "x";
let operationResult = 0;
let counterIntervalIndex;
let counterProgress = 1;
let gameFinished = false;
let numbers;
let storage = getAndConvertStorage();
console.log(storage);
let wrongAnswers = [];
const body = document.querySelector("body");
const score = document.getElementById("score");
const result = document.getElementById("result");
const leftNumber = document.getElementById("left_number");
const operationSign = document.getElementById("operation_sign");
const rightNumber = document.getElementById("right_number");
const timeCounter = document.getElementById("time_counter");
const buttonMain = document.getElementById("main_button");
const buttonMenu = document.getElementById("button_menu");
leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "---";
buttonMain.addEventListener("click", (ev) => {
    switch (true) {
        case appState.state === STATE_TYPE.initial: {
            if (gameFinished) {
                scoreNumber = 0;
                score.innerText = "---";
                timeCounter.innerText = null;
            }
            gameFinished = false;
            console.log(appState.state + "INITIAL");
            console.log("appState.arytmeticOperation");
            console.log(appState.arytmeticOperation);
            console.log("appState.gameMode");
            console.log(appState.gameMode);
            numbers = calculateNumberHelperMax(appState, storage);
            // numbers = calculateNumberHelper(
            //   appState.arytmeticOperation,
            //   appState.difficulty
            // );
            leftNumberValue = numbers[0];
            rightNumberValue = numbers[1];
            leftNumber.innerText = leftNumberValue.toString();
            rightNumber.innerText = rightNumberValue.toString();
            appState.state = STATE_TYPE.check;
            buttonMain.innerText = appState.state;
            counterIntervalIndex = setInterval(() => {
                // console.log(counterProgress);
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
            buttonMenu.classList.add("active");
            counterProgress = 1;
            clearInterval(counterIntervalIndex);
            appState.state = STATE_TYPE.asses;
            buttonMain.innerText = "good";
            buttonMenu.innerText = "wrong";
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
            console.log(appState.state + "ASSES");
            scoreNumber++;
            if (scoreNumber >= stopGameLimit) {
                clearInterval(counterIntervalIndex);
                gameFinished = true;
                appState.state = STATE_TYPE.initial;
                score.innerText = scoreNumber.toString();
                buttonMain.innerText = "again";
                buttonMenu.innerText = "menu";
                timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) 1%, transparent ${counterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                timeCounter.style.textAlign = "center";
                timeCounter.style.color = "red";
                timeCounter.innerText = "You win!!!";
                console.log("success!!!!");
                break;
            }
            else {
                appState.state = STATE_TYPE.check;
                buttonMenu.classList.remove("active");
                buttonMain.innerText = appState.state;
                buttonMenu.innerText = "menu";
                console.log("appState.arytmeticOperation");
                console.log(appState.arytmeticOperation);
                console.log("appState.gameMode");
                console.log(appState.gameMode);
                numbers = calculateNumberHelperMax(appState, storage);
                // numbers = calculateNumberHelper(
                //   appState.arytmeticOperation,
                //   appState.difficulty
                // );
                leftNumberValue = numbers[0];
                rightNumberValue = numbers[1];
                leftNumber.innerText = leftNumberValue.toString();
                rightNumber.innerText = rightNumberValue.toString();
                score.innerText = scoreNumber.toString();
                result.innerText = "---";
                counterIntervalIndex = setInterval(() => {
                    // console.log(counterProgress);
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
        }
        default:
            break;
    }
});
buttonMenu.addEventListener("click", (ev) => {
    console.log(appState.state + "ASSES");
    if (appState.state === STATE_TYPE.asses) {
        scoreNumber--;
        let wrongAnswer = [
            numbers[0],
            numbers[1],
            appState.arytmeticOperation,
        ];
        if (appState.gameMode !== "repretition") {
            wrongAnswers.push(wrongAnswer);
        }
        console.log(wrongAnswers);
        console.warn("MY INFO wrongAnswers" + "line: 152");
        appState.state = STATE_TYPE.check;
        buttonMain.innerText = appState.state;
        buttonMenu.innerText = "menu";
        console.log("appState.arytmeticOperation");
        console.log(appState.arytmeticOperation);
        console.log("appState.gameMode");
        console.log(appState.gameMode);
        ////////////////////
        numbers = calculateNumberHelperMax(appState, storage);
        // if (appState.gameMode === "repretition") {
        //   switch (appState.arytmeticOperation) {
        //     case "add": {
        //       numbers = storage.mistakesAdd[
        //         randomNumber(0, storage.mistakesAdd.length - 1)
        //       ]
        //         .split("--")
        //         .map((el) => +el);
        //       break;
        //     }
        //     case "substract": {
        //       numbers = storage.mistakesSubstract[
        //         randomNumber(0, storage.mistakesSubstract.length - 1)
        //       ]
        //         .split("--")
        //         .map((el) => +el);
        //       break;
        //     }
        //     case "devide": {
        //       numbers = storage.mistakesDevide[
        //         randomNumber(0, storage.mistakesDevide.length - 1)
        //       ]
        //         .split("--")
        //         .map((el) => +el);
        //       break;
        //     }
        //     case "multiply": {
        //       numbers = storage.mistakesMultiply[
        //         randomNumber(0, storage.mistakesMultiply.length - 1)
        //       ]
        //         .split("--")
        //         .map((el) => +el);
        //       break;
        //     }
        //   }
        // } else {
        //   numbers = calculateNumberHelper(
        //     appState.arytmeticOperation,
        //     appState.difficulty
        //   );
        // }
        leftNumberValue = numbers[0];
        rightNumberValue = numbers[1];
        leftNumber.innerText = leftNumberValue.toString();
        rightNumber.innerText = rightNumberValue.toString();
        score.innerText = scoreNumber.toString();
        result.innerText = "---";
        counterIntervalIndex = setInterval(() => {
            // console.log(counterProgress);
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
        setConvertedStorage(wrongAnswers, storage);
        wrongAnswers = [];
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
    sqrPlus.classList.add("active");
    sqrMinus.classList.remove("active");
    sqrMultiply.classList.remove("active");
    console.log(appState.arytmeticOperation);
});
sqrMinus.addEventListener("click", (ev) => {
    operationSignValue = "-";
    operationSign.innerText = "-";
    sqrPlus.classList.remove("active");
    sqrMinus.classList.add("active");
    sqrMultiply.classList.remove("active");
    appState.arytmeticOperation = OPERATION_TYPE.substraction;
});
sqrMultiply.addEventListener("click", (ev) => {
    operationSignValue = "x";
    operationSign.innerText = "x";
    sqrPlus.classList.remove("active");
    sqrMinus.classList.remove("active");
    sqrMultiply.classList.add("active");
    appState.arytmeticOperation = OPERATION_TYPE.multiplication;
});
const statisticsBtn = document.getElementById("statistics");
const statisticsList = document.getElementById("statisticsList");
const refreshStorageFn = () => {
    storage = getAndConvertStorage();
};
statisticsBtn.addEventListener("click", () => {
    createStatisticTable(body, getAndConvertStorage, refreshStorageFn);
});
