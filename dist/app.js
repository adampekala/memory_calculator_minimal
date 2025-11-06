import { calculateNumberHelperMax } from "./helpers/operationsNumbersGenerator.js";
import { STATE_TYPE, appState, OPERATION_TYPE, stopGameLimit, optionsContainer, } from "./optionsPanel.js";
import { getAndConvertLocalStorage, addWrongOperationToApplicationStorageAndLocalStorage, } from "./helpers/storageInteractions.js";
export const APPLICATION = {
    applicationGlobalState: "game",
    gameState: STATE_TYPE.initial,
    isGameFinished: false, //gameFinished
    mistakesFromStorage: null, //storage
    gameMode: "get 20", //gameMode
    gameDifficulty: 1, //difficulty
    gameTypeOfArithmenticOperation: "add",
    gameOperationSignValue: "x",
    gameScore: 0, //scoreNumber
    gameLeftNumber: 0,
    gameRightNumber: 0,
    gameCurrentCorrectAnswer: 0,
    gamePreviousCorrectAnswer: null, //lastResult
    wrongAnswer: null,
    wrongAnswersArray: [],
    gameCounterIntervalId: null,
    gameCounterProgress: 1,
    statisticsTableDisplayedOperation: "multiply", //statisticsTableMode
    setLeftNumberValue: (number) => {
        APPLICATION.gameLeftNumber = number;
    },
    setRightNumberValue: (number) => {
        APPLICATION.gameRightNumber = number;
    },
    setOperationSignValue: (sign) => {
        APPLICATION.gameOperationSignValue = sign;
    },
    refreshStorage: () => {
        storage = getAndConvertLocalStorage();
    },
    setGameFinished: (value) => {
        gameFinished = value;
    },
    setCounterProgress: (value) => {
        APPLICATION.gameCounterProgress = value;
    },
};
////////TODO
export let gameFinished = false;
export let numbers;
export let storage = getAndConvertLocalStorage();
export const setGameFinished = (value) => {
    gameFinished = value;
};
////////TODO
export const body = document.querySelector("body");
export const score = document.getElementById("score");
export const result = document.getElementById("result");
export const leftNumber = document.getElementById("left_number");
export const operationSign = document.getElementById("operation_sign");
export const rightNumber = document.getElementById("right_number");
export const timeCounter = document.getElementById("time_counter");
export const btnStartCheckGood = document.getElementById("main_button");
export const buttonMenu = document.getElementById("button_menu");
leftNumber.innerText = APPLICATION.gameLeftNumber.toString();
rightNumber.innerText = APPLICATION.gameRightNumber.toString();
operationSign.innerText = APPLICATION.gameOperationSignValue;
score.innerText = "---";
btnStartCheckGood.addEventListener("click", (ev) => {
    switch (true) {
        case appState.state === STATE_TYPE.initial: {
            if (gameFinished) {
                APPLICATION.gameScore = 0;
                score.innerText = "---";
                timeCounter.innerText = null;
            }
            gameFinished = false;
            numbers = calculateNumberHelperMax(appState, storage);
            APPLICATION.setLeftNumberValue(numbers[0]);
            APPLICATION.setRightNumberValue(numbers[1]);
            leftNumber.innerText = APPLICATION.gameLeftNumber.toString();
            rightNumber.innerText = APPLICATION.gameRightNumber.toString();
            appState.state = STATE_TYPE.check;
            btnStartCheckGood.classList.remove("controlButton-green");
            buttonMenu.classList.remove("controlButton-red");
            buttonMenu.classList.add("controlButton-menu");
            btnStartCheckGood.innerText = appState.state;
            APPLICATION.gameCounterIntervalId = setInterval(() => {
                if (!(APPLICATION.gameCounterProgress > 99)) {
                    timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                    APPLICATION.gameCounterProgress++;
                }
                else {
                    clearInterval(APPLICATION.gameCounterIntervalId);
                }
            }, 50);
            break;
        }
        case appState.state === STATE_TYPE.check: {
            buttonMenu.classList.add("active");
            APPLICATION.gameCounterProgress = 1;
            clearInterval(APPLICATION.gameCounterIntervalId);
            appState.state = STATE_TYPE.asses;
            btnStartCheckGood.classList.add("controlButton-green");
            btnStartCheckGood.innerText = "good";
            buttonMenu.classList.add("controlButton-red");
            buttonMenu.classList.remove("controlButton-menu");
            buttonMenu.innerText = "wrong";
            switch (true) {
                case appState.arytmeticOperation === OPERATION_TYPE.addition: {
                    APPLICATION.gameCurrentCorrectAnswer =
                        APPLICATION.gameLeftNumber + APPLICATION.gameRightNumber;
                    result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
                    break;
                }
                case appState.arytmeticOperation === OPERATION_TYPE.substraction: {
                    APPLICATION.gameCurrentCorrectAnswer =
                        APPLICATION.gameLeftNumber - APPLICATION.gameRightNumber;
                    result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
                    break;
                }
                case appState.arytmeticOperation === OPERATION_TYPE.multiplication: {
                    APPLICATION.gameCurrentCorrectAnswer =
                        APPLICATION.gameLeftNumber * APPLICATION.gameRightNumber;
                    result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
                    break;
                }
                default:
                    break;
            }
            break;
        }
        case appState.state === STATE_TYPE.asses: {
            APPLICATION.gameScore++;
            if (APPLICATION.gameScore >= stopGameLimit) {
                clearInterval(APPLICATION.gameCounterIntervalId);
                gameFinished = true;
                appState.state = STATE_TYPE.initial;
                score.innerText = APPLICATION.gameScore.toString();
                btnStartCheckGood.classList.remove("controlButton-green");
                buttonMenu.classList.remove("controlButton-red");
                buttonMenu.classList.add("controlButton-menu");
                btnStartCheckGood.innerText = "again";
                buttonMenu.innerText = "menu";
                timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) 1%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                timeCounter.style.textAlign = "center";
                timeCounter.style.color = "red";
                timeCounter.innerText = "You win!!!";
                break;
            }
            else {
                appState.state = STATE_TYPE.check;
                buttonMenu.classList.remove("active");
                btnStartCheckGood.classList.remove("controlButton-green");
                buttonMenu.classList.remove("controlButton-red");
                buttonMenu.classList.add("controlButton-menu");
                btnStartCheckGood.innerText = appState.state;
                buttonMenu.innerText = "menu";
                numbers = calculateNumberHelperMax(appState, storage);
                APPLICATION.setLeftNumberValue(numbers[0]);
                APPLICATION.setRightNumberValue(numbers[1]);
                leftNumber.innerText = APPLICATION.gameLeftNumber.toString();
                rightNumber.innerText = APPLICATION.gameRightNumber.toString();
                score.innerText = APPLICATION.gameScore.toString();
                result.innerText = "---";
                APPLICATION.gameCounterIntervalId = setInterval(() => {
                    if (!(APPLICATION.gameCounterProgress > 99)) {
                        timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                        APPLICATION.gameCounterProgress++;
                    }
                    else {
                        clearInterval(APPLICATION.gameCounterIntervalId);
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
    if (appState.state === STATE_TYPE.asses) {
        APPLICATION.gameScore--;
        let wrongAnswer = [
            numbers[0],
            numbers[1],
            appState.arytmeticOperation,
        ];
        if (appState.gameMode !== "repretition") {
            APPLICATION.wrongAnswersArray.push(wrongAnswer);
        }
        appState.state = STATE_TYPE.check;
        btnStartCheckGood.classList.remove("controlButton-green");
        buttonMenu.classList.remove("controlButton-red");
        buttonMenu.classList.add("controlButton-menu");
        btnStartCheckGood.innerText = appState.state;
        buttonMenu.innerText = "menu";
        numbers = calculateNumberHelperMax(appState, storage);
        APPLICATION.setLeftNumberValue(numbers[0]);
        APPLICATION.setRightNumberValue(numbers[1]);
        leftNumber.innerText = APPLICATION.gameLeftNumber.toString();
        rightNumber.innerText = APPLICATION.gameRightNumber.toString();
        score.innerText = APPLICATION.gameScore.toString();
        result.innerText = "---";
        APPLICATION.gameCounterIntervalId = setInterval(() => {
            if (!(APPLICATION.gameCounterProgress > 99)) {
                timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
                APPLICATION.gameCounterProgress++;
            }
            else {
                clearInterval(APPLICATION.gameCounterIntervalId);
            }
        }, 50);
    }
    else {
        addWrongOperationToApplicationStorageAndLocalStorage(APPLICATION.wrongAnswersArray, storage);
        APPLICATION.wrongAnswersArray = [];
        optionsContainer.classList.remove("closed");
    }
});
//# sourceMappingURL=app.js.map