function displayDate(dateApi) {
  let date = new Date(dateApi);
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
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${date.getMinutes()}`;
  }
  return `Last updated on ${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}, at ${date.getHours()}:${minutes}`;
}
function changeIconForecast(id) {
  if (id === 800) {
    return "fas fa-sun small";
  }
  if (id >= 801 && id <= 804) {
    return "fas fa-cloud-sun small";
  }
  if ((id >= 300 && id <= 321) || (id >= 520 && id <= 531)) {
    return "fas fa-cloud-showers-heavy small";
  }
  if (id >= 500 && id <= 504) {
    return "fas fa-cloud-sun-rain small";
  }
  if (id >= 200 && id <= 232) {
    return "fas fa-bolt small";
  }
  if ((id >= 600 && id <= 622) || id === 511) {
    return "fas fa-snowflake small";
  }
  if (id >= 701 && id <= 781) {
    return "fas fa-smog small";
  }
}
function changeDayForecast(dateApi) {
  let date = new Date(dateApi);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[date.getDay()]}`;
}
function showForecast(response) {
  console.log(response);
  let forecastCard = document.querySelector("#cardsForecast");
  forecastCard.innerHTML = null;
  let forecastResponse = null;
  for (let index = 1; index < 7; index++) {
    forecastResponse = response.data.daily[index];
    forecastCard.innerHTML += `<div class="col-md-2">
            <div class="card weekDay"><div class="cardTitle">${changeDayForecast(
              forecastResponse.dt * 1000
            )}</div>
              <div class="cardIcon">
                <i class="${changeIconForecast(
                  forecastResponse.weather[0].id
                )}"></i>
              </div>
              <div class="cardTemperature">
                <span class="maximumTemperature">${Math.round(
                  forecastResponse.temp.max
                )}°</span>
                <span class="minimumTemperature"">${Math.round(
                  forecastResponse.temp.min
                )}°</span>
              </div></div>
          </div>`;
  }
}
function getApiForecastCelsius(latitude, longitude) {
  let apiKey = "0987205707074255a39169907ca55577";
  let apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly,daily&appid=${apiKey}&units=metric`;
  axios.get(apiForecast).then(showForecast);
}
function getApiForecastFahrenheit(latitude, longitude) {
  let apiKey = "0987205707074255a39169907ca55577";
  let apiForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&%20exclude=hourly,daily&appid=${apiKey}&units=imperial`;
  axios.get(apiForecast).then(showForecast);
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
  getApiForecastCelsius(response.data.coord.lat, response.data.coord.lon);
  let realTimeDate = document.querySelector("#real-time-date");
  realTimeDate.innerHTML = displayDate(response.data.dt * 1000);
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
  changeIconMain(response.data.weather[0].id);
  let temperatureImage = document.querySelector("#temperature-image");
  temperatureImage.setAttribute("alt", response.data.weather[0].description);
}
function changeIconMain(id) {
  let temperatureImage = document.querySelector("#temperature-image");
  if (id === 800) {
    temperatureImage.setAttribute("class", "fas fa-sun");
  }
  if (id >= 801 && id <= 804) {
    temperatureImage.setAttribute("class", "fas fa-cloud-sun");
  }
  if ((id >= 300 && id <= 321) || (id >= 520 && id <= 531)) {
    temperatureImage.setAttribute("class", "fas fa-cloud-showers-heavy");
  }
  if (id >= 500 && id <= 504) {
    temperatureImage.setAttribute("class", "fas fa-cloud-sun-rain");
  }
  if (id >= 200 && id <= 232) {
    temperatureImage.setAttribute("class", "fas fa-bolt");
  }
  if ((id >= 600 && id <= 622) || id === 511) {
    temperatureImage.setAttribute("class", "fas fa-snowflake");
  }
  if (id >= 701 && id <= 781) {
    temperatureImage.setAttribute("class", "fas fa-smog");
  }
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
  getApiForecastFahrenheit(response.data.coord.lat, response.data.coord.lon);
  let realTimeDate = document.querySelector("#real-time-date");
  realTimeDate.innerHTML = displayDate(response.data.dt * 1000);
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
  changeIconMain(response.data.weather[0].id);
  let temperatureImage = document.querySelector("#temperature-image");
  temperatureImage.setAttribute("alt", response.data.weather[0].description);
}
function getDefaultInfoLisbon() {
  let city = document.querySelector("#real-location");
  city.innerHTML = "Lisbon";
  let apiKey = "0987205707074255a39169907ca55577";
  let apiUrlCelsius = `https://api.openweathermap.org/data/2.5/weather?q=lisbon&appid=${apiKey}&units=metric`;
  axios.get(apiUrlCelsius).then(showTemperatureCelsius);
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.value = "Lisbon";
}
getDefaultInfoLisbon();
let form = document.querySelector("#type-city");
form.addEventListener("submit", search);
let degreesCelsius = document.querySelector("#degrees-celsius");
degreesCelsius.addEventListener("click", showCelsius);
let degreesFahrenheit = document.querySelector("#degrees-fahrenheit");
degreesFahrenheit.addEventListener("click", showFahrenheit);
let currentLocationbutton = document.querySelector("#current-location-button");
currentLocationbutton.addEventListener("click", getPosition);
