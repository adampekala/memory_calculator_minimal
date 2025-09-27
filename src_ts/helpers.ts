import {
  OPERATION_TYPE,
  MODE_TYPE_COMMON,
  MODE_TYPE_ADDITION,
  MODE_TYPE_DIVISION,
  MODE_TYPE_MULTIPLICATION,
  MODE_TYPE_SUBSTRACTION,
} from "./mode";
const randomNumber = (min: number = 1, max: number = 10) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const calculateNumberHelper = (
  operationType: OPERATION_TYPE = "devide",
  difficulty: number = 1
): number[] => {
  if (operationType === "multiply" || operationType === "add") {
    switch (true) {
      case difficulty === 1: {
        return new Array(randomNumber(), randomNumber());
      }
      case difficulty === 2: {
        return new Array(randomNumber(2, 10), randomNumber(2, 10));
      }
      case difficulty === 3: {
        return new Array(randomNumber(5, 10), randomNumber(5, 10));
      }
      case difficulty === 4: {
        return new Array(randomNumber(2, 12), randomNumber(2, 12));
      }
      case difficulty === 5: {
        return new Array(randomNumber(5, 15), randomNumber(5, 15));
      }
    }
  }
  if (operationType === "substract") {
    switch (true) {
      case difficulty === 1: {
        console.log("substr");

        let num1 = randomNumber();
        let num2 = randomNumber();
        if (num1 > num2) {
          console.log("substr");
          return new Array(num1, num2);
        } else {
          console.log("substr");
          return new Array(num2, num1);
        }
      }
      case difficulty === 2: {
        let num1 = randomNumber(1, 50);
        let num2 = randomNumber(1, 50);
        console.log("substr");
        if (num1 > num2) {
          console.log("substr");
          return new Array(num1, num2);
        } else {
          console.log("substr");
          return new Array(num2, num1);
        }
      }
      case difficulty === 3: {
        let num1 = randomNumber(1, 100);
        let num2 = randomNumber(1, 100);
        if (num1 > num2) {
          return new Array(num1, num2);
        } else {
          return new Array(num2, num1);
        }
      }
      case difficulty === 4: {
        let num1 = randomNumber(1, 1000);
        let num2 = randomNumber(1, 1000);
        if (num1 > num2) {
          return new Array(num1, num2);
        } else {
          return new Array(num2, num1);
        }
      }
      case difficulty === 5: {
        let num1 = randomNumber(500, 1500);
        let num2 = randomNumber(500, 1500);
        if (num1 > num2) {
          return new Array(num1, num2);
        } else {
          return new Array(num2, num1);
        }
      }
    }
  }

  if (operationType === "devide") {
    switch (true) {
      case difficulty === 1: {
        let num1 = randomNumber();
        let num2 = randomNumber();

        return new Array(num1 * num2, num1, num2);
      }
      case difficulty === 2: {
        let num1 = randomNumber(2, 10);
        let num2 = randomNumber(2, 10);
        return new Array(num1 * num2, num1, num2);
      }
      case difficulty === 3: {
        let num1 = randomNumber(5, 10);
        let num2 = randomNumber(5, 10);
        return new Array(num1 * num2, num1, num2);
      }
      case difficulty === 4: {
        let num1 = randomNumber(2, 12);
        let num2 = randomNumber(2, 12);
        return new Array(num1 * num2, num1, num2);
      }
      case difficulty === 5: {
        let num1 = randomNumber(5, 15);
        let num2 = randomNumber(5, 15);
        return new Array(num1 * num2, num1, num2);
      }
    }
  }
};

export const countStopGameLimit = (
  modeType:
    | MODE_TYPE_COMMON
    | MODE_TYPE_ADDITION
    | MODE_TYPE_DIVISION
    | MODE_TYPE_MULTIPLICATION
    | MODE_TYPE_SUBSTRACTION = "get 20"
) => {
  switch (modeType) {
    case "get 20": {
      console.log("get 20");
      return 20;
    }
    case "get 50": {
      console.log("get 50");
      return 50;
    }
    default: {
      console.log("get else");
      return Infinity;
    }
  }
};
