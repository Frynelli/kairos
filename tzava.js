let current = new Date();
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
function currentDate(date) {
  let days = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  let time = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  let currentDay = days[current.getDay()];
  let currentHour = current.getHours();
  let currentMinutes = addZero(current.getMinutes());

  let fullDate = `${currentDay}   ${currentHour}:${currentMinutes}`;
  return fullDate;
}
console.log(currentDate(current));
let dateInput = document.querySelector("#full-day");
dateInput.innerHTML = currentDate(current);

//apiCity here//

function cityLocation(response) {
  let temperatureLow = Math.round(response.data.main.temp_min);
  let temperatureHi = Math.round(response.data.main.temp_max);
  let temperatureNow = Math.round(response.data.main.temp);
  let lowTemp = document.querySelector("#left-lo");
  let nowTemp = document.querySelector("#center");
  let hiTemp = document.querySelector("#right-hi");
  lowTemp.innerHTML = `${temperatureLow}`;
  hiTemp.innerHTML = `${temperatureHi}`;
  nowTemp.innerHTML = `${temperatureNow}`;
}
let cityInput = document.querySelector("#city-form");
cityInput.addEventListener("submit", searchCityCelcius);
function searchCityCelcius(event) {
  event.preventDefault();
  let cityText = document.querySelector("#city-input");
  let placeCity = `${cityText.value}`;
  let placeCityCapitalized =
    placeCity.charAt(0).toUpperCase() + placeCity.slice(1);
  let city = document.querySelector("#put-the-city");
  if (placeCity.length > 2) {
    city.innerHTML = `${placeCityCapitalized}`;
  } else {
    city.innerHTML = `Athens`;
  }
  let apiKey = "16ee8d6616116203cc7a912f8467b2d5";
  let apiMain = "https://api.openweathermap.org/data/2.5/weather?";
  let cityApi = `${apiMain}q=${placeCity}&units=metric&appid=${apiKey}`;
  axios.get(cityApi).then(cityLocation);
}
// current temperature F C
function currentPlace(response) {
  console.log(response);
  let currentPlace = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempLow = Math.round(response.data.main.temp_min);
  let currentTempHi = Math.round(response.data.main.temp_max);
  let lowTemp = document.querySelector("#left-lo");
  let nowTemp = document.querySelector("#center");
  let hiTemp = document.querySelector("#right-hi");
  let cityName = document.querySelector("#put-the-city");
  cityName.innerHTML = `${currentPlace}`;
  nowTemp.innerHTML = `${currentTemp}`;
  lowTemp.innerHTML = `${currentTempLow}`;
  hiTemp.innerHTML = `${currentTempHi}`;
}
function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "16ee8d6616116203cc7a912f8467b2d5";
  let apiMain = "https://api.openweathermap.org/data/2.5/weather?";
  let currentUrl = `${apiMain}lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(currentUrl).then(currentPlace);
}
let currentButton = document.querySelector("#next");
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
currentButton.addEventListener("click", currentLocation);
