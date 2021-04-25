const menuBtn = document.querySelector("#name i");
const menuBar = document.querySelector("#menu");
const menuCloseBtn = document.querySelector("#menu i");

const HIDDEN = "hidden";

function openMenu() {
    menuBar.classList.remove(HIDDEN);
}
function closeMenu() {
    menuBar.classList.add(HIDDEN);
}
function init() {
    menuBtn.addEventListener("click", openMenu);
    menuCloseBtn.addEventListener("click", closeMenu);
}

init();