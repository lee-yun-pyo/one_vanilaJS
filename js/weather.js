const API_KEY ="b36e8b73b3528c0bfa974e10f3240ce0";
const weatherPlace= document.querySelector(".weather-name");
const weatehrTemp = document.querySelector(".weather-temp");
const weatherHum = document.querySelector(".weather-hum");
const weatherIcon = document.querySelector(".weather-icon");

const COORDS = "coords";

function getWeather(log, lat) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${log}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
        return response.json();
    }) 
    .then(function(json) {
        const temp = json.main.temp;
        const place = json.name;
        const humid = json.main.humidity;
        const icon = json.weather[0].icon;
        console.log(icon)
        weatherIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        console.log(weatherIcon.src);
        weatehrTemp.innerText = `${Math.ceil(temp)}°`;
        weatherPlace.innerText = `${place}`;
        weatherHum.innerText = `${humid}%`;
    })
}

function saveCoords(obj) {
    localStorage.setItem(COORDS,JSON.stringify(obj))
}

function handleGeoSucces(position) {
    const longitude = position.coords.longitude;
    const latitude = position.coords.latitude;
    const coordsObj = {
        longitude:longitude,
        latitude:latitude
    };
    saveCoords(coordsObj);
    getWeather(longitude,latitude);
}

function handleGeoError() {
    console.log("error");
}

function askCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoord() {
    const coords =localStorage.getItem(COORDS);
    if(coords === null) {
        askCoords();
    } else{
        const parseCoords = JSON.parse(coords);
        getWeather(parseCoords.longitude, parseCoords.latitude);
    }
} 

function init() {
    loadCoord();
}

init();