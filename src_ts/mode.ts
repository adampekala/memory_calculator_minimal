import { countStopGameLimit } from "./helpers.js";

export type OPERATION_TYPE = "add" | "substract" | "devide" | "multiply";

type OPERATION_OBJ = {
  addition: OPERATION_TYPE;
  substraction: OPERATION_TYPE;
  multiplication: OPERATION_TYPE;
  division: OPERATION_TYPE;
};

export type MODE_TYPE_COMMON =
  | "repretition"
  | "train"
  | "get 20"
  | "get 50"
  | "count down";
export type MODE_TYPE_ADDITION = MODE_TYPE_COMMON | "up to 100" | "up to 1000";
export type MODE_TYPE_SUBSTRACTION =
  | MODE_TYPE_COMMON
  | "from 100"
  | "from 1000";
export type MODE_TYPE_MULTIPLICATION = MODE_TYPE_COMMON;
export type MODE_TYPE_DIVISION = MODE_TYPE_COMMON;
export type MODE_ALL =
  | MODE_TYPE_COMMON
  | MODE_TYPE_ADDITION
  | MODE_TYPE_DIVISION
  | MODE_TYPE_MULTIPLICATION
  | MODE_TYPE_SUBSTRACTION;

export interface MODE_TYPE {
  addition: MODE_TYPE_ADDITION[];
  substraction: MODE_TYPE_SUBSTRACTION[];
  multiplication: MODE_TYPE_MULTIPLICATION[];
  division: MODE_TYPE_DIVISION[];
}

export type STATE_TYPE = "start" | "check" | "asses";

export interface STATE_TYPE_OBJ {
  initial: "start";
  check: "check";
  asses: "asses";
}
export const STATE_TYPE: STATE_TYPE_OBJ = {
  initial: "start",
  check: "check",
  asses: "asses",
};

export const OPERATION_TYPE: OPERATION_OBJ = {
  addition: "add",
  substraction: "substract",
  multiplication: "multiply",
  division: "devide",
};

export const MODE_TYPE: MODE_TYPE = {
  addition: [
    "train",
    "repretition",
    "get 20",
    "get 50",
    "count down",
    "up to 100",
    "up to 1000",
  ],
  substraction: [
    "train",
    "repretition",
    "get 20",
    "get 50",
    "count down",
    "from 100",
    "from 1000",
  ],
  multiplication: ["train", "repretition", "get 20", "get 50", "count down"],
  division: ["train", "repretition", "get 20", "get 50", "count down"],
};

export interface APP_STATE {
  state: STATE_TYPE;
  arytmeticOperation: OPERATION_TYPE;
  scoreNumber: number;
  difficulty: number;
  mode: MODE_ALL;
}

export const appState: APP_STATE = {
  state: STATE_TYPE.initial,
  arytmeticOperation: OPERATION_TYPE.multiplication,
  scoreNumber: 0,
  difficulty: 1,
  mode: MODE_TYPE.multiplication[0],
};

export let stopGameLimit = countStopGameLimit(appState.mode);

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
      appState.mode = MODE_TYPE.multiplication[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
    } else {
      modeTogglerIndex = 0;
      appState.mode = MODE_TYPE.multiplication[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.multiplication[modeTogglerIndex];
    }
  } else if (appState.arytmeticOperation === OPERATION_TYPE.substraction) {
    console.log("Toggle");
    if (modeTogglerIndex < MODE_TYPE.substraction.length - 1) {
      modeTogglerIndex++;
      appState.mode = MODE_TYPE.substraction[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.substraction[modeTogglerIndex];
    } else {
      modeTogglerIndex = 0;
      appState.mode = MODE_TYPE.substraction[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.substraction[modeTogglerIndex];
    }
  } else if (appState.arytmeticOperation === OPERATION_TYPE.addition) {
    console.log("Toggle");
    if (modeTogglerIndex < MODE_TYPE.addition.length - 1) {
      modeTogglerIndex++;
      appState.mode = MODE_TYPE.addition[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.addition[modeTogglerIndex];
    } else {
      modeTogglerIndex = 0;
      appState.mode = MODE_TYPE.addition[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.addition[modeTogglerIndex];
    }
  } else if (appState.arytmeticOperation === OPERATION_TYPE.division) {
    console.log("Toggle");
    if (modeTogglerIndex < MODE_TYPE.division.length - 1) {
      modeTogglerIndex++;
      appState.mode = MODE_TYPE.division[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.division[modeTogglerIndex];
    } else {
      modeTogglerIndex = 0;
      appState.mode = MODE_TYPE.division[modeTogglerIndex];
      stopGameLimit = countStopGameLimit(appState.mode);
      modeText.innerText = MODE_TYPE.division[modeTogglerIndex];
    }
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
  }
});
