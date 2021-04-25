const hiName = document.querySelector(".nameText");
const form = document.querySelector("form");
const askName = form.querySelector(".name");

function saveName(text) {
    localStorage.setItem("name", text);
}

function handleName(event) {
    const name = askName.value;
    event.preventDefault();
    paintName(name);
    saveName(name);
}
function paintName(text) {
    form.classList.add(HIDDEN)
    hiName.classList.remove(HIDDEN);
    hiName.innerText = `Hi! ${text}`;
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