import { APPLICATION, gamePanelHTMLElements } from "../app.js";
import { createStatisticTable } from "../helpers/StatisticTable/statisticsTableGenerator.js";
import { getAndConvertLocalStorage } from "../helpers/LocalStorage/storageInteractions.js";
// import { gamePanelHTMLElements } from "./gamePanel.js";
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
export const optionsContainer = document.getElementById("navigation");
const modeToggler = document.getElementById("mode_toggler");
const modeText = document.getElementById("mode_text");
let modeTogglerIndex = 0;
modeToggler.addEventListener("click", (ev) => {
    if (APPLICATION.gameTypeOfArithmenticOperation === "multiply") {
        if (modeTogglerIndex < MODE_TYPE.multiplication.length - 1) {
            modeTogglerIndex++;
            APPLICATION.gameMode = MODE_TYPE.multiplication[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            APPLICATION.gameMode = MODE_TYPE.multiplication[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
        }
    }
    else if (APPLICATION.gameTypeOfArithmenticOperation === "substract") {
        if (modeTogglerIndex < MODE_TYPE.substraction.length - 1) {
            modeTogglerIndex++;
            APPLICATION.gameMode = MODE_TYPE.substraction[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.substraction[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            APPLICATION.gameMode = MODE_TYPE.substraction[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.substraction[modeTogglerIndex];
        }
    }
    else if (APPLICATION.gameTypeOfArithmenticOperation === "add") {
        if (modeTogglerIndex < MODE_TYPE.addition.length - 1) {
            modeTogglerIndex++;
            APPLICATION.gameMode = MODE_TYPE.addition[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.addition[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            APPLICATION.gameMode = MODE_TYPE.addition[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.addition[modeTogglerIndex];
        }
    }
    else if (APPLICATION.gameTypeOfArithmenticOperation === "devide") {
        if (modeTogglerIndex < MODE_TYPE.division.length - 1) {
            modeTogglerIndex++;
            APPLICATION.gameMode = MODE_TYPE.division[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.division[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            APPLICATION.gameMode = MODE_TYPE.division[modeTogglerIndex];
            APPLICATION.setStopGameLimit(APPLICATION.gameMode);
            modeText.innerText = MODE_TYPE.division[modeTogglerIndex];
        }
    }
});
const difficultyDecreaseToggler = document.getElementById("difficulty_toggler-decrease");
const difficultyIncreaseToggler = document.getElementById("difficulty_toggler-increase");
const difficultyScale = document.getElementById("difficulty_scale");
difficultyDecreaseToggler.addEventListener("click", () => {
    if (APPLICATION.gameDifficulty > 1) {
        let scaleInnettext = [];
        APPLICATION.gameDifficulty--;
        scaleInnettext.length = APPLICATION.gameDifficulty;
        scaleInnettext.fill("\u2606");
        difficultyScale.innerText = scaleInnettext.join("");
    }
});
difficultyIncreaseToggler.addEventListener("click", () => {
    if (APPLICATION.gameDifficulty < 5) {
        let scaleInnettext = [];
        APPLICATION.gameDifficulty++;
        scaleInnettext.length = APPLICATION.gameDifficulty;
        scaleInnettext.fill("\u2606");
        difficultyScale.innerText = scaleInnettext.join("");
    }
});
const btnOptionsOperationTogglerPlus = document.getElementById("operation_toggler-add");
const btnOptionsOperationTogglerMinus = document.getElementById("operation_toggler-substract");
const btnOptionsOperationTogglerMultiply = document.getElementById("operation_toggler-multiply");
const btnShowStatistics = document.getElementById("statistics");
const btnOptionBackToGame = document.getElementById("backToCalculator_button");
console.log(btnOptionBackToGame);
btnOptionBackToGame.addEventListener("click", (ev) => {
    console.log("back");
    gamePanelHTMLElements.score.innerText = "---";
    APPLICATION.setGameState("start");
    APPLICATION.gameNumbers = [0, 0];
    gamePanelHTMLElements.leftNumber.innerText =
        APPLICATION.gameNumbers[0].toString();
    gamePanelHTMLElements.rightNumber.innerText =
        APPLICATION.gameNumbers[1].toString();
    APPLICATION.setCounterProgress(1);
    gamePanelHTMLElements.timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
    clearInterval(APPLICATION.gameCounterIntervalId);
    APPLICATION.setGameFinished(true);
    APPLICATION.gamePreviousCorrectAnswer = null;
    gamePanelHTMLElements.btnStartCheckGood.innerText = "start";
    optionsContainer.classList.add("closed");
});
btnOptionsOperationTogglerPlus.addEventListener("click", (ev) => {
    APPLICATION.setOperationSignValue("+");
    gamePanelHTMLElements.operationSign.innerText = "+";
    APPLICATION.gameTypeOfArithmenticOperation = "add";
    btnOptionsOperationTogglerPlus.classList.add("pressed");
    btnOptionsOperationTogglerMinus.classList.remove("pressed");
    btnOptionsOperationTogglerMultiply.classList.remove("pressed");
});
btnOptionsOperationTogglerMinus.addEventListener("click", (ev) => {
    APPLICATION.setOperationSignValue("-");
    gamePanelHTMLElements.operationSign.innerText = "-";
    btnOptionsOperationTogglerPlus.classList.remove("pressed");
    btnOptionsOperationTogglerMinus.classList.add("pressed");
    btnOptionsOperationTogglerMultiply.classList.remove("pressed");
    APPLICATION.gameTypeOfArithmenticOperation = "substract";
});
btnOptionsOperationTogglerMultiply.addEventListener("click", (ev) => {
    APPLICATION.setOperationSignValue("x");
    gamePanelHTMLElements.operationSign.innerText = "x";
    btnOptionsOperationTogglerPlus.classList.remove("pressed");
    btnOptionsOperationTogglerMinus.classList.remove("pressed");
    btnOptionsOperationTogglerMultiply.classList.add("pressed");
    APPLICATION.gameTypeOfArithmenticOperation = "multiply";
});
btnShowStatistics.addEventListener("click", () => {
    createStatisticTable(gamePanelHTMLElements.body, getAndConvertLocalStorage, APPLICATION.refreshStorage);
});
//# sourceMappingURL=optionsPanel.js.map