import { OPERATION_TYPES } from "../../TypesAndInterfaces/gameObject.js";

export type MISTAKES_OBJ = {
  mistakesAdd: [number, number][];
  mistakesSubstract: [number, number][];
  mistakesMultiply: [number, number][];
  mistakesDevide: [number, number][];
};

export const getAndConvertLocalStorage: () => MISTAKES_OBJ = () => {
  let mistakesAdd: [number, number][] =
    JSON.parse(localStorage.getItem("mcm_add")) || [];
  let mistakesSubstract: [number, number][] =
    JSON.parse(localStorage.getItem("mcm_substract")) || [];
  let mistakesMultiply: [number, number][] =
    JSON.parse(localStorage.getItem("mcm_multiply")) || [];
  let mistakesDevide: [number, number][] =
    JSON.parse(localStorage.getItem("mcm_devide")) || [];

  return { mistakesAdd, mistakesSubstract, mistakesMultiply, mistakesDevide };
};

export const addWrongOperationToApplicationStorageAndLocalStorage = (
  wrongOperations: [number, number, OPERATION_TYPES][],
  storage: MISTAKES_OBJ
) => {
  wrongOperations.forEach((subarr) => {
    switch (subarr[2]) {
      case "add":
        storage.mistakesAdd.push([subarr[0], subarr[1]]);
        break;
      case "devide":
        storage.mistakesDevide.push([subarr[0], subarr[1]]);
        break;
      case "substract":
        storage.mistakesSubstract.push([subarr[0], subarr[1]]);
        break;
      case "multiply":
        storage.mistakesMultiply.push([subarr[0], subarr[1]]);
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

export const removeOperationsFromAppStorageAndLocalStorage = (
  removedValuesArr: [number, number, OPERATION_TYPES],
  applicationStorage: MISTAKES_OBJ
) => {
  switch (removedValuesArr[2]) {
    case "add":
      let updatedMistakesAdd = applicationStorage.mistakesAdd.filter(
        (el) => el.join(",") !== removedValuesArr.slice(0, 2).join(",")
      );
      localStorage.setItem("mcm_add", JSON.stringify(updatedMistakesAdd));
      applicationStorage = getAndConvertLocalStorage();
      break;

    case "devide":
      let updatedMistakesDevide = applicationStorage.mistakesDevide.filter(
        (el) => el.join(",") !== removedValuesArr.slice(0, 2).join(",")
      );
      localStorage.setItem("mcm_devide", JSON.stringify(updatedMistakesDevide));
      applicationStorage = getAndConvertLocalStorage();
      break;
    case "substract":
      let updatedMistakesSubstract =
        applicationStorage.mistakesSubstract.filter(
          (el) => el.join(",") !== removedValuesArr.slice(0, 2).join(",")
        );
      localStorage.setItem(
        "mcm_substract",
        JSON.stringify(updatedMistakesSubstract)
      );
      applicationStorage = getAndConvertLocalStorage();

      break;
    case "multiply":
      let updatedMistakesMultiply = applicationStorage.mistakesMultiply.filter(
        (el) => el.join(",") !== removedValuesArr.slice(0, 2).join(",")
      );
      localStorage.setItem(
        "mcm_multiply",
        JSON.stringify(updatedMistakesMultiply)
      );
      applicationStorage = getAndConvertLocalStorage();
      break;
  }
};
