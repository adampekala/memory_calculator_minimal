export type APPLICATION_STATES = "game" | "options" | "statistics";

export type GAME_STATES = "start" | "check" | "asses";

export type OPERATION_TYPES = "add" | "substract" | "devide" | "multiply";

export type OPERATION_SIGNS = "x" | "-" | "+" | "/";

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

export type WRONG_ANSWER = [number, number, OPERATION_TYPES];

export interface APPLICATION_OBJECT {
  applicationGlobalState: APPLICATION_STATES;
  gameState: GAME_STATES;
  isGameFinished: boolean;
  mistakesFromStorage: MISTAKES_OBJ | null;
  gameMode: MODE_ALL;
  gameDifficulty: 1 | 2 | 3 | 4 | 5;
  gameTypeOfArithmenticOperation: OPERATION_TYPES;
  gameOperationSignValue: OPERATION_SIGNS;
  gameScore: number;
  gameNumbers: [number, number] | null;
  gameLeftNumber: number;
  gameRightNumber: number;
  gameCurrentCorrectAnswer: number;
  gamePreviousCorrectAnswer: number | null;
  gameStopLimit: number | null;
  wrongAnswer: WRONG_ANSWER | null;
  wrongAnswersArray: WRONG_ANSWER[];
  gameCounterIntervalId: number | null;
  gameCounterProgress: number | null;
  statisticsTableDisplayedOperation: OPERATION_TYPES;

  setGameState: (state: GAME_STATES) => void;
  setOperationSignValue: (sign: OPERATION_SIGNS) => void;
  refreshStorage: () => void;
  setGameFinished: (value: boolean) => void;
  setCounterProgress: (value) => void;
  setStopGameLimit: (modeType: MODE_ALL) => void;
}
