export const createStatisticTable = (body, storage, refreshStorageFn) => {
    let statisticContainer = document.createElement("div");
    statisticContainer.classList.add("statistics_container");
    let statisticTableContainer = document.createElement("div");
    let statisticBackBtnContainer = document.createElement("div");
    statisticBackBtnContainer.classList.add("statistics_backButtonContainer");
    statisticTableContainer.classList.add("table_container");
    statisticTableContainer.innerHTML = `<table><thead><tr><th>First number</th><th>Secound number</th><th>Delete</th></tr></thead><tbody></tbody></table>`;
    statisticBackBtnContainer.innerHTML = `<button class="options_button options_button-back" id="backToOptions">Back</button><button class="options_button" id="deleteStorage">Delete all</button>`;
    body.appendChild(statisticContainer);
    statisticContainer.appendChild(statisticTableContainer);
    statisticContainer.appendChild(statisticBackBtnContainer);
    console.log(statisticTableContainer.children[0]);
    const deleteStorageBtn = document.getElementById("deleteStorage");
    const backToOptionsBtn = document.getElementById("backToOptions");
    // statisticsList.innerHTML = "";
    storage.mistakesMultiply.forEach((values) => {
        let newElement = document.createElement("tr");
        newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${values.split("--")[1]}</td><td><i class="fa fa-trash-o"></i></td></tr> `;
        statisticTableContainer.children[0].children[1].appendChild(newElement);
    });
    backToOptionsBtn.addEventListener("click", () => {
        statisticContainer.remove();
    });
    deleteStorageBtn.addEventListener("click", () => {
        localStorage.clear();
        refreshStorageFn();
        console.log("XXXX");
        statisticTableContainer.children[0].children[1].innerHTML = "";
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
// <table id="table">
//   <thead>
//     <tr>
//       <th>First number</th>
//       <th>Secound number</th>
//       <th>delete</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>1</td>
//       <td>1</td>
//       <td>
//         <i class="fa fa-trash-o"></i>
//       </td>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>1</td>
//       <td>
//         <i class="fa fa-trash-o"></i>
//       </td>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>1</td>
//       <td>
//         <i class="fa fa-trash-o"></i>
//       </td>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>1</td>
//       <td>
//         <i class="fa fa-trash-o"></i>
//       </td>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>1</td>
//       <td>
//         <i class="fa fa-trash-o"></i>
//       </td>
//     </tr>
//     <tr>
//       <td>1</td>
//       <td>1</td>
//       <td>
//         <i class="fa fa-trash-o"></i>
//       </td>
//     </tr>
//   </tbody>
//   <tfoot>
//     <tr>
//       <td colspan="3">
//         <button id="backToOptions">Back</button>
//         <button>Delete all</button>
//       </td>
//     </tr>
//   </tfoot>
// </table>;
