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

function formatDay(timestamp){
  let date= new Date ( timestamp*1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];

};

function displayForecast (response){
 let forecast = response.data.daily
  
  let forecastElement=document.querySelector ( "#forecast");

let forecastHTML =`<div class="row">`;

 forecast.forEach(function(forecastDay, index){
   if ( index <6 ){
   forecastHTML= 
forecastHTML+ `
  
  <div class="col-2">
    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
    <img
                  src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="60"
                />
     <div class="weather-forecast-temp">
       <span class="weather-forecast-temp-max"><strong>${Math.round(forecastDay.temp.max)}°</strong></span>/
       <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>
     </div>           
  </div>`;}
 })


    forecastHTML=forecastHTML+`</div>`;
  forecastElement.innerHTML=forecastHTML
};

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
};

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

  document.querySelector(".currentCondition").innerHTML = response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

   celsiusTemp =  Math.round(response.data.main.temp);  
  
   getForecast(response.data.coord)
  }

   


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




function displayFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemp = Math.round((celsiusTemp*9)/5+32);
  let TempretureElement= document.querySelector("#currentTemp");
TempretureElement.innerHTML= fahrenheitTemp;

}

function displayCelsius (event){
  event.preventDefault();
  let TempretureElement= document.querySelector("#currentTemp");
  TempretureElement.innerHTML= celsiusTemp; 

}

let celsiusTemp = null;

let search = document.querySelector("#search-city-form");
search.addEventListener("submit", city);

searchCity("Sydney");


let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", getCurrentLocation);
let fahrenheitLink= document.querySelector( "#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
let celsiustLink= document.querySelector( "#celsius-link");
celsiustLink.addEventListener("click", displayCelsius);