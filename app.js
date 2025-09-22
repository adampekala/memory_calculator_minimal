var STATE_TYPE = {
    initial: "start",
    check: "check",
    asses: "asses",
};
var OPERATION_TYPE = {
    addition: "add",
    substraction: "minus",
    multiplication: "multiply",
};
var MODE_TYPE = {
    addition: ["up to 100", "up to 1000"],
    substraction: ["from 100", "from 1000"],
    multiplication: ["up to 50", "up to 100", "count down"],
};
var state = STATE_TYPE.initial;
var arytmeticOperation = OPERATION_TYPE.multiplication;
var currentMode = MODE_TYPE.multiplication[0];
var modeToggler = document.getElementById("mode_toggler");
var modeText = document.getElementById("mode_text");
var modeTogglerIndex = 0;
modeToggler.addEventListener("click", function (ev) {
    if (arytmeticOperation === OPERATION_TYPE.multiplication) {
        console.log("Toggle");
        if (modeTogglerIndex < MODE_TYPE.multiplication.length - 1) {
            modeTogglerIndex++;
            modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
        }
        else {
            modeTogglerIndex = 0;
            modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
        }
    }
    else {
        console.log("NNNNN");
    }
});
var scoreNumber = 0;
var score = document.getElementById("score");
var result = document.getElementById("result");
var leftNumber = document.getElementById("left_number");
var operationSign = document.getElementById("operation_sign");
var rightNumber = document.getElementById("right_number");
var timeCounter = document.getElementById("time_counter");
var randomNumber = function () {
    return Math.floor(Math.random() * 10) + 1;
};
// const leftDigit
var leftNumberValue = 0;
var rightNumberValue = 0;
var operationSignValue = "x";
var operationResult = 0;
leftNumber.innerText = leftNumberValue.toString();
rightNumber.innerText = rightNumberValue.toString();
operationSign.innerText = operationSignValue;
score.innerText = "---";
var buttonMain = document.getElementById("main_button");
var buttonExit = document.getElementById("button_exit");
//!!!!!!!!!!!
// const score = document.getElementById("score") as HTMLDivElement;
var counterIntervalIndex;
var counterProgress = 1;
buttonMain.addEventListener("click", function (ev) {
    switch (true) {
        case state === STATE_TYPE.initial: {
            leftNumberValue = randomNumber();
            rightNumberValue = randomNumber();
            leftNumber.innerText = leftNumberValue.toString();
            rightNumber.innerText = rightNumberValue.toString();
            state = STATE_TYPE.check;
            buttonMain.innerText = state;
            counterIntervalIndex = setInterval(function () {
                console.log(counterProgress);
                if (!(counterProgress > 99)) {
                    timeCounter.style.backgroundImage = "linear-gradient( to right, rgb(22, 40, 159) ".concat(counterProgress, "%, transparent ").concat(counterProgress, "% 99%, rgb(22, 40, 159) 99%)");
                    counterProgress++;
                }
                else {
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
            counterIntervalIndex = setInterval(function () {
                console.log(counterProgress);
                if (!(counterProgress > 99)) {
                    timeCounter.style.backgroundImage = "linear-gradient( to right, rgb(22, 40, 159) ".concat(counterProgress, "%, transparent ").concat(counterProgress, "% 99%, rgb(22, 40, 159) 99%)");
                    counterProgress++;
                }
                else {
                    clearInterval(counterIntervalIndex);
                }
            }, 50);
            break;
        }
        default:
            break;
    }
});
buttonExit.addEventListener("click", function (ev) {
    if (state === STATE_TYPE.asses) {
        console.log(ev.target.id);
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
        counterIntervalIndex = setInterval(function () {
            console.log(counterProgress);
            if (!(counterProgress > 99)) {
                timeCounter.style.backgroundImage = "linear-gradient( to right, rgb(22, 40, 159) ".concat(counterProgress, "%, transparent ").concat(counterProgress, "% 99%, rgb(22, 40, 159) 99%)");
                counterProgress++;
            }
            else {
                clearInterval(counterIntervalIndex);
            }
        }, 50);
    }
    else {
        navigationContainer.classList.remove("closed");
    }
});
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION//OPTION
// const optionButton = document.getElementById("option_button") as HTMLDivElement;
var optionButtonClose = document.getElementById("backToCalculator_button");
var navigationContainer = document.getElementById("navigation");
// optionButton.addEventListener("mousedown", (ev) => {
//   console.log("option_button");
//   optionButton.classList.add("clicked");
//   optionContainer.classList.add("shown");
// });
// optionButton.addEventListener("mouseup", (ev) => {
//   console.log("option_button");
//   optionButton.classList.remove("clicked");
// });
optionButtonClose.addEventListener("click", function (ev) {
    console.log("working");
    // optionButtonClose.classList.add("clicked");
    navigationContainer.classList.add("closed");
});
// optionButtonClose.addEventListener("mouseup", (ev) => {
//   optionButtonClose.classList.remove("clicked");
// });
var sqrPlus = document.getElementById("operation_toggler-add");
var sqrMinus = document.getElementById("operation_toggler-substract");
var sqrMultiply = document.getElementById("operation_toggler-multiply");
sqrPlus.addEventListener("click", function (ev) {
    operationSignValue = "+";
    operationSign.innerText = "+";
    arytmeticOperation = OPERATION_TYPE.addition;
    console.log(arytmeticOperation);
});
sqrMinus.addEventListener("click", function (ev) {
    operationSignValue = "-";
    operationSign.innerText = "-";
    arytmeticOperation = OPERATION_TYPE.substraction;
});
sqrMultiply.addEventListener("click", function (ev) {
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
