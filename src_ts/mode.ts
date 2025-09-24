export const STATE_TYPE = {
  initial: "start",
  check: "check",
  asses: "asses",
};

export const OPERATION_TYPE = {
  addition: "add",
  substraction: "minus",
  multiplication: "multiply",
};

export const appState = {
  state: STATE_TYPE.initial,
  arytmeticOperation: OPERATION_TYPE.multiplication,
  scoreNumber: 0,
  difficulty: 1,
};

export const MODE_TYPE = {
  addition: ["up to 100", "up to 1000"],
  substraction: ["from 100", "from 1000"],
  multiplication: ["up to 50", "up to 100", "count down"],
};

let currentMode = MODE_TYPE.multiplication[0];

const modeToggler = document.getElementById(
  "mode_toggler"
) as HTMLButtonElement;
const modeText = document.getElementById("mode_text") as HTMLSpanElement;

let modeTogglerIndex = 0;
modeToggler.addEventListener("click", (ev) => {
  if (appState.arytmeticOperation === OPERATION_TYPE.multiplication) {
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

const difficultyDecreaseToggler = document.getElementById(
  "difficulty_toggler-decrease"
) as HTMLButtonElement;
const difficultyIncreaseToggler = document.getElementById(
  "difficulty_toggler-increase"
) as HTMLButtonElement;
const difficultyScale = document.getElementById(
  "difficulty_scale"
) as HTMLButtonElement;

difficultyDecreaseToggler.addEventListener("click", () => {
  console.log("decrease");
  if (appState.difficulty > 1) {
    let scaleInnettext = [];
    appState.difficulty--;
    scaleInnettext.length = appState.difficulty;
    scaleInnettext.fill("\u2606");
    difficultyScale.innerText = scaleInnettext.join("");
    // console.log(appState.difficulty);
  }
});
difficultyIncreaseToggler.addEventListener("click", () => {
  console.log("increase");
  if (appState.difficulty < 5) {
    let scaleInnettext = [];
    appState.difficulty++;
    scaleInnettext.length = appState.difficulty;
    scaleInnettext.fill("\u2606");
    difficultyScale.innerText = scaleInnettext.join("");
    // console.log(appState.difficulty);
  }
});
