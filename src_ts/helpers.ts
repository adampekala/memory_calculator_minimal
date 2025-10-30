import {
  OPERATION_TYPE,
  MODE_TYPE_COMMON,
  MODE_TYPE_ADDITION,
  MODE_TYPE_DIVISION,
  MODE_TYPE_MULTIPLICATION,
  MODE_TYPE_SUBSTRACTION,
  APP_STATE,
} from "./mode.js";

export const randomNumber = (min: number = 1, max: number = 10) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateTwoNumbersArr: (
  difficulty: 1 | 2 | 3 | 4 | 5
) => [number, number] = (difficulty) => {
  switch (difficulty) {
    case 1: {
      return [randomNumber(), randomNumber()];
    }
    case 2: {
      return [randomNumber(2, 10), randomNumber(2, 10)];
    }
    case 3: {
      return [randomNumber(5, 10), randomNumber(5, 10)];
    }
    case 4: {
      return [randomNumber(2, 12), randomNumber(2, 12)];
    }
    case 5: {
      return [randomNumber(5, 15), randomNumber(5, 15)];
    }
  }
};

export const generateSortedNumbersArr: (
  difficulty: 1 | 2 | 3 | 4 | 5
) => [number, number] = (difficulty = 1) => {
  let arr: [number, number];
  switch (difficulty) {
    case 1: {
      arr = [randomNumber(), randomNumber()];
    }
    case 2: {
      arr = [randomNumber(2, 10), randomNumber(2, 10)];
      break;
    }
    case 3: {
      arr = [randomNumber(5, 10), randomNumber(5, 10)];
      break;
    }
    case 4: {
      arr = [randomNumber(2, 12), randomNumber(2, 12)];
      break;
    }
    case 5: {
      arr = [randomNumber(5, 15), randomNumber(5, 15)];
      break;
    }
  }
  return arr.sort((a, b) => b - a) as [number, number];
};

export const generateNumbersWithFixedFirstValue: (
  difficulty: 1 | 2 | 3 | 4 | 5,
  firstDefineNumber: number
) => [number, number] = (difficulty = 1, firstDefineNumber) => {
  let secondNumber: number;
  switch (difficulty) {
    case 1: {
      secondNumber = randomNumber();
      break;
    }
    case 2: {
      secondNumber = randomNumber(2, 10);
      break;
    }
    case 3: {
      secondNumber = randomNumber(5, 10);
      break;
    }
    case 4: {
      secondNumber = randomNumber(2, 12);
      break;
    }
    case 5: {
      secondNumber = randomNumber(5, 15);
      break;
    }
  }
  secondNumber =
    secondNumber > firstDefineNumber ? firstDefineNumber : secondNumber;

  return [firstDefineNumber, secondNumber];
};

export const generateDevisibleNumbersArr: (
  difficulty: 1 | 2 | 3 | 4 | 5
) => [number, number] = (difficulty = 1) => {
  //TODO!!!!
  return [1, 2];
};

export const generateTwoNumbersArrFromFakeArr: () => [number, number] = () => {
  let fakeNumbersArr: [number, number][] = [
    [7, 6],
    [8, 7],
    [7, 7],
    [5, 8],
    [6, 4],
  ];
  return fakeNumbersArr[randomNumber(0, fakeNumbersArr.length - 1)];
};

export const generateTwoNumbersDivisibleArrFromFakeDivisableArr: () => [
  number,
  number
] = () => {
  const fakeNumbersArrDivisable: [number, number][] = [
    [81, 9],
    [64, 8],
    [42, 6],
    [42, 7],
  ];
  return fakeNumbersArrDivisable[
    randomNumber(0, fakeNumbersArrDivisable.length - 1)
  ];
};

export const createArrayWithTwoRandomNumbers: (
  typeOfMathematicalOperation: OPERATION_TYPE,
  difficulty: 1 | 2 | 3 | 4 | 5,
  firstDefineNumber: null | number
) => [number, number] = (
  typeOfMathematicalOperation = "add",
  difficulty = 1,
  firstDefineNumber = null
) => {
  if (firstDefineNumber !== null) {
    return generateNumbersWithFixedFirstValue(difficulty, firstDefineNumber);
  } else {
    switch (typeOfMathematicalOperation) {
      case "substract":
        return generateSortedNumbersArr(difficulty);
      case "devide":
        return generateDevisibleNumbersArr(difficulty);
      default:
        return generateTwoNumbersArr(difficulty);
    }
  }
};

/*

!!!!!TODO!!!!!
randomNumbers
[num1,num2] dodawanie i mnoźenie
[num1>num2] odejmowanie
[num1, num2%num1] -- dzielenie
[previus, num2] -- up to
[previus, num2<=previous] -- from


switch  add -> switch mode1
                      mode2
                      mode3
        substract -> switch mode1
                            mode2
                            mode3
        multiply -> switch  mode1
                            mode2
                            mode3
        devide  -> switch mode1
                          mode2
                          mode3

*/

export const calculateNumberHelper = (
  operationType: OPERATION_TYPE = "devide",
  difficulty: 1 | 2 | 3 | 4 | 5 = 1
): number[] => {
  if (operationType === "multiply" || operationType === "add") {
    return generateTwoNumbersArr(difficulty);
  }
  if (operationType === "substract") {
    return generateSortedNumbersArr(difficulty);
  }

  if (operationType === "devide") {
    return generateDevisibleNumbersArr(difficulty);
  }
};

export const calculateNumberHelperMax: (
  appState: APP_STATE,
  storage: MISTAKES_OBJ
) => number[] = (appState: APP_STATE, storage: MISTAKES_OBJ) => {
  let numbers: number[];
  if (appState.gameMode === "repretition") {
    switch (appState.arytmeticOperation) {
      case "add": {
        numbers =
          storage.mistakesAdd.length !== 0
            ? storage.mistakesAdd[
                randomNumber(0, storage.mistakesAdd.length - 1)
              ]
                .split("--")
                .map((el) => +el)
            : generateTwoNumbersArrFromFakeArr();
        return numbers;
      }
      case "substract": {
        numbers =
          storage.mistakesSubstract.length !== 0
            ? storage.mistakesSubstract[
                randomNumber(0, storage.mistakesSubstract.length - 1)
              ]
                .split("--")
                .map((el) => +el)
            : generateTwoNumbersArrFromFakeArr();
        return numbers;
      }
      case "devide": {
        numbers =
          storage.mistakesDevide.length !== 0
            ? storage.mistakesDevide[
                randomNumber(0, storage.mistakesDevide.length - 1)
              ]
                .split("--")
                .map((el) => +el)
            : generateTwoNumbersDivisibleArrFromFakeDivisableArr();
        return numbers;
      }

      case "multiply": {
        numbers =
          storage.mistakesMultiply.length !== 0
            ? storage.mistakesMultiply[
                randomNumber(0, storage.mistakesMultiply.length - 1)
              ]
                .split("--")
                .map((el) => +el)
            : generateTwoNumbersArrFromFakeArr();
        return numbers;
      }
    }
  } else if (
    appState.gameMode === "up to 100" ||
    appState.gameMode === "up to 1000"
  ) {
    numbers = calculateNumberHelper(
      appState.arytmeticOperation,
      appState.difficulty
    );
    numbers[0] = appState.lastResult || 0;
    appState.lastResult = numbers[0] + numbers[1];
    return numbers;
  } else if (
    appState.gameMode === "from 100" ||
    appState.gameMode === "from 1000"
  ) {
    if (appState.lastResult === null) {
      //TODO reset of caclulator settings
      appState.lastResult = appState.gameMode === "from 100" ? 100 : 1000;
    }

    numbers = createArrayWithTwoRandomNumbers(
      appState.arytmeticOperation,
      appState.difficulty,
      appState.lastResult
    );
    appState.lastResult = numbers[0] - numbers[1];
    return numbers;
  } else {
    return createArrayWithTwoRandomNumbers(
      appState.arytmeticOperation,
      appState.difficulty,
      null
    );
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
      return 20;
    }
    case "get 50": {
      return 50;
    }
    default: {
      return Infinity;
    }
  }
};

let mcm_add = ["1--3", "5--6"];
let mcm_substract = ["1--3", "5--6"];
let mcm_devide = ["1--3", "5--6"];
let mcm_multiply = ["1--3", "5--6"];

export type MISTAKES_OBJ = {
  mistakesAdd: string[];
  mistakesSubstract: string[];
  mistakesMultiply: string[];
  mistakesDevide: string[];
};

//"add" | "substract" | "devide" | "multiply"

export const getAndConvertStorage = (): MISTAKES_OBJ => {
  let mistakesAdd: string[];
  let mistakesSubstract: string[];
  let mistakesMultiply: string[];
  let mistakesDevide: string[];

  mistakesAdd = JSON.parse(localStorage.getItem("mcm_add")) || [];
  mistakesSubstract = JSON.parse(localStorage.getItem("mcm_substract")) || [];
  mistakesMultiply = JSON.parse(localStorage.getItem("mcm_multiply")) || [];
  mistakesDevide = JSON.parse(localStorage.getItem("mcm_devide")) || [];

  return { mistakesAdd, mistakesSubstract, mistakesMultiply, mistakesDevide };
};

export const setConvertedStorage = (
  arr: [number, number, OPERATION_TYPE][],
  storage: MISTAKES_OBJ
) => {
  arr.forEach((subarr) => {
    switch (subarr[2]) {
      case "add":
        storage.mistakesAdd.push(`${subarr[0]}--${subarr[1]}`);
        break;
      case "devide":
        storage.mistakesDevide.push(`${subarr[0]}--${subarr[1]}`);
        break;
      case "substract":
        storage.mistakesSubstract.push(`${subarr[0]}--${subarr[1]}`);

        break;
      case "multiply":
        storage.mistakesMultiply.push(`${subarr[0]}--${subarr[1]}`);

        break;

      default:
        console.warn("Sth wrong with switch");
        break;
    }
  });

  localStorage.setItem("mcm_add", JSON.stringify(storage.mistakesAdd));
  localStorage.setItem(
    "mcm_substract",
    JSON.stringify(storage.mistakesSubstract)
  );
  localStorage.setItem(
    "mcm_multiply",
    JSON.stringify(storage.mistakesMultiply)
  );
  localStorage.setItem("mcm_devide", JSON.stringify(storage.mistakesDevide));
};

export const updateConvertedStorage = (
  removedValuesArr: [number, number, OPERATION_TYPE],
  storage: MISTAKES_OBJ,
  statisticTableContainer: HTMLDivElement
) => {
  console.log("HELPERS Storage");

  console.log(storage);

  switch (removedValuesArr[2]) {
    case "add":
      let updatedMistakesAdd = storage.mistakesAdd.filter((el) => {
        return (
          el.toString() !==
          `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`
        );
      });
      localStorage.setItem("mcm_add", JSON.stringify(updatedMistakesAdd));
      storage = getAndConvertStorage();
      statisticsTableRenderedOperations(
        storage,
        "mistakesAdd",
        statisticTableContainer
      );
      break;
    case "devide":
      let updatedMistakesDevide = storage.mistakesDevide.filter((el) => {
        return (
          el.toString() !==
          `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`
        );
      });
      localStorage.setItem("mcm_devide", JSON.stringify(updatedMistakesDevide));
      storage = getAndConvertStorage();
      statisticsTableRenderedOperations(
        storage,
        "mistakesDevide",
        statisticTableContainer
      );
      break;
    case "substract":
      let updatedMistakesSubstract = storage.mistakesSubstract.filter((el) => {
        return (
          el.toString() !==
          `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`
        );
      });
      localStorage.setItem(
        "mcm_substract",
        JSON.stringify(updatedMistakesSubstract)
      );
      storage = getAndConvertStorage();
      statisticsTableRenderedOperations(
        storage,
        "mistakesSubstract",
        statisticTableContainer
      );
      break;
    case "multiply":
      let updatedMistakesMultiply = storage.mistakesMultiply.filter((el) => {
        return (
          el.toString() !==
          `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`
        );
      });
      localStorage.setItem(
        "mcm_multiply",
        JSON.stringify(updatedMistakesMultiply)
      );
      storage = getAndConvertStorage();
      statisticsTableRenderedOperations(
        storage,
        "mistakesMultiply",
        statisticTableContainer
      );
      break;

    default:
      console.warn("Sth wrong with switch");
      break;
  }
};

export const statisticsTableRenderedOperations = (
  storage: MISTAKES_OBJ,
  operations:
    | "mistakesAdd"
    | "mistakesSubstract"
    | "mistakesMultiply"
    | "mistakesDevide",
  statisticTableContainer: HTMLDivElement
) => {
  statisticTableContainer.children[1].children[1].innerHTML = "";
  storage[operations].forEach((values, index) => {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${
      values.split("--")[1]
    }</td><td><i class="fa fa-trash-o" id="removeRowInStatisticTable-${index}"></i></td></tr> `;
    statisticTableContainer.children[1].children[1].appendChild(newElement);
  });

  let removeRowInStatisticTableArr = document.querySelectorAll(
    "[id^=removeRowInStatisticTable-]"
  );

  removeRowInStatisticTableArr.forEach((el) => {
    el.addEventListener("click", (e) => {
      let row = el.parentElement.parentElement;

      let firstNumber = +row.children[0].innerHTML;

      let secondNumber = +row.children[1].innerHTML;

      let operation: OPERATION_TYPE;

      switch (operations) {
        case "mistakesAdd": {
          operation = "add";
          break;
        }

        case "mistakesSubstract": {
          operation = "substract";
          break;
        }
        case "mistakesMultiply": {
          operation = "multiply";
          break;
        }
        case "mistakesDevide": {
          operation = "devide";
          break;
        }
      }

      let removedValues: [number, number, OPERATION_TYPE] = [
        firstNumber,
        secondNumber,
        operation,
      ];
      console.log(removedValues);

      updateConvertedStorage(removedValues, storage, statisticTableContainer);
    });
  });
};
