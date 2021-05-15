const dayAddBtn = document.querySelector(".dayBtn"),
  addModal = document.querySelector(".addDay"),
  dDayForm = document.querySelector(".addDay-form"),
  addDdayTitle = document.querySelector(".addDay-form input[type=text]"),
  ddayDate = document.querySelector(".addDay-form__date input[type=date]"),
  closeBtn = document.querySelector(".addDay-header__close"),
  cancleBtn = document.querySelector(".addDay-form__btns button"),
  ddayBtn = document.querySelector(".addDay-form__btns input[type=submit]"),
  dayList = document.querySelector(".dayList");

const DDAY = "dday";
const oneDay = 86400000;
let ddayArray = [];

function deleteDday(event) {
  //HTML li 삭제
  const icon = event.target;
  const btn = icon.parentNode;
  const li = btn.parentNode;
  dayList.removeChild(li);
  // localStorage  li 삭제
  const cleanDday = ddayArray.filter(function (dday) {
    return dday.id !== parseInt(li.id);
  });
  ddayArray = cleanDday;
  saveDday(ddayArray);
}

function saveDday(text) {
  localStorage.setItem(DDAY, JSON.stringify(text));
}

function paintDday(dDateMilli, dTitle) {
  const today = new Date();
  const todayMilli = today.getTime();
  const dday = Math.floor((todayMilli - dDateMilli) / oneDay);
  const li = document.createElement("li");
  const spanDay = document.createElement("p");
  const spanTitle = document.createElement("span");
  const delBtn = document.createElement("button");
  const icon = document.createElement("i");
  icon.classList.add("fas");
  icon.classList.add("fa-times-circle");
  icon.classList.add("fa-lg");
  delBtn.appendChild(icon);
  delBtn.classList.add(HIDDEN);
  delBtn.addEventListener("click", deleteDday);
  const newDayId = ddayArray.length + 1;
  spanDay.innerText = `D${dday === 0 ? `-day` : dday > 0 ? `+${dday}` : dday}`;
  spanTitle.innerText = dTitle;
  li.appendChild(spanDay);
  li.appendChild(spanTitle);
  li.appendChild(delBtn);
  li.id = newDayId;
  dayList.appendChild(li);
  const ddayObj = {
    dday: dday,
    title: dTitle,
    id: newDayId
  };
  ddayArray.push(ddayObj);
  saveDday(ddayArray);
  deleteBtnShowHidden();
  addModal.classList.add(HIDDEN);
}

function askForDday(event) {
  event.preventDefault();

  // const today = new Date();
  // const todayMilli = today.getTime();

  const ddayValue = ddayDate.value;
  ddayDate.value = "";
  const ddayYear = parseInt(ddayValue.slice(0, 4));
  const ddayMonth = parseInt(ddayValue.slice(5, 7)) - 1;
  const ddayDay = parseInt(ddayValue.slice(-2));
  const dDate = new Date(ddayYear, ddayMonth, ddayDay);
  const dDateMilli = dDate.getTime();

  // const dday = Math.floor((todayMilli - dDateMilli) / oneDay);

  const dTitle = addDdayTitle.value;
  addDdayTitle.value = "";

  paintDday(dDateMilli, dTitle);
}

function showDayModal() {
  addModal.classList.remove(HIDDEN);
}
function hiddenDayModal(event) {
  event.preventDefault();
  addModal.classList.add(HIDDEN);
}

function deleteBtnShowHidden() {
  for (let i = 0; i < ddayArray.length; i++) {
    dayList.children[i].addEventListener("mouseenter", (e) => {
      const li = e.target;
      const btn = li.children[2];
      btn.classList.remove(HIDDEN);
    });
  }
  for (let i = 0; i < ddayArray.length; i++) {
    dayList.children[i].addEventListener("mouseleave", (e) => {
      const li = e.target;
      const btn = li.children[2];
      btn.classList.add(HIDDEN);
    });
  }
}

function init() {
  dayAddBtn.addEventListener("click", showDayModal);
  closeBtn.addEventListener("click", hiddenDayModal);
  cancleBtn.addEventListener("click", hiddenDayModal);
  const theDay = localStorage.getItem(DDAY);
  if (theDay !== null) {
    const parseDday = JSON.parse(theDay);
    parseDday.forEach((day) => {
      paintDday(day.dday, day.title);
    });
  }
  dDayForm.addEventListener("submit", askForDday);
}

init();
