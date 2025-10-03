import { getAndConvertStorage } from "./helpers";

export const createStatisticTable = (body, storage, refreshStorageFn) => {
  let statisticTable = document.createElement("table");
  statisticTable.innerHTML = `<thead><tr><th>First number</th><th>Secound number</th><th>Delete</th></tr></thead><tbody></tbody><tfoot><tr><td colspan="3"><div class="options_backButtonContainer"><button class="options_button options_button-back" id="backToOptions">Back</button><button class="options_button" id="deleteStorage">Delete all</button></div></td></tr></tfoot>`;

  body.appendChild(statisticTable);
  console.log(statisticTable.children[1]);

  const deleteStorageBtn = document.getElementById("deleteStorage");
  const backToOptionsBtn = document.getElementById("backToOptions");

  // statisticsList.innerHTML = "";
  storage.mistakesMultiply.forEach((values) => {
    let newElement = document.createElement("tr");
    newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${
      values.split("--")[1]
    }</td><td><i class="fa fa-trash-o"></i></td></tr> `;
    statisticTable.children[1].appendChild(newElement);
  });

  backToOptionsBtn.addEventListener("click", () => {
    statisticTable.remove();
  });
  deleteStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    refreshStorageFn();
    console.log("XXXX");

    statisticTable.children[1].innerHTML = `<tbody></tbody>`;

    // storage.mistakesMultiply.forEach((values) => {
    //   let newElement = document.createElement("tr");
    //   newElement.innerHTML = `<tr><td>${values.split("--")[0]}</td><td>${
    //     values.split("--")[1]
    //   }</td><td><i class="fa fa-trash-o"></i></td></tr> `;
    //   statisticTable.children[1].appendChild(newElement);
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
