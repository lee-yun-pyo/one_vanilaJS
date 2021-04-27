const dayAddBtn = document.querySelector(".dayBtn");
const addModal = document.querySelector(".addDay");
const closeBtn = document.querySelector(".addDay-header__close");
const cancleBtn = document.querySelector(".addDay-form__btns button");
const ddayTitle = document.querySelector(".addDay-form input[type=text]");
const ddayDate = document.querySelector(".calendar");
const ddayBtn = document.querySelector(".addDay-form__btns input[type=submit]");
const dayList = document.querySelector(".dayList");

const DDAY = "dday";
const oneDay = 86400000;
let ddayArray = [];

function saveDday(text) {
    localStorage.setItem(DDAY, JSON.stringify(text));
}

function paintDday(dday, dTitle) {
    const li = document.createElement("li");
    const spanDay = document.createElement("p");
    const spanTitle = document.createElement("span");
    const newDayId = ddayArray.length+1;
    spanDay.innerText = `${dday} d`;
    spanTitle.innerText = dTitle;
    li.appendChild(spanDay);
    li.appendChild(spanTitle);
    li.id = newDayId;
    dayList.appendChild(li);
    const ddayObj = {
        dday : dday,
        title : dTitle,
        id : newDayId
    };
    ddayArray.push(ddayObj);
    saveDday(ddayArray);
    addModal.classList.add(HIDDEN);    
}

function askForDday(event) {
    event.preventDefault();
    const today = new Date();
    const todayMilli = today.getTime();
    const ddayValue = ddayDate.value;
    console.log(ddayValue.slice(0,4));
    const ddayYear = parseInt(ddayValue.slice(0,4));
    const ddayMonth = parseInt(ddayValue.slice(5,7))-1;
    const ddayDay = parseInt(ddayValue.slice(-2));
    const dDate = new Date(ddayYear, ddayMonth, ddayDay);
    console.log(dDate);
    const dDateMilli = dDate.getTime();
    const dday = Math.floor((todayMilli - dDateMilli)/oneDay);
    const dTitle = ddayTitle.value
    paintDday(dday, dTitle);
}

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
    cancleBtn.addEventListener("click", hiddenDayModal);
    const theDay = localStorage.getItem(DDAY);
    if(theDay === null) {
        ddayBtn.addEventListener("click", askForDday);
    } else {
        const parseDday = JSON.parse(theDay);
        parseDday.forEach(day => {
            paintDday(day.dday, day.title)
        })
    }
}

init();