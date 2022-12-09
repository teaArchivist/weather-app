let now = new Date();

function formatDate(time) {
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
    "Febuary",
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

  let month = months[time.getMonth()];
  let date = now.getDate();
  let weekday = days[time.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  //let mainTime = document.querySelector("#time");
  return `${weekday} ${month} ${date}, ${hours}:${minutes}`;
}
let mainDate = document.querySelector("#date");
mainDate.innerHTML = formatDate(now);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#sunrise").innerHTML = formatDate(
    response.data.sys.sunrise * 1000
  );
  document.querySelector("#sunset").innerHTML = formatDate(
    response.data.sys.sunset * 1000
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#btn-current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function searchCity(city) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let units = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
let searchForm = document.querySelector("#searchCity");
searchForm.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "imperial";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&&units=${units}`;
  axios.get(`${apiURL}&appid=${apiKey}`).then(showWeather);
}
searchCity("New York");
