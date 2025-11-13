import { calculateNumberHelperMax } from "./helpers/NumbersGenerator/operationsNumbersGenerator.js";
import { optionsContainer } from "./Panels/optionsPanel.js";
import {
  APPLICATION_OBJECT,
  WRONG_ANSWER,
  GAME_STATES,
  MODE_ALL,
} from "./TypesAndInterfaces/gameObject.js";
import {
  getAndConvertLocalStorage,
  addWrongOperationToApplicationStorageAndLocalStorage,
} from "./helpers/LocalStorage/storageInteractions.js";

export const APPLICATION: APPLICATION_OBJECT = {
  applicationGlobalState: "game",
  gameState: "start",
  isGameFinished: false,
  mistakesFromStorage: null,
  gameMode: "get 20",
  gameDifficulty: 1,
  gameTypeOfArithmenticOperation: "multiply",
  gameOperationSignValue: "x",
  gameScore: 0,
  gameNumbers: [0, 0],
  gameCurrentCorrectAnswer: 0,
  gamePreviousCorrectAnswer: null,
  gameStopLimit: null,
  wrongAnswer: null,
  wrongAnswersArray: [],
  gameCounterIntervalId: null,
  gameCounterProgress: 1,
  statisticsTableDisplayedOperation: "multiply",

  setGameState: (state: GAME_STATES) => {
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
  setStopGameLimit: (modeType: MODE_ALL = "get 20") => {
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

///////TODO
export const gamePanelHTMLElements = {
  body: document.querySelector("body") as HTMLBodyElement,
  score: document.getElementById("score") as HTMLDivElement,
  result: document.getElementById("result") as HTMLDivElement,
  leftNumber: document.getElementById("left_number") as HTMLSpanElement,
  operationSign: document.getElementById("operation_sign") as HTMLSpanElement,
  rightNumber: document.getElementById("right_number") as HTMLSpanElement,
  timeCounter: document.getElementById("time_counter") as HTMLDivElement,
  btnStartCheckGood: document.getElementById("main_button") as HTMLDivElement,
  buttonMenu: document.getElementById("button_menu") as HTMLDivElement,
};

console.log("game PANEL");
console.log(gamePanelHTMLElements.score);

///////TODO

export const body = document.querySelector("body") as HTMLBodyElement;
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

leftNumber.innerText = APPLICATION.gameNumbers[0].toString();
rightNumber.innerText = APPLICATION.gameNumbers[1].toString();
operationSign.innerText = APPLICATION.gameOperationSignValue;
score.innerText = "---";

btnStartCheckGood.addEventListener("click", (ev: MouseEvent) => {
  switch (true) {
    case APPLICATION.gameState === "start": {
      if (APPLICATION.isGameFinished) {
        APPLICATION.gameScore = 0;
        score.innerText = "---";
        timeCounter.innerText = null;
      }

      APPLICATION.setGameFinished(false);
      APPLICATION.gameNumbers = calculateNumberHelperMax(
        APPLICATION,
        APPLICATION.mistakesFromStorage
      );

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
        } else {
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
            APPLICATION.gameNumbers[0] + APPLICATION.gameNumbers[1];
          result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
          break;
        }
        case APPLICATION.gameTypeOfArithmenticOperation === "substract": {
          APPLICATION.gameCurrentCorrectAnswer =
            APPLICATION.gameNumbers[0] - APPLICATION.gameNumbers[1];
          result.innerText = APPLICATION.gameCurrentCorrectAnswer.toString();
          break;
        }
        case APPLICATION.gameTypeOfArithmenticOperation === "multiply": {
          APPLICATION.gameCurrentCorrectAnswer =
            APPLICATION.gameNumbers[0] * APPLICATION.gameNumbers[1];
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
      } else {
        APPLICATION.setGameState("check");
        buttonMenu.classList.remove("active");
        btnStartCheckGood.classList.remove("controlButton-green");
        buttonMenu.classList.remove("controlButton-red");
        buttonMenu.classList.add("controlButton-menu");
        btnStartCheckGood.innerText = APPLICATION.gameState;
        buttonMenu.innerText = "menu";

        APPLICATION.gameNumbers = calculateNumberHelperMax(
          APPLICATION,
          APPLICATION.mistakesFromStorage
        );

        leftNumber.innerText = APPLICATION.gameNumbers[0].toString();
        rightNumber.innerText = APPLICATION.gameNumbers[1].toString();

        score.innerText = APPLICATION.gameScore.toString();
        result.innerText = "---";
        APPLICATION.gameCounterIntervalId = setInterval(() => {
          if (!(APPLICATION.gameCounterProgress > 99)) {
            timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
            APPLICATION.gameCounterProgress++;
          } else {
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
    let wrongAnswer: WRONG_ANSWER = [
      APPLICATION.gameNumbers[0],
      APPLICATION.gameNumbers[1],
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

    APPLICATION.gameNumbers = calculateNumberHelperMax(
      APPLICATION,
      APPLICATION.mistakesFromStorage
    );

    leftNumber.innerText = APPLICATION.gameNumbers[0].toString();
    rightNumber.innerText = APPLICATION.gameNumbers[1].toString();

    score.innerText = APPLICATION.gameScore.toString();
    result.innerText = "---";
    APPLICATION.gameCounterIntervalId = setInterval(() => {
      if (!(APPLICATION.gameCounterProgress > 99)) {
        timeCounter.style.backgroundImage = `linear-gradient( to right, rgb(22, 40, 159) ${APPLICATION.gameCounterProgress}%, transparent ${APPLICATION.gameCounterProgress}% 99%, rgb(22, 40, 159) 99%)`;
        APPLICATION.gameCounterProgress++;
      } else {
        clearInterval(APPLICATION.gameCounterIntervalId);
      }
    }, 50);
  } else {
    addWrongOperationToApplicationStorageAndLocalStorage(
      APPLICATION.wrongAnswersArray,
      APPLICATION.mistakesFromStorage
    );
    APPLICATION.wrongAnswersArray = [];
    optionsContainer.classList.remove("closed");
  }
});
