//date
let now = new Date();
let time = document.querySelector(".day");

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Nov",
  "Oct",
  "Dec",
];
let month = months[now.getMonth()];

time.innerHTML = ` ${day} ${date} ${month} ${hours}:${minutes}`;

//display the city

function searchCity(city) {
  let apiKey = "a7edac7c339e249bf90472e14cc7ec79";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempreture);
}

function city(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

searchCity("Sydney");

function showTempreture(response) {
  document.querySelector("h1").innerHTML = response.data.name;

  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );

  let condition = response.data.main.humidity;
  let currentCondition = document.querySelector(".humidity");
  currentCondition.innerHTML = `humidity ${condition}% `;

  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = `wind ${wind}km/hr`;

  document.querySelector(".currentCondition").innerHTML =
    response.data.weather[0].main;
}
let search = document.querySelector("#search-city-form");
search.addEventListener("submit", city);

//current location
 
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTempreture);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentLocation);
//display tempreture
//function tempCelsius(event) {
//event.preventDefault();
//let currentCelsius = document.querySelector(".tempChange");}
//function tempratureFahrenheit(event) {
//event.preventDefault();
//let currentFah = document.querySelector(".tempChange");
//let tempreture = #currentTemp
//currentFah.innerHTML = Math.round((tempreture * 9) / 5 + 32);}

//let tempFah = document.querySelector("#fahrenheit-link");
//tempFah.addEventListener("click", tempratureFahrenheit);
//let tempCels = document.querySelector("#celsius-link");
//tempCels.addEventListener("click", tempCelsius);
//let tempretureCelsLocation = document.querySelector("#currentTemp");
