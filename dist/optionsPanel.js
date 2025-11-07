import { countStopGameLimit } from "./helpers/operationsNumbersGenerator.js";
import { APPLICATION, score, leftNumber, rightNumber, operationSign, body, btnStartCheckGood, timeCounter, setGameFinished, } from "./app.js";
import { createStatisticTable } from "./helpers/statisticsTableGenerator.js";
import { getAndConvertLocalStorage } from "./helpers/storageInteractions.js";
export const STATE_TYPE = {
    initial: "start",
    check: "check",
    asses: "asses",
};
export const OPERATION_TYPE = {
    addition: "add",
    substraction: "substract",
    multiplication: "multiply",
    division: "devide",
};
export const MODE_TYPE = {
    addition: [
        "get 20",
        "get 50",
        "repretition",
        "count down",
        "up to 100",
        "up to 1000",
        "train",
    ],
    substraction: [
        "get 20",
        "get 50",
        "repretition",
        "count down",
        "from 100",
        "from 1000",
        "train",
    ],
    multiplication: ["get 20", "get 50", "repretition", "count down", "train"],
    division: ["get 20", "get 50", "repretition", "count down", "train"],
};
export const appState = {
    state: STATE_TYPE.initial,
    arytmeticOperation: OPERATION_TYPE.multiplication,
    scoreNumber: 0,
    difficulty: 1,
    gameMode: MODE_TYPE.multiplication[0],
    statisticsTableMode: OPERATION_TYPE.multiplication,
    lastResult: null,
};
export let stopGameLimit = countStopGameLimit(appState.gameMode);
export const optionsContainer = document.getElementById("navigation");
const modeToggler = document.getElementById("mode_toggler");
const modeText = document.getElementById("mode_text");
let modeTogglerIndex = 0;
modeToggler.addEventListener("click", (ev) => {
    if (appState.arytmeticOperation === OPERATION_TYPE.multiplication) {
        if (modeTogglerIndex < MODE_TYPE.multiplication.length - 1) {
            modeTogglerIndex++;
            appState.gameMode = MODE_TYPE.multiplication[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            appState.gameMode = MODE_TYPE.multiplication[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
        }
    }
    else if (appState.arytmeticOperation === OPERATION_TYPE.substraction) {
        if (modeTogglerIndex < MODE_TYPE.substraction.length - 1) {
            modeTogglerIndex++;
            appState.gameMode = MODE_TYPE.substraction[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.substraction[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            appState.gameMode = MODE_TYPE.substraction[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.substraction[modeTogglerIndex];
        }
    }
    else if (appState.arytmeticOperation === OPERATION_TYPE.addition) {
        if (modeTogglerIndex < MODE_TYPE.addition.length - 1) {
            modeTogglerIndex++;
            appState.gameMode = MODE_TYPE.addition[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.addition[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            appState.gameMode = MODE_TYPE.addition[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.addition[modeTogglerIndex];
        }
    }
    else if (appState.arytmeticOperation === OPERATION_TYPE.division) {
        if (modeTogglerIndex < MODE_TYPE.division.length - 1) {
            modeTogglerIndex++;
            appState.gameMode = MODE_TYPE.division[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.division[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            appState.gameMode = MODE_TYPE.division[modeTogglerIndex];
            stopGameLimit = countStopGameLimit(appState.gameMode);
            modeText.innerText = MODE_TYPE.division[modeTogglerIndex];
        }
    }
});
const difficultyDecreaseToggler = document.getElementById("difficulty_toggler-decrease");
const difficultyIncreaseToggler = document.getElementById("difficulty_toggler-increase");
const difficultyScale = document.getElementById("difficulty_scale");
difficultyDecreaseToggler.addEventListener("click", () => {
    if (appState.difficulty > 1) {
        let scaleInnettext = [];
        appState.difficulty--;
        scaleInnettext.length = appState.difficulty;
        scaleInnettext.fill("\u2606");
        difficultyScale.innerText = scaleInnettext.join("");
    }
});
difficultyIncreaseToggler.addEventListener("click", () => {
    if (appState.difficulty < 5) {
        let scaleInnettext = [];
        appState.difficulty++;
        scaleInnettext.length = appState.difficulty;
        scaleInnettext.fill("\u2606");
        difficultyScale.innerText = scaleInnettext.join("");
    }
});
const btnOptionsOperationTogglerPlus = document.getElementById("operation_toggler-add");
const btnOptionsOperationTogglerMinus = document.getElementById("operation_toggler-substract");
const btnOptionsOperationTogglerMultiply = document.getElementById("operation_toggler-multiply");
const btnShowStatistics = document.getElementById("statistics");
const btnOptionBackToGame = document.getElementById("backToCalculator_button");
btnOptionBackToGame.addEventListener("click", (ev) => {
    score.innerText = "---";
    appState.state = "start";
    APPLICATION.setLeftNumberValue(0);
    APPLICATION.setRightNumberValue(0);
    leftNumber.innerText = APPLICATION.gameLeftNumber.toString();
    rightNumber.innerText = APPLICATION.gameRightNumber.toString();
    APPLICATION.setCounterProgress(1);
    timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
    clearInterval(APPLICATION.gameCounterIntervalId);
    setGameFinished(true);
    appState.lastResult = null;
    btnStartCheckGood.innerText = "start";
    optionsContainer.classList.add("closed");
});
btnOptionsOperationTogglerPlus.addEventListener("click", (ev) => {
    APPLICATION.setOperationSignValue("+");
    operationSign.innerText = "+";
    appState.arytmeticOperation = OPERATION_TYPE.addition;
    btnOptionsOperationTogglerPlus.classList.add("pressed");
    btnOptionsOperationTogglerMinus.classList.remove("pressed");
    btnOptionsOperationTogglerMultiply.classList.remove("pressed");
});
btnOptionsOperationTogglerMinus.addEventListener("click", (ev) => {
    APPLICATION.setOperationSignValue("-");
    operationSign.innerText = "-";
    btnOptionsOperationTogglerPlus.classList.remove("pressed");
    btnOptionsOperationTogglerMinus.classList.add("pressed");
    btnOptionsOperationTogglerMultiply.classList.remove("pressed");
    appState.arytmeticOperation = OPERATION_TYPE.substraction;
});
btnOptionsOperationTogglerMultiply.addEventListener("click", (ev) => {
    APPLICATION.setOperationSignValue("x");
    operationSign.innerText = "x";
    btnOptionsOperationTogglerPlus.classList.remove("pressed");
    btnOptionsOperationTogglerMinus.classList.remove("pressed");
    btnOptionsOperationTogglerMultiply.classList.add("pressed");
    appState.arytmeticOperation = OPERATION_TYPE.multiplication;
});
btnShowStatistics.addEventListener("click", () => {
    createStatisticTable(body, getAndConvertLocalStorage, APPLICATION.refreshStorage);
});
//# sourceMappingURL=optionsPanel.js.map