import { calculateNumberHelperMax } from "./helpers/NumbersGenerator/operationsNumbersGenerator.js";
import { optionsContainer } from "./Panels/optionsPanel.js";
import { getAndConvertLocalStorage, addWrongOperationToApplicationStorageAndLocalStorage, } from "./helpers/LocalStorage/storageInteractions.js";
export const APPLICATION = {
    applicationGlobalState: "game",
    gameState: "start",
    isGameFinished: false, //gameFinished
    mistakesFromStorage: null, //storage
    gameMode: "get 20", //gameMode
    gameDifficulty: 1, //difficulty
    gameTypeOfArithmenticOperation: "multiply",
    gameOperationSignValue: "x",
    gameScore: 0, //scoreNumber
    gameNumbers: null,
    gameLeftNumber: 0,
    gameRightNumber: 0,
    gameCurrentCorrectAnswer: 0,
    gamePreviousCorrectAnswer: null, //lastResult
    gameStopLimit: null,
    wrongAnswer: null,
    wrongAnswersArray: [],
    gameCounterIntervalId: null,
    gameCounterProgress: 1,
    statisticsTableDisplayedOperation: "multiply", //statisticsTableMode
    setGameState: (state) => {
        APPLICATION.gameState = state;
    },
    setOperationSignValue: (sign) => {
        APPLICATION.gameOperationSignValue = sign;
    },
    refreshStorage: () => {
        APPLICATION.mistakesFromStorage = getAndConvertLocalStorage();
    },
    setGameFinished: (value) => {
        APPLICATION.isGameFinished = value;
    },
    setCounterProgress: (value) => {
        APPLICATION.gameCounterProgress = value;
    },
    setStopGameLimit: (modeType = "get 20") => {
        switch (modeType) {
            case "get 20": {
                APPLICATION.gameStopLimit = 20;
                break;
            }
            case "get 50": {
                APPLICATION.gameStopLimit = 50;
                break;
            }
            default: {
                APPLICATION.gameStopLimit = Infinity;
                break;
            }
        }
    },
};
APPLICATION.refreshStorage();
APPLICATION.setStopGameLimit(APPLICATION.gameMode);
////////TODO
export let numbers;
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
        case APPLICATION.gameState === "start": {
            if (APPLICATION.isGameFinished) {
                APPLICATION.gameScore = 0;
                score.innerText = "---";
                timeCounter.innerText = null;
            }
            APPLICATION.setGameFinished(false);
            APPLICATION.gameNumbers = calculateNumberHelperMax(APPLICATION, APPLICATION.mistakesFromStorage);
            leftNumber.innerText = APPLICATION.gameNumbers[0].toString();
            rightNumber.innerText = APPLICATION.gameNumbers[1].toString();
            APPLICATION.setGameState("check");
            btnStartCheckGood.classList.remove("controlButton-green");
            buttonMenu.classList.remove("controlButton-red");
            buttonMenu.classList.add("controlButton-menu");
            btnStartCheckGood.innerText = APPLICATION.gameState;
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
        case APPLICATION.gameState === "check": {
            buttonMenu.classList.add("active");
            APPLICATION.gameCounterProgress = 1;
            clearInterval(APPLICATION.gameCounterIntervalId);
            APPLICATION.setGameState("asses");
            btnStartCheckGood.classList.add("controlButton-green");
            btnStartCheckGood.innerText = "good";
            buttonMenu.classList.add("controlButton-red");
            buttonMenu.classList.remove("controlButton-menu");
            buttonMenu.innerText = "wrong";
            switch (true) {
                case APPLICATION.gameTypeOfArithmenticOperation === "add": {
                    APPLICATION.gameCurrentCorrectAnswer =
                        APPLICATION.gameLeftNumber + APPLICATION.gameRightNumber;
                    result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
                    break;
                }
                case APPLICATION.gameTypeOfArithmenticOperation === "substract": {
                    APPLICATION.gameCurrentCorrectAnswer =
                        APPLICATION.gameLeftNumber - APPLICATION.gameRightNumber;
                    result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
                    break;
                }
                case APPLICATION.gameTypeOfArithmenticOperation === "multiply": {
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
        case APPLICATION.gameState === "asses": {
            APPLICATION.gameScore++;
            if (APPLICATION.gameScore >= APPLICATION.gameStopLimit) {
                clearInterval(APPLICATION.gameCounterIntervalId);
                APPLICATION.setGameFinished(true);
                APPLICATION.setGameState("start");
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
                APPLICATION.setGameState("check");
                buttonMenu.classList.remove("active");
                btnStartCheckGood.classList.remove("controlButton-green");
                buttonMenu.classList.remove("controlButton-red");
                buttonMenu.classList.add("controlButton-menu");
                btnStartCheckGood.innerText = APPLICATION.gameState;
                buttonMenu.innerText = "menu";
                APPLICATION.gameNumbers = calculateNumberHelperMax(APPLICATION, APPLICATION.mistakesFromStorage);
                leftNumber.innerText = APPLICATION.gameNumbers[0].toString();
                rightNumber.innerText = APPLICATION.gameNumbers[1].toString();
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
    if (APPLICATION.gameState === "asses") {
        APPLICATION.gameScore--;
        let wrongAnswer = [
            numbers[0],
            numbers[1],
            APPLICATION.gameTypeOfArithmenticOperation,
        ];
        if (APPLICATION.gameMode !== "repretition") {
            APPLICATION.wrongAnswersArray.push(wrongAnswer);
        }
        APPLICATION.setGameState("check");
        btnStartCheckGood.classList.remove("controlButton-green");
        buttonMenu.classList.remove("controlButton-red");
        buttonMenu.classList.add("controlButton-menu");
        btnStartCheckGood.innerText = APPLICATION.gameState;
        buttonMenu.innerText = "menu";
        APPLICATION.gameNumbers = calculateNumberHelperMax(APPLICATION, APPLICATION.mistakesFromStorage);
        leftNumber.innerText = APPLICATION.gameNumbers[0].toString();
        rightNumber.innerText = APPLICATION.gameNumbers[1].toString();
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
        addWrongOperationToApplicationStorageAndLocalStorage(APPLICATION.wrongAnswersArray, APPLICATION.mistakesFromStorage);
        APPLICATION.wrongAnswersArray = [];
        optionsContainer.classList.remove("closed");
    }
});
//# sourceMappingURL=app.js.map