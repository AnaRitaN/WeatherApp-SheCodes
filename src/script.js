function getDigitsMinutes() {
  let now = new Date();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    return `0${now.getMinutes()}`;
  } else {
    return `${now.getMinutes()}`;
  }
}
function getRealTimeDate() {
  let realTimeDate = document.querySelector("#real-time-date");
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  realTimeDate.innerHTML = `Last updated on ${days[now.getDay()]}, ${
    months[now.getMonth()]
  } ${now.getDate()}, at ${now.getHours()}:${getDigitsMinutes()}`;
}
function search(event) {
  event.preventDefault();
  let city = document.querySelector("#real-location");
  let searchedCity = document.querySelector("#searched-city");
  if (searchedCity.value) {
    city.innerHTML = `${searchedCity.value}`;
  } else {
    ("❤ Search for a city");
  }
  let apiKey = "0987205707074255a39169907ca55577";
  let apiUrlCelsius = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCelsius).then(showTemperatureCelsius);
}
function showCelsius() {
  let searchedCity = document.querySelector("#searched-city");
  let apiKey = "0987205707074255a39169907ca55577";
  let apiUrlCelsius = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCelsius).then(showTemperatureCelsius);
}
function showTemperatureCelsius(response) {
  getRealTimeDate();
  console.log(response);
  let temperatureCelsius = response.data.main.temp;
  temperatureCelsius = Math.round(temperatureCelsius);
  let degrees = document.querySelector("#temperature-number");
  degrees.innerHTML = `${temperatureCelsius}`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;
  let apiHumidity = response.data.main.humidity;
  apiHumidity = Math.round(apiHumidity);
  let apiWind = response.data.wind.speed;
  apiWind = Math.round(apiWind);
  let weatherHumidityWind = document.querySelector("#weather-humidity-wind");
  weatherHumidityWind.innerHTML = `Humidity: ${apiHumidity}% <br /> Wind: ${apiWind}m/s`;
}
function getPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function displayCurrentLocation(response) {
  let currentLocation = response.data.name;
  let city = document.querySelector("#real-location");
  city.innerHTML = `${currentLocation}`;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.value = `${currentLocation}`;
}
function handlePosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0987205707074255a39169907ca55577";
  let apiUrlCelsius = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCelsius).then(showTemperatureCelsius);
  axios.get(apiUrlCelsius).then(displayCurrentLocation);
}
function showFahrenheit() {
  let searchedCity = document.querySelector("#searched-city");
  let apiKey = "0987205707074255a39169907ca55577";
  let apiUrlFahrenheit = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrlFahrenheit).then(showTemperatureFahrenheit);
}
function showTemperatureFahrenheit(response) {
  getRealTimeDate();
  console.log(response);
  let temperatureFahrenheit = response.data.main.temp;
  temperatureFahrenheit = Math.round(temperatureFahrenheit);
  let degrees = document.querySelector("#temperature-number");
  degrees.innerHTML = `${temperatureFahrenheit}`;
  let description = response.data.weather[0].description;
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;
  let apiHumidity = response.data.main.humidity;
  apiHumidity = Math.round(apiHumidity);
  let apiWind = response.data.wind.speed;
  apiWind = Math.round(apiWind);
  let weatherHumidityWind = document.querySelector("#weather-humidity-wind");
  weatherHumidityWind.innerHTML = `Humidity: ${apiHumidity}% <br /> Wind: ${apiWind}mph`;
}

getRealTimeDate();
let form = document.querySelector("#type-city");
form.addEventListener("submit", search);
let degreesCelsius = document.querySelector("#degrees-celsius");
degreesCelsius.addEventListener("click", showCelsius);
let degreesFahrenheit = document.querySelector("#degrees-fahrenheit");
degreesFahrenheit.addEventListener("click", showFahrenheit);
let currentLocationbutton = document.querySelector("#current-location-button");
currentLocationbutton.addEventListener("click", getPosition);
