const randomNumber = (min = 1, max = 10) => {
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
                console.log("substr");
                let num1 = randomNumber();
                let num2 = randomNumber();
                if (num1 > num2) {
                    console.log("substr");
                    return new Array(num1, num2);
                }
                else {
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
                }
                else {
                    console.log("substr");
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
export const countStopGameLimit = (modeType = "get 20") => {
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
export const setConvertedStorage = (arr, obj) => {
    arr.forEach((subarr) => {
        switch (subarr[2]) {
            case "add":
                obj.mistakesAdd.push(`${subarr[0]}--${subarr[1]}`);
                break;
            case "devide":
                obj.mistakesDevide.push(`${subarr[0]}--${subarr[1]}`);
                break;
            case "substract":
                obj.mistakesSubstract.push(`${subarr[0]}--${subarr[1]}`);
                break;
            case "multiply":
                obj.mistakesMultiply.push(`${subarr[0]}--${subarr[1]}`);
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
    localStorage.setItem("mcm_add", JSON.stringify(obj.mistakesAdd));
    localStorage.setItem("mcm_substract", JSON.stringify(obj.mistakesSubstract));
    localStorage.setItem("mcm_multiply", JSON.stringify(obj.mistakesMultiply));
    localStorage.setItem("mcm_devide", JSON.stringify(obj.mistakesDevide));
};
console.log(getAndConvertStorage());
