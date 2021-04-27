const dayAddBtn = document.querySelector(".dayBtn");
const addModal = document.querySelector(".addDay");
const closeBtn = document.querySelector(".addDay-header__close");
const okayCancleBtn = document.querySelectorAll(".addDay-form__btns button");

function showDayModal() {
    addModal.classList.remove(HIDDEN);
}
function hiddenDayModal(event) {
    event.preventDefault();
    addModal.classList.add(HIDDEN);
}
function init() {
    dayAddBtn.addEventListener("click", showDayModal);
    closeBtn.addEventListener("click", hiddenDayModal);
    okayCancleBtn[0].addEventListener("click", hiddenDayModal);
    okayCancleBtn[1].addEventListener("click", hiddenDayModal);
}

init();