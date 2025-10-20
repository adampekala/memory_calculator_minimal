import { statisticsTableRenderedOperations, } from "./helpers.js";
export const createStatisticTable = (body, storageFn, refreshStorageFn) => {
    let storageActiveKey = "mcm_multiply";
    let storage = storageFn();
    let statisticContainer = document.createElement("div");
    statisticContainer.classList.add("statistics_container");
    let header = document.createElement("div");
    header.innerHTML = `<h1 class="title"><span class="title-top">Memory</span><span class="title-bottom">calculator</span></h1>`;
    let statisticTableContainer = document.createElement("div");
    statisticTableContainer.classList.add("table_container");
    statisticTableContainer.innerHTML = `<div class="table_modeContainer"><button class="table_button table_button-mode" id="tableMode_togglerAdd">+</button>
  
  <button class="table_button table_button-mode active" id="tableMode_togglerMyltiply">&#x2217;</button>
  <button class="table_button table_button-mode" id="tableMode_togglerSubstract">-</button>
  </div><table><thead><tr><th>First number</th><th>Secound number</th><th>Delete</th></tr></thead><tbody></tbody></table>`;
    let statisticBackBtnContainer = document.createElement("div");
    statisticBackBtnContainer.classList.add("statistics_backButtonContainer");
    statisticBackBtnContainer.innerHTML = `<button class="options_button options_button-back" id="backToOptions">Back</button><button class="options_button" id="deleteStorage">Delete all</button>`;
    body.appendChild(statisticContainer);
    statisticContainer.appendChild(header);
    statisticContainer.appendChild(statisticTableContainer);
    statisticContainer.appendChild(statisticBackBtnContainer);
    const statisticsTableModeTogglerAdd = document.getElementById("tableMode_togglerAdd");
    statisticsTableModeTogglerAdd.addEventListener("click", () => {
        statisticsTableModeTogglerAdd.classList.add("active");
        statisticsTableModeTogglerMultiply.classList.remove("active");
        statisticsTableModeTogglerSubstract.classList.remove("active");
        storageActiveKey = "mcm_add";
        statisticsTableRenderedOperations(storage, "mistakesAdd", statisticTableContainer);
    });
    const statisticsTableModeTogglerMultiply = document.getElementById("tableMode_togglerMyltiply");
    statisticsTableModeTogglerMultiply.addEventListener("click", () => {
        statisticsTableModeTogglerAdd.classList.remove("active");
        statisticsTableModeTogglerMultiply.classList.add("active");
        statisticsTableModeTogglerSubstract.classList.remove("active");
        storageActiveKey = "mcm_multiply";
        statisticsTableRenderedOperations(storage, "mistakesMultiply", statisticTableContainer);
    });
    const statisticsTableModeTogglerSubstract = document.getElementById("tableMode_togglerSubstract");
    statisticsTableModeTogglerSubstract.addEventListener("click", () => {
        statisticsTableModeTogglerAdd.classList.remove("active");
        statisticsTableModeTogglerMultiply.classList.remove("active");
        statisticsTableModeTogglerSubstract.classList.add("active");
        storageActiveKey = "mcm_substract";
        statisticsTableRenderedOperations(storage, "mistakesSubstract", statisticTableContainer);
    });
    const deleteStorageBtn = document.getElementById("deleteStorage");
    const backToOptionsBtn = document.getElementById("backToOptions");
    statisticsTableRenderedOperations(storage, "mistakesMultiply", statisticTableContainer);
    backToOptionsBtn.addEventListener("click", () => {
        statisticContainer.remove();
    });
    deleteStorageBtn.addEventListener("click", () => {
        localStorage.setItem(storageActiveKey, JSON.stringify([]));
        refreshStorageFn();
        storage = storageFn();
        statisticTableContainer.children[1].children[1].innerHTML = "";
    });
};
