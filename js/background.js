const body = document.querySelector("body");

const IMG_NUM = 7;

function paintImg(randomNum) {
    const image = new Image();
    image.src = `screenshot/${randomNum + 1}.jpg`;
    image.classList.add("backImg");
    body.appendChild(image);
}

function getRandom() {
    const random = Math.floor(Math.random() * IMG_NUM);
    return random;
}

function init() {
    const randomNum = getRandom();
    paintImg(randomNum);
}

init();