const clock = document.querySelector(".clock-text");

function askTime() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    clock.innerText = `${hour<10 ?`0${hour}`:hour}:${min<10?`0${min}`:min}:${sec<10?`0${sec}`:sec}`
}

function init() {
    askTime();
    setInterval(askTime, 1000);
}

init();