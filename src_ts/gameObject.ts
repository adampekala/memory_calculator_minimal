export type APPLICATION_STATE = "game" | "options" | "statistics";

export type STATE_TYPE = "start" | "check" | "asses";

export interface STATE_TYPE_OBJ {
  initial: "start";
  check: "check";
  asses: "asses";
}

export type MISTAKES_OBJ = {
  mistakesAdd: [number, number][];
  mistakesSubstract: [number, number][];
  mistakesMultiply: [number, number][];
  mistakesDevide: [number, number][];
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

export type OPERATION_TYPE = "add" | "substract" | "devide" | "multiply";

export type WRONG_ANSWER = [number, number, OPERATION_TYPE];

//Old APP_STATE

export interface APPLICATION_OBJECT {
  applicationGlobalState: APPLICATION_STATE;
  gameState: STATE_TYPE;
  isGameFinished: boolean; //gameFinished
  mistakesFromStorage: MISTAKES_OBJ | null; //storage
  gameMode: MODE_ALL; //gameMode
  gameDifficulty: 1 | 2 | 3 | 4 | 5; //difficulty
  gameTypeOfArithmenticOperation: OPERATION_TYPE;
  gameOperationSignValue: OPERATION_SIGNS;
  gameScore: number; //scoreNumber
  gameLeftNumber: number;
  gameRightNumber: number;
  gameCurrentCorrectAnswer: number;
  gamePreviousCorrectAnswer: number | null; //lastResult
  wrongAnswer: WRONG_ANSWER | null;
  wrongAnswersArray: WRONG_ANSWER[]; // wrongAnswers
  gameCounterIntervalId: number | null; //APPLICATION.gameCounterIntervalId
  gameCounterProgress: number | null;
  statisticsTableDisplayedOperation: OPERATION_TYPE; //statisticsTableMode
  setLeftNumberValue: (number: number) => void;
  setRightNumberValue: (number: number) => void;
  setOperationSignValue: (sign: "x" | "-" | "+" | "/") => void;
  refreshStorage: () => void;
  setGameFinished: (value: boolean) => void;
  setCounterProgress: (value) => void;
}

export type OPERATION_SIGNS = "x" | "-" | "+" | "/";
export type OPERATION_OBJ = {
  addition: "add";
  substraction: "substract";
  multiplication: "multiply";
  division: "devide";
};
