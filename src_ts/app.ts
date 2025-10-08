import {
  calculateNumberHelper,
  getAndConvertStorage,
  setConvertedStorage,
} from "./helpers.js";
import { STATE_TYPE, appState, OPERATION_TYPE, stopGameLimit } from "./mode.js";
import { createStatisticTable } from "./createStatisticsTableHelper.js";

type WRONG_ANSWER = [number, number, OPERATION_TYPE];
let scoreNumber = 0;
let leftNumberValue: number = 0;
let rightNumberValue: number = 0;
let operationSignValue = "x";
let operationResult: number = 0;
let counterIntervalIndex: number;
let counterProgress: number = 1;
let gameFinished = false;
let numbers: number[];
let storage = getAndConvertStorage();
console.log(storage);

let wrongAnswers: [number, number, OPERATION_TYPE][] = [];

const body = document.querySelector("body");

const score = document.getElementById("score") as HTMLDivElement;
const result = document.getElementById("result") as HTMLDivElement;
const leftNumber = document.getElementById("left_number") as HTMLSpanElement;
const operationSign = document.getElementById(
  "operation_sign"
) as HTMLSpanElement;
const rightNumber = document.getElementById("right_number") as HTMLSpanElement;
const timeCounter = document.getElementById("time_counter") as HTMLDivElement;
const buttonMain = document.getElementById("main_button") as HTMLDivElement;
const buttonMenu = document.getElementById("button_menu") as HTMLDivElement;

leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "---";

buttonMain.addEventListener("click", (ev: MouseEvent) => {
  switch (true) {
    case appState.state === STATE_TYPE.initial: {
      if (gameFinished) {
        scoreNumber = 0;
        score.innerText = "---";
        timeCounter.innerText = null;
      }
      gameFinished = false;
      numbers = calculateNumberHelper(
        appState.arytmeticOperation,
        appState.difficulty
      );
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
        } else {
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
      } else {
        appState.state = STATE_TYPE.check;
        buttonMenu.classList.remove("active");
        buttonMain.innerText = appState.state;
        buttonMenu.innerText = "menu";
        numbers = calculateNumberHelper(
          appState.arytmeticOperation,
          appState.difficulty
        );
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
          } else {
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
  if (appState.state === STATE_TYPE.asses) {
    console.log((ev.target as HTMLElement).id);
    scoreNumber--;
    let wrongAnswer: WRONG_ANSWER = [
      numbers[0],
      numbers[1],
      appState.arytmeticOperation,
    ];
    wrongAnswers.push(wrongAnswer);
    console.log(wrongAnswers);
    console.warn("MY INFO wrongAnswers" + "line: 152");

    appState.state = STATE_TYPE.check;
    buttonMain.innerText = appState.state;
    buttonMenu.innerText = "menu";
    numbers = calculateNumberHelper(
      appState.arytmeticOperation,
      appState.difficulty
    );
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
      } else {
        clearInterval(counterIntervalIndex);
      }
    }, 50);
  } else {
    setConvertedStorage(wrongAnswers, storage);
    wrongAnswers = [];
    navigationContainer.classList.remove("closed");
  }
});

const optionButtonClose = document.getElementById(
  "backToCalculator_button"
) as HTMLDivElement;
const navigationContainer = document.getElementById(
  "navigation"
) as HTMLDivElement;

optionButtonClose.addEventListener("click", (ev) => {
  console.log("working");
  navigationContainer.classList.add("closed");
});

const sqrPlus = document.getElementById(
  "operation_toggler-add"
) as HTMLDivElement;
const sqrMinus = document.getElementById(
  "operation_toggler-substract"
) as HTMLDivElement;
const sqrMultiply = document.getElementById(
  "operation_toggler-multiply"
) as HTMLDivElement;

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

const statisticsBtn = document.getElementById(
  "statistics"
) as HTMLButtonElement;
const statisticsList = document.getElementById("statisticsList");

const refreshStorageFn = () => {
  storage = getAndConvertStorage();
};

statisticsBtn.addEventListener("click", () => {
  createStatisticTable(body, getAndConvertStorage, refreshStorageFn);
});
