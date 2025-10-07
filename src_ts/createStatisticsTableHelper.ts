import { getAndConvertStorage } from "./helpers";

export const createStatisticTable = (body, storage, refreshStorageFn) => {
  let statisticContainer = document.createElement("div");
  statisticContainer.classList.add("statistics_container");
  let header = document.createElement("div");
  header.innerHTML = `<h1 class="title"><span class="title-top">Memory</span><span class="title-bottom">calculator</span></h1>`;

  let statisticTableContainer = document.createElement("div");
  statisticTableContainer.classList.add("table_container");
  statisticTableContainer.innerHTML = `<div class="table_modeContainer"><button class="table_button table_button-mode" id="tableMode_toggler">+</button>
  
  <button class="table_button table_button-mode" id="tableMode_toggler">&#x2217;</button>
  <button class="table_button table_button-mode" id="tableMode_toggler">-</button>
  </div><table><thead><tr><th>First number</th><th>Secound number</th><th>Delete</th></tr></thead><tbody></tbody></table>`;

  let statisticBackBtnContainer = document.createElement("div");
  statisticBackBtnContainer.classList.add("statistics_backButtonContainer");
  statisticBackBtnContainer.innerHTML = `<button class="options_button options_button-back" id="backToOptions">Back</button><button class="options_button" id="deleteStorage">Delete all</button>`;

  body.appendChild(statisticContainer);
  statisticContainer.appendChild(header);
  statisticContainer.appendChild(statisticTableContainer);
  statisticContainer.appendChild(statisticBackBtnContainer);

  console.log(statisticTableContainer.children[0]);

  const deleteStorageBtn = document.getElementById("deleteStorage");
  const backToOptionsBtn = document.getElementById("backToOptions");

  storage.mistakesMultiply.forEach((values) => {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${
      values.split("--")[1]
    }</td><td><i class="fa fa-trash-o"></i></td></tr> `;
    statisticTableContainer.children[1].children[1].appendChild(newElement);
  });

  backToOptionsBtn.addEventListener("click", () => {
    statisticContainer.remove();
  });
  deleteStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    refreshStorageFn();
    console.log("XXXX");

    statisticTableContainer.children[1].children[1].innerHTML = "";

    console.log(statisticTableContainer.children[0].children[1]);

    // storage.mistakesMultiply.forEach((values) => {
    //   let newElement = document.createElement("tr");
    //   newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${
    //     values.split("--")[1]
    //   }</td><td><i class="fa fa-trash-o"></i></td></tr> `;
    //   statisticTableContainer.children[1].appendChild(newElement);
    // });
  });
};
