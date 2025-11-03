export type APPLICATION_STATE = "game" | "options" | "statistics";

export type STATE_TYPE = "start" | "check" | "asses";

export interface STATE_TYPE_OBJ {
  initial: "start";
  check: "check";
  asses: "asses";
}

// export type MISTAKES_OBJ = {
//   mistakesAdd: string[];
//   mistakesSubstract: string[];
//   mistakesMultiply: string[];
//   mistakesDevide: string[];
// };

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
  application: { state: APPLICATION_STATE };
  game: {
    state: STATE_TYPE;
    isFinished: boolean; //gameFinished
    mistakesFromStorage: MISTAKES_OBJ; //storage
    options: {
      mode: MODE_ALL; //gameMode
      difficulty: number; //difficulty
      typeOfArithmenticOperation: OPERATION_TYPE;
    };
    score: number; //scoreNumber
    leftNumber: number;
    rightNumber: number;
    currentCorrectAnswer: number; //operationResult
    previousCorrectAnswer: number | null; //lastResult
    wrongAnswer: WRONG_ANSWER;
    wrongAnswersArray: [number, number, OPERATION_TYPE][]; // wrongAnswers
  };
  gameCounter: {
    counterIntervalId: number; //counterIntervalIndex
    counterProgress: number; //counterProgress
  };
  statisticsTable: {
    mode: OPERATION_TYPE; //statisticsTableMode
  };
}

export type OPERATION_OBJ = {
  addition: "add";
  substraction: "substract";
  multiplication: "multiply";
  division: "devide";
};
