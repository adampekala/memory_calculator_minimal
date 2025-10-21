export const randomNumber = (min = 1, max = 10) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
export const calculateNumberHelper = (operationType = "devide", difficulty = 1) => {
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
                let num1 = randomNumber();
                let num2 = randomNumber();
                if (num1 > num2) {
                    return new Array(num1, num2);
                }
                else {
                    return new Array(num2, num1);
                }
            }
            case difficulty === 2: {
                let num1 = randomNumber(1, 50);
                let num2 = randomNumber(1, 50);
                if (num1 > num2) {
                    return new Array(num1, num2);
                }
                else {
                    return new Array(num2, num1);
                }
            }
            case difficulty === 3: {
                let num1 = randomNumber(1, 100);
                let num2 = randomNumber(1, 100);
                if (num1 > num2) {
                    return new Array(num1, num2);
                }
                else {
                    return new Array(num2, num1);
                }
            }
            case difficulty === 4: {
                let num1 = randomNumber(1, 1000);
                let num2 = randomNumber(1, 1000);
                if (num1 > num2) {
                    return new Array(num1, num2);
                }
                else {
                    return new Array(num2, num1);
                }
            }
            case difficulty === 5: {
                let num1 = randomNumber(500, 1500);
                let num2 = randomNumber(500, 1500);
                if (num1 > num2) {
                    return new Array(num1, num2);
                }
                else {
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
export const calculateNumberHelperMax = (appState, storage) => {
    let fakeNumbersArr = [
        [7, 6],
        [8, 7],
        [7, 7],
        [5, 8],
        [6, 4],
    ];
    let fakeNumbersArrDevide = [
        [81, 9],
        [64, 8],
        [42, 6],
        [42, 7],
    ];
    let numbers;
    if (appState.gameMode === "repretition") {
        switch (appState.arytmeticOperation) {
            case "add": {
                numbers =
                    storage.mistakesAdd.length !== 0
                        ? storage.mistakesAdd[randomNumber(0, storage.mistakesAdd.length - 1)]
                            .split("--")
                            .map((el) => +el)
                        : fakeNumbersArr[randomNumber(0, fakeNumbersArr.length - 1)];
                return numbers;
            }
            case "substract": {
                numbers =
                    storage.mistakesSubstract.length !== 0
                        ? storage.mistakesSubstract[randomNumber(0, storage.mistakesSubstract.length - 1)]
                            .split("--")
                            .map((el) => +el)
                        : fakeNumbersArr[randomNumber(0, fakeNumbersArr.length - 1)];
                return numbers;
            }
            case "devide": {
                numbers =
                    storage.mistakesDevide.length !== 0
                        ? storage.mistakesDevide[randomNumber(0, storage.mistakesDevide.length - 1)]
                            .split("--")
                            .map((el) => +el)
                        : fakeNumbersArrDevide[randomNumber(0, fakeNumbersArr.length - 1)];
                return numbers;
            }
            case "multiply": {
                numbers =
                    storage.mistakesMultiply.length !== 0
                        ? storage.mistakesMultiply[randomNumber(0, storage.mistakesMultiply.length - 1)]
                            .split("--")
                            .map((el) => +el)
                        : fakeNumbersArr[randomNumber(0, fakeNumbersArr.length - 1)];
                return numbers;
            }
        }
    }
    else if (appState.gameMode === "up to 100" ||
        appState.gameMode === "up to 1000") {
        numbers = calculateNumberHelper(appState.arytmeticOperation, appState.difficulty);
        numbers[0] = appState.lastResult || 0;
        appState.lastResult = numbers[0] + numbers[1];
        return numbers;
    }
    else if (appState.gameMode === "from 100" ||
        appState.gameMode === "from 1000") {
        if (appState.lastResult === null) {
            //TODO reset of caclulator settings
            appState.lastResult = appState.gameMode === "from 100" ? 100 : 1000;
        }
        numbers = calculateNumberHelper(appState.arytmeticOperation, appState.difficulty);
        numbers[0] = appState.lastResult || 0;
        appState.lastResult = numbers[0] - numbers[1];
        return numbers;
    }
    else {
        numbers = calculateNumberHelper(appState.arytmeticOperation, appState.difficulty);
        return numbers;
    }
};
export const countStopGameLimit = (modeType = "get 20") => {
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
//"add" | "substract" | "devide" | "multiply"
export const getAndConvertStorage = () => {
    let mistakesAdd;
    let mistakesSubstract;
    let mistakesMultiply;
    let mistakesDevide;
    mistakesAdd = JSON.parse(localStorage.getItem("mcm_add")) || [];
    mistakesSubstract = JSON.parse(localStorage.getItem("mcm_substract")) || [];
    mistakesMultiply = JSON.parse(localStorage.getItem("mcm_multiply")) || [];
    mistakesDevide = JSON.parse(localStorage.getItem("mcm_devide")) || [];
    return { mistakesAdd, mistakesSubstract, mistakesMultiply, mistakesDevide };
};
export const setConvertedStorage = (arr, storage) => {
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
    // let mistakesAdd: string[] | null = null;
    // let mistakesSubstract: string[] | null = null;
    // let mistakesMultiply: string[] | null = null;
    // let mistakesDevide: string[] | null = null;
    localStorage.setItem("mcm_add", JSON.stringify(storage.mistakesAdd));
    localStorage.setItem("mcm_substract", JSON.stringify(storage.mistakesSubstract));
    localStorage.setItem("mcm_multiply", JSON.stringify(storage.mistakesMultiply));
    localStorage.setItem("mcm_devide", JSON.stringify(storage.mistakesDevide));
};
export const updateConvertedStorage = (removedValuesArr, storage, statisticTableContainer) => {
    console.log("HELPERS Storage");
    console.log(storage);
    switch (removedValuesArr[2]) {
        case "add":
            let updatedMistakesAdd = storage.mistakesAdd.filter((el) => {
                return (el.toString() !==
                    `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`);
            });
            localStorage.setItem("mcm_add", JSON.stringify(updatedMistakesAdd));
            storage = getAndConvertStorage();
            statisticsTableRenderedOperations(storage, "mistakesAdd", statisticTableContainer);
            break;
        case "devide":
            let updatedMistakesDevide = storage.mistakesDevide.filter((el) => {
                return (el.toString() !==
                    `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`);
            });
            localStorage.setItem("mcm_devide", JSON.stringify(updatedMistakesDevide));
            storage = getAndConvertStorage();
            statisticsTableRenderedOperations(storage, "mistakesDevide", statisticTableContainer);
            break;
        case "substract":
            let updatedMistakesSubstract = storage.mistakesSubstract.filter((el) => {
                return (el.toString() !==
                    `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`);
            });
            localStorage.setItem("mcm_substract", JSON.stringify(updatedMistakesSubstract));
            storage = getAndConvertStorage();
            statisticsTableRenderedOperations(storage, "mistakesSubstract", statisticTableContainer);
            break;
        case "multiply":
            let updatedMistakesMultiply = storage.mistakesMultiply.filter((el) => {
                return (el.toString() !==
                    `${removedValuesArr[0].toString()}--${removedValuesArr[1].toString()}`);
            });
            localStorage.setItem("mcm_multiply", JSON.stringify(updatedMistakesMultiply));
            storage = getAndConvertStorage();
            statisticsTableRenderedOperations(storage, "mistakesMultiply", statisticTableContainer);
            break;
        default:
            console.warn("Sth wrong with switch");
            break;
    }
};
// console.log(getAndConvertStorage());
export const statisticsTableRenderedOperations = (storage, operations, statisticTableContainer) => {
    statisticTableContainer.children[1].children[1].innerHTML = "";
    storage[operations].forEach((values, index) => {
        let newElement = document.createElement("tr");
        newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${values.split("--")[1]}</td><td><i class="fa fa-trash-o" id="removeRowInStatisticTable-${index}"></i></td></tr> `;
        statisticTableContainer.children[1].children[1].appendChild(newElement);
    });
    let removeRowInStatisticTableArr = document.querySelectorAll("[id^=removeRowInStatisticTable-]");
    removeRowInStatisticTableArr.forEach((el) => {
        el.addEventListener("click", (e) => {
            let row = el.parentElement.parentElement;
            let firstNumber = +row.children[0].innerHTML;
            let secondNumber = +row.children[1].innerHTML;
            let operation;
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
            let removedValues = [
                firstNumber,
                secondNumber,
                operation,
            ];
            console.log(removedValues);
            updateConvertedStorage(removedValues, storage, statisticTableContainer);
        });
    });
};
//# sourceMappingURL=helpers.js.map