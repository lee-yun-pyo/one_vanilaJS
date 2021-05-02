const toDoForm = document.querySelector(".toDoForm"),
  toDoInput = toDoForm.querySelector(".toDoInput"),
  pendingList = document.querySelector(".pendingList"),
  finishList = document.querySelector(".finishList");

const PENDING = "PENDING";
const FINISH = "FINISHED";
let toDos = [];
let finDos = [];

function deleteFinished(event) {
  //HTML li 삭제
  const btn = event.target;
  const divBtn = btn.parentNode;
  const li = divBtn.parentNode;
  finishList.removeChild(li);
  // localStorage  li 삭제
  const cleanToDos = finDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finDos = cleanToDos;
  saveFinished();
}

function deletePending(event) {
  //HTML li 삭제
  const btn = event.target;
  const divBtn = btn.parentNode;
  const li = divBtn.parentNode;
  pendingList.removeChild(li);
  // localStorage  li 삭제
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(PENDING, JSON.stringify(toDos));
}

function saveFinished() {
  localStorage.setItem(FINISH, JSON.stringify(finDos));
}

function moveToDos(event) {
  deleteFinished(event);
  const btn = event.target;
  const divBtn = btn.parentNode;
  const li = divBtn.parentNode;
  const value = li.childNodes[0];
  const toDoValue = value.textContent;
  paintToDos(toDoValue);
}

function moveFinish(event) {
  deletePending(event);
  const btn = event.target;
  const divBtn = btn.parentNode;
  const li = divBtn.parentNode;
  const value = li.childNodes[0];
  const finValue = value.textContent;
  paintFinDos(finValue);
}

function paintFinDos(value) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const divBtn = document.createElement("div");
  divBtn.appendChild(delBtn);
  divBtn.appendChild(finBtn);
  const finId = finDos.length + 1;
  span.innerText = value;
  finBtn.innerText = "↩";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteFinished);
  finBtn.addEventListener("click", moveToDos);
  li.id = finId;
  li.appendChild(span);
  li.appendChild(divBtn);
  finishList.appendChild(li);
  const finObj = {
    text: value,
    id: finId
  };
  finDos.push(finObj);
  saveFinished();
}

function paintToDos(value) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const finBtn = document.createElement("button");
  const span = document.createElement("span");
  const divBtn = document.createElement("div");
  divBtn.appendChild(delBtn);
  divBtn.appendChild(finBtn);
  const newId = toDos.length + 1;
  span.innerText = value;
  finBtn.innerText = "✔";
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deletePending);
  finBtn.addEventListener("click", moveFinish);
  li.id = newId;
  li.appendChild(span);
  li.appendChild(divBtn);
  pendingList.appendChild(li);
  const toDoObj = {
    text: value,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleToDo(event) {
  event.preventDefault();
  const toDoValue = toDoInput.value;
  toDoInput.value = ""; // 엔터 누르면 다시 입력 가능
  paintToDos(toDoValue);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(PENDING);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach((pending) => {
      paintToDos(pending.text);
    });
  }
}

function loadFinDos() {
  const loadedFinDos = localStorage.getItem(FINISH);
  if (loadedFinDos !== null) {
    const parsedFinDos = JSON.parse(loadedFinDos);
    parsedFinDos.forEach((finished) => {
      paintFinDos(finished.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleToDo);
  loadFinDos();
}

init();
