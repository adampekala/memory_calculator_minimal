import { calculateNumberHelper } from "./helpers.js";
import { STATE_TYPE, appState, MODE_TYPE, OPERATION_TYPE } from "./mode.js";

console.log(calculateNumberHelper(5));

let scoreNumber = 0;

const score = document.getElementById("score") as HTMLDivElement;

const result = document.getElementById("result") as HTMLDivElement;

const leftNumber = document.getElementById("left_number") as HTMLSpanElement;
const operationSign = document.getElementById(
  "operation_sign"
) as HTMLSpanElement;
const rightNumber = document.getElementById("right_number") as HTMLSpanElement;

const timeCounter = document.getElementById("time_counter") as HTMLDivElement;

const randomNumber = () => {
  return Math.floor(Math.random() * 10) + 1;
};

// const leftDigit

let leftNumberValue: number = 0;
let rightNumberValue: number = 0;
let operationSignValue = "x";
let operationResult: number = 0;

leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "---";

const buttonMain = document.getElementById("main_button") as HTMLDivElement;
const buttonExit = document.getElementById("button_exit") as HTMLDivElement;

//!!!!!!!!!!!
// const score = document.getElementById("score") as HTMLDivElement;

let counterIntervalIndex: number;
let counterProgress: number = 1;

buttonMain.addEventListener("click", (ev: MouseEvent) => {
  switch (true) {
    case appState.state === STATE_TYPE.initial: {
      leftNumberValue = randomNumber();
      rightNumberValue = randomNumber();
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
      leftNumberValue = randomNumber();
      rightNumberValue = randomNumber();
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

    default:
      break;
  }
});

buttonExit.addEventListener("click", (ev) => {
  if (appState.state === STATE_TYPE.asses) {
    console.log((ev.target as HTMLElement).id);
    scoreNumber--;
    appState.state = STATE_TYPE.check;
    buttonMain.innerText = appState.state;
    buttonExit.innerText = "exit";
    leftNumberValue = randomNumber();
    rightNumberValue = randomNumber();
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
