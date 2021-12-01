const form = document.getElementById("myForm");
const formModal = document.getElementById("modal-up");

let items = [];
let doneItemsIds = [];
let counter = 0;

const Item = document.querySelector(".container2");
const Counter = document.getElementById("counter");
const modalBg = document.querySelector(".modal-bg");
const modalButdelete = document.querySelector("#deleteone");
const modalBgDelete = document.querySelector(".modal-bgdelete");
const modalBut = document.querySelector(".modal-btn");

//  view remov modal
modalButdelete.addEventListener("click", function () {
  modalBgDelete.classList.add("bg-active");
});

// close remov modal
const closeModal = () => {
  modalBgDelete.classList.remove("bg-active");
};
//  view edit modal
const showEditModal = () => {
  modalBg.classList.add("bg-active");
};
// close edit modal
const closeEditModal = () => {
  modalBg.classList.remove("bg-active");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("des").value;
  const date = document.getElementById("date").value;
  const titleErrorDiv = document.getElementById("entertitle");
  const desErrorDiv = document.getElementById("enterdes");
  const dateErrorDiv = document.getElementById("enterdate");

  let results = checkInputs(title, description, date);
  titleErrorDiv.innerHTML = "";
  desErrorDiv.innerHTML = "";
  dateErrorDiv.innerHTML = "";

  if (Object.keys(results.errors).length === 0) {
    alert("A new item has been added");
    addItems(title, description, date);
    document.forms[0].reset();
    ++counter;
    Counter.innerHTML = ` ${counter}`;
  }
  if (results) {
    if (results.errors.title) {
      titleErrorDiv.innerHTML = results.errors.title;
    }

    if (results.errors.description) {
      desErrorDiv.innerHTML = results.errors.description;
    }
    if (results.errors.date) {
      dateErrorDiv.innerHTML = results.errors.date;
    }
  }
});

// validation
let checkInputs = (title, description, date) => {
  const errors = {};
  if (title === "" || title == null) {
    errors["title"] = "Title required";
  }
  if (description === "" || description == null) {
    errors["description"] = "Description required";
  }
  if (date === "" || date == null) {
    errors["date"] = "Date required";
  }
  return {
    errors,
  };
};

// add item
const addItems = (title, description, date) => {
  let item = {
    id: Date.now(),
    title,
    description,
    date,
  };
  items.push(item);
};

// view items in container
const viewItems = (items) => {
  Item.innerHTML = items
    .map(
      (item) =>
        `<div  class="item" id=${item.id}>
      <input type="checkbox" id="check" onchange="handleChangechecked(${item.id})" />
      <h1>${item.title}</h1>
      <p>
      ${item.description}
    </p>
      <p>${item.date}</p>
      <button  class="modal-btn" onclick="showEditModal()" ><i class="fas fa-pencil-alt"></i></button>
       </div>`
    )
    .join(" ");
};

// delete all items
const deleteItems = (items) => {
  items.length = 0;
  viewItems(items);
  counter = 0;
  Counter.innerHTML = ` ${counter}`;
  console.log(counter);
};

// check item
const handleChangechecked = (id) => {
  const isDone = doneItemsIds.includes(id);
  if (isDone) {
    doneItemsIds = doneItemsIds.filter((_id) => _id !== id);
  } else {
    doneItemsIds = [...doneItemsIds, id];
  }
};

// remov select item
const removeItem = (items) => {
  let checkedItems = doneItemsIds.length;
  items = items.filter((a) => !doneItemsIds.includes(a.id));
  viewItems(items);
  counter = counter - checkedItems;
  Counter.innerHTML = ` ${counter}`;
  closeModal();
  console.log("remove", items);
};

// edit item
const editForm = (id) => {
  e.preventDefault();
  console.log(id);

  // const edit_title = document.getElementById("input_title");
  // const edit_description = document.getElementById("input_des");
  // const edit_date = document.getElementById("input_date");
  // const edititem = items.includes(item);
  // edit_title.value = item.title;
  // edit_description.value = item.description;
  // edit_date.value = items.date;
};
