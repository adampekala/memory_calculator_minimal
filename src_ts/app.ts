import { calculateNumberHelperMax } from "./helpers/operationsNumbersGenerator.js";
import {
  STATE_TYPE,
  appState,
  OPERATION_TYPE,
  stopGameLimit,
  APP_STATE,
  optionsContainer,
} from "./optionsPanel.js";
import { createStatisticTable } from "./helpers/statisticsTableGenerator.js";
import {
  getAndConvertLocalStorage,
  MISTAKES_OBJ,
  addWrongOperationToApplicationStorageAndLocalStorage,
} from "./helpers/storageInteractions.js";

type WRONG_ANSWER = [number, number, OPERATION_TYPE];
export let scoreNumber = 0;
export let leftNumberValue: number = 0;
export let rightNumberValue: number = 0;
export let operationSignValue: string = "x";
export let operationResult: number = 0;
export let counterIntervalIndex: number;
export let counterProgress: number = 1;
export let gameFinished: boolean = false;
export let numbers: number[];
export let storage: MISTAKES_OBJ = getAndConvertLocalStorage();

export let wrongAnswers: WRONG_ANSWER[] = [];

export const setLeftNumberValue = (number) => {
  leftNumberValue = number;
};
export const setRightNumberValue = (number) => {
  rightNumberValue = number;
};

export const setOperationSignValue = (sign) => {
  operationSignValue = sign;
};
export const refreshStorageFn = () => {
  storage = getAndConvertLocalStorage();
};

export const setGameFinished = (value) => {
  gameFinished = value;
};

export const setCounterProgress = (value) => {
  counterProgress = value;
};

export const body = document.querySelector("body");
export const score = document.getElementById("score") as HTMLDivElement;
export const result = document.getElementById("result") as HTMLDivElement;
export const leftNumber = document.getElementById(
  "left_number"
) as HTMLSpanElement;
export const operationSign = document.getElementById(
  "operation_sign"
) as HTMLSpanElement;
export const rightNumber = document.getElementById(
  "right_number"
) as HTMLSpanElement;
export const timeCounter = document.getElementById(
  "time_counter"
) as HTMLDivElement;
export const btnStartCheckGood = document.getElementById(
  "main_button"
) as HTMLDivElement;
export const buttonMenu = document.getElementById(
  "button_menu"
) as HTMLDivElement;

leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "---";

btnStartCheckGood.addEventListener("click", (ev: MouseEvent) => {
  switch (true) {
    case appState.state === STATE_TYPE.initial: {
      if (gameFinished) {
        scoreNumber = 0;
        score.innerText = "---";
        timeCounter.innerText = null;
      }
      gameFinished = false;

      numbers = calculateNumberHelperMax(appState, storage);

      leftNumberValue = numbers[0];
      rightNumberValue = numbers[1];
      leftNumber.innerText = leftNumberValue.toString();
      rightNumber.innerText = rightNumberValue.toString();
      appState.state = STATE_TYPE.check;
      btnStartCheckGood.classList.remove("controlButton-green");
      buttonMenu.classList.remove("controlButton-red");
      buttonMenu.classList.add("controlButton-menu");
      btnStartCheckGood.innerText = appState.state;

      counterIntervalIndex = setInterval(() => {
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
      btnStartCheckGood.classList.add("controlButton-green");
      btnStartCheckGood.innerText = "good";
      buttonMenu.classList.add("controlButton-red");
      buttonMenu.classList.remove("controlButton-menu");
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
        btnStartCheckGood.classList.remove("controlButton-green");
        buttonMenu.classList.remove("controlButton-red");
        buttonMenu.classList.add("controlButton-menu");
        btnStartCheckGood.innerText = "again";
        buttonMenu.innerText = "menu";
        timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) 1%, transparent ${counterProgress}% 99%, rgb(22, 40, 159) 99%)`;
        timeCounter.style.textAlign = "center";
        timeCounter.style.color = "red";
        timeCounter.innerText = "You win!!!";

        break;
      } else {
        appState.state = STATE_TYPE.check;
        buttonMenu.classList.remove("active");
        btnStartCheckGood.classList.remove("controlButton-green");
        buttonMenu.classList.remove("controlButton-red");
        buttonMenu.classList.add("controlButton-menu");
        btnStartCheckGood.innerText = appState.state;
        buttonMenu.innerText = "menu";

        numbers = calculateNumberHelperMax(appState, storage);
        leftNumberValue = numbers[0];
        rightNumberValue = numbers[1];
        leftNumber.innerText = leftNumberValue.toString();
        rightNumber.innerText = rightNumberValue.toString();
        score.innerText = scoreNumber.toString();
        result.innerText = "---";
        counterIntervalIndex = setInterval(() => {
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
    scoreNumber--;
    let wrongAnswer: WRONG_ANSWER = [
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
    btnStartCheckGood.classList.remove("controlButton-green");
    buttonMenu.classList.remove("controlButton-red");
    buttonMenu.classList.add("controlButton-menu");
    btnStartCheckGood.innerText = appState.state;
    buttonMenu.innerText = "menu";

    numbers = calculateNumberHelperMax(appState, storage);

    leftNumberValue = numbers[0];
    rightNumberValue = numbers[1];
    leftNumber.innerText = leftNumberValue.toString();
    rightNumber.innerText = rightNumberValue.toString();
    score.innerText = scoreNumber.toString();
    result.innerText = "---";
    counterIntervalIndex = setInterval(() => {
      if (!(counterProgress > 99)) {
        timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${counterProgress}%, transparent ${counterProgress}% 99%, rgb(22, 40, 159) 99%)`;
        counterProgress++;
      } else {
        clearInterval(counterIntervalIndex);
      }
    }, 50);
  } else {
    addWrongOperationToApplicationStorageAndLocalStorage(wrongAnswers, storage);
    wrongAnswers = [];
    optionsContainer.classList.remove("closed");
  }
});
