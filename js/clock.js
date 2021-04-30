const clock = document.querySelector(".clock-text");
const calDate = document.querySelector(".calendar_date");
const calDay = document.querySelector(".calendar_day");
const calMonth = document.querySelector(".calendar_month");

const 요일 = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const 달 = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function askTime() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    clock.innerText = `${hour<10 ?`0${hour}`:hour}:${min<10?`0${min}`:min}:${sec<10?`0${sec}`:sec}`
}

function askDate() {
    const today = new Date();
    const date = today.getDate();
    const day = today.getDay();
    const month = today.getMonth();
    calDate.innerText = date;
    calMonth.innerText = 달[month];
    calDay.innerText = 요일[day];
    colorDay(day);
}

function colorDay(day) {
    if(요일[day] == "SAT") {
        calDay.style.color = "#00a5e1";
    } else if (요일[day] == "SUN") {
        calDay.style.color = "#e63c2e";
    } else {
        calDay.style.color = "#ffffff";
    }
}

function init() {
    askTime();
    setInterval(askTime, 1000);
    askDate();
}

init();