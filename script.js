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
  sessionStorage.setItem("ListItems", JSON.stringify(items));
  console.log(items);
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
      <button  class="modal-btn" onclick="editForm(${item.id})" ><i class="fas fa-pencil-alt"></i></button>
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
  sessionStorage.setItem("ListItems", JSON.stringify(items));
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
const removeItem = () => {
  let count_befor = items.length;
  items = items.filter((a) => !doneItemsIds.includes(parseInt(a.id)));
  let count_after = items.length;
  let new_count = count_befor - count_after;
  doneItemsIds = items.filter((a) => doneItemsIds.includes(parseInt(a.id)));
  viewItems(items);
  counter = counter - new_count;
  Counter.innerHTML = `${counter}`;
  closeModal();
  sessionStorage.setItem("ListItems", JSON.stringify(items));
};

formModal.addEventListener("submit", (e) => {
  e.preventDefault();
  let edit_title = document.getElementById("input_title").value;
  let edit_description = document.getElementById("input_des").value;
  let edit_date = document.getElementById("input_date").value;
  const titleErrorDiv = document.getElementById("entertitle_edit");
  const desErrorDiv = document.getElementById("enterdes_edit");
  const dateErrorDiv = document.getElementById("enterdate_edit");

  let results = checkInputs(edit_title, edit_description, edit_date);

  titleErrorDiv.innerHTML = "";
  desErrorDiv.innerHTML = "";
  dateErrorDiv.innerHTML = "";
  let id = localStorage.getItem("cardId");
  if (Object.keys(results.errors).length === 0) {
    editFormData(id, edit_title, edit_description, edit_date);
    sessionStorage.setItem("ListItems", JSON.stringify(items));
    closeEditModal();
    viewItems(items);
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

const editForm = (id) => {
  modalBg.classList.add("bg-active");
  const index = items.findIndex((ele) => ele.id == id);
  localStorage.setItem("cardId", id);
  let edit_title = (document.getElementById("input_title").value =
    items[index].title);
  let edit_description = (document.getElementById("input_des").value =
    items[index].description);
  let edit_date = (document.getElementById("input_date").value =
    items[index].date);
};

const editFormData = (id, title, description, date) => {
  const index = items.findIndex((ele) => ele.id == id);
  let items_arr = [...items];
  items_arr[index] = { id, title, description, date };
  items = [...items_arr];
};
