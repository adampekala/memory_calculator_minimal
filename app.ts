const STATE_TYPE = {
  initial: "start",
  check: "check",
  asses: "asses",
};

const OPERATION_TYPE = {
  addition: "add",
  substraction: "minus",
  multiplication: "multiply",
};

const MODE_TYPE = {
  addition: ["up to 100", "up to 1000"],
  substraction: ["from 100", "from 1000"],
  multiplication: ["up to 50", "up to 100", "count down"],
};

let state = STATE_TYPE.initial;
let arytmeticOperation = OPERATION_TYPE.multiplication;
let currentMode = MODE_TYPE.multiplication[0];
const modeToggler = document.getElementById(
  "mode_toggler"
) as HTMLButtonElement;
const modeText = document.getElementById("mode_text") as HTMLSpanElement;

let modeTogglerIndex = 0;
modeToggler.addEventListener("click", (ev) => {
  if (arytmeticOperation === OPERATION_TYPE.multiplication) {
    console.log("Toggle");
    if (modeTogglerIndex < MODE_TYPE.multiplication.length - 1) {
      modeTogglerIndex++;
      modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
    } else {
      modeTogglerIndex = 0;
      modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
    }
  } else {
    console.log("NNNNN");
  }
});
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
    case state === STATE_TYPE.initial: {
      leftNumberValue = randomNumber();
      rightNumberValue = randomNumber();
      leftNumber.innerText = leftNumberValue.toString();
      rightNumber.innerText = rightNumberValue.toString();
      state = STATE_TYPE.check;
      buttonMain.innerText = state;

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
    case state === STATE_TYPE.check: {
      buttonExit.classList.add("active");
      counterProgress = 1;
      clearInterval(counterIntervalIndex);

      state = STATE_TYPE.asses;
      buttonMain.innerText = "good";
      buttonExit.innerText = "wrong";

      switch (true) {
        case arytmeticOperation === OPERATION_TYPE.addition: {
          operationResult = leftNumberValue + rightNumberValue;
          result.innerText = operationResult.toString();
          break;
        }
        case arytmeticOperation === OPERATION_TYPE.substraction: {
          operationResult = leftNumberValue - rightNumberValue;
          result.innerText = operationResult.toString();
          break;
        }
        case arytmeticOperation === OPERATION_TYPE.multiplication: {
          operationResult = leftNumberValue * rightNumberValue;
          result.innerText = operationResult.toString();
          break;
        }
        default:
          break;
      }
      break;
    }
    case state === STATE_TYPE.asses: {
      scoreNumber++;
      state = STATE_TYPE.check;
      buttonExit.classList.remove("active");
      buttonMain.innerText = state;
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
  if (state === STATE_TYPE.asses) {
    console.log((ev.target as HTMLElement).id);
    scoreNumber--;
    state = STATE_TYPE.check;
    buttonMain.innerText = state;
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

//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION

// const optionButton = document.getElementById("option_button") as HTMLDivElement;
const optionButtonClose = document.getElementById(
  "backToCalculator_button"
) as HTMLDivElement;

const navigationContainer = document.getElementById(
  "navigation"
) as HTMLDivElement;

// optionButton.addEventListener("mousedown", (ev) => {
//   console.log("option_button");
//   optionButton.classList.add("clicked");
//   optionContainer.classList.add("shown");
// });
// optionButton.addEventListener("mouseup", (ev) => {
//   console.log("option_button");
//   optionButton.classList.remove("clicked");
// });

optionButtonClose.addEventListener("click", (ev) => {
  console.log("working");

  // optionButtonClose.classList.add("clicked");
  navigationContainer.classList.add("closed");
});
// optionButtonClose.addEventListener("mouseup", (ev) => {
//   optionButtonClose.classList.remove("clicked");
// });

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
  arytmeticOperation = OPERATION_TYPE.addition;
  console.log(arytmeticOperation);
});
sqrMinus.addEventListener("click", (ev) => {
  operationSignValue = "-";
  operationSign.innerText = "-";
  arytmeticOperation = OPERATION_TYPE.substraction;
});
sqrMultiply.addEventListener("click", (ev) => {
  operationSignValue = "x";
  operationSign.innerText = "x";
  arytmeticOperation = OPERATION_TYPE.multiplication;
});

// --------------------------

// const changeToAdditionBtn = document.querySelector(
//   "#changeToAdditionBtn"
// ) as HTMLButtonElement;

// const changeToMuiltiplicationBtn = document.querySelector(
//   "#changeToMuiltiplicationBtn"
// ) as HTMLButtonElement;

// const changeToSubstractionBtn = document.querySelector(
//   "#changeToSubstractionBtn"
// ) as HTMLButtonElement;

// changeToAdditionBtn.addEventListener("click", (event) => {
//   screenOperationSign = "+";
//   arytmeticOperation = OPERATION_TYPE.addition;
//   console.log(screenOperationSign);
//   console.log(arytmeticOperation);
// });

// changeToMuiltiplicationBtn.addEventListener("click", (event) => {
//   screenOperationSign = "x";
//   arytmeticOperation = OPERATION_TYPE.multiplication;
//   console.log(screenOperationSign);
//   console.log(arytmeticOperation);
// });

// changeToSubstractionBtn.addEventListener("click", (event) => {
//   screenOperationSign = "-";
//   arytmeticOperation = OPERATION_TYPE.substraction;
//   console.log(screenOperationSign);
//   console.log(arytmeticOperation);
// });
