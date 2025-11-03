//statistic Table
import { MISTAKES_OBJ } from "../gameObject.js";
import { OPERATION_TYPE } from "../gameObject.js";
import {
  getAndConvertLocalStorage,
  removeOperationsFromAppStorageAndLocalStorage,
} from "./storageInteractions.js";

export const statisticsTableRenderedOperations = (
  applicationStorage: MISTAKES_OBJ,
  operations:
    | "mistakesAdd"
    | "mistakesSubstract"
    | "mistakesMultiply"
    | "mistakesDevide",
  statisticTableContainer: HTMLDivElement
) => {
  console.log("statisticsTableRenderedOperations");

  console.log(statisticTableContainer.children[1].children[1]);

  statisticTableContainer.children[1].children[1].innerHTML = "";
  applicationStorage[operations].forEach((values, index) => {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<tr><td>${values[0]}</td><td>${values[1]}</td><td><i class="fa fa-trash-o" id="removeRowInStatisticTable-${index}"></i></td></tr> `;
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
      let storageKey:
        | "mistakesAdd"
        | "mistakesSubstract"
        | "mistakesMultiply"
        | "mistakesDevide";

      switch (operations) {
        case "mistakesAdd": {
          storageKey = "mistakesAdd";
          operation = "add";
          break;
        }

        case "mistakesSubstract": {
          storageKey = "mistakesSubstract";
          operation = "substract";
          break;
        }
        case "mistakesMultiply": {
          storageKey = "mistakesMultiply";
          operation = "multiply";
          break;
        }
        case "mistakesDevide": {
          storageKey = "mistakesDevide";
          operation = "devide";
          break;
        }
      }

      console.log(storageKey);
      console.log(operation);

      let removedValues: [number, number, OPERATION_TYPE] = [
        firstNumber,
        secondNumber,
        operation,
      ];
      console.log(removedValues);

      removeOperationsFromAppStorageAndLocalStorage(
        removedValues,
        applicationStorage
      );

      statisticsTableRenderedOperations(
        getAndConvertLocalStorage(),
        storageKey,
        statisticTableContainer
      );
    });
  });
};
