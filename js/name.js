const hiName = document.querySelector(".nameText"); // h1
const form = document.querySelector(".nameAsk"); // form
const askName = form.querySelector(".name"); // input[text]
const editBtn = document.querySelector(".name-edit");
const nameTitle = document.querySelector(".nameTitle"); //div

const NAME = "name";

function resetName() {
    localStorage.removeItem(NAME);
    nameTitle.classList.add(HIDDEN);
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
    localStorage.setItem(NAME, text);
}
function paintName(text) {
    nameTitle.classList.remove(HIDDEN);
    form.classList.add(HIDDEN);
    hiName.classList.remove(HIDDEN);
    hiName.innerText = `Hi! ${text}`;
    nameTitle.addEventListener("mouseenter", showEditBtn);
    nameTitle.addEventListener("mouseleave", hiddenEditBtn);
}
function handleName(event) {
    event.preventDefault();
    const name = askName.value;
    paintName(name);
    saveName(name);
}
function init() {
    const nameLS = localStorage.getItem(NAME);
    if(nameLS === null) {
        form.addEventListener("submit", handleName);
    } else {
        paintName(nameLS);
    }
}

init();