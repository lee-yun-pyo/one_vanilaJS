const hiName = document.querySelector(".nameText");
const form = document.querySelector(".nameAsk");
const askName = form.querySelector(".name");
const editBtn = document.querySelector(".name-edit");
const nameHeader = document.querySelector(".nameTitle");

function resetName() {
    localStorage.removeItem("name");
    nameHeader.classList.add(HIDDEN);
    askName.value = "";
    form.classList.remove(HIDDEN);
    form.addEventListener("submit", handleName);
}

function showEditBtn() {
    editBtn.classList.remove(HIDDEN);
    editBtn.addEventListener("click", resetName);
}
function hiddenEditBtn() {
    editBtn.classList.add(HIDDEN);
}
function saveName(text) {
    localStorage.setItem("name", text);
}

function handleName(event) {
    const name = askName.value;
    event.preventDefault();
    nameHeader.classList.remove(HIDDEN);
    paintName(name);
    saveName(name);
}
function paintName(text) {
    form.classList.add(HIDDEN);
    hiName.classList.remove(HIDDEN);
    hiName.innerText = `Hi! ${text}`;
    nameHeader.classList.remove(HIDDEN);
    nameHeader.addEventListener("mouseenter", showEditBtn);
    nameHeader.addEventListener("mouseleave", hiddenEditBtn);
}
function init() {
    const nameLS = localStorage.getItem("name");
    if(nameLS === null) {
        form.addEventListener("submit", handleName);
    } else {
        paintName(nameLS);
    }
}

init();