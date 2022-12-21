
// ............LOCATION......... //

function changeCity(event) {
	event.preventDefault();

	let searchInput = document.querySelector("#search-input");
	const newCity = searchInput.value;
	console.log('newCity', newCity);
	axios.get(apiWeather(newCity)).then(showTemp);
}

let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("#button-addon1");
searchButton.addEventListener("click", changeCity);

searchInput.addEventListener("keypress", function(event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    changeCity(event);
  }
});

// ............DATE......... //

let now = new Date();
let hour = now.getHours();
let minutes = String(now.getMinutes()).padStart(2, '0');
// console.log(`${hour} : ${minutes}`);


let allDays =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let currentDay = allDays[now.getDay()];
let currentDate = now.getDate();
// console.log(`${currentDay}, ${currentDate}`);

let todayDate = document.querySelector("#date");
todayDate.innerHTML = `${hour}:${minutes} | ${currentDay}, ${currentDate}`


// ............TEMPERATURE DEGREE......... //
function degreeConversion(event) {
	const tempValueBox = document.querySelector(".temp-value"); 
	const temperatureValue = Number(tempValueBox.innerText);
	let newValue = null;
	// console.log(event.target);
	if (event.target.classList.contains("selected-degree")) {
		return
	}
	if (event.target.classList.contains("fahrenheit")) {
		newValue = Math.round((temperatureValue * 9/5) + 32);
		fahrenheit.classList.add("selected-degree");
		celsius.classList.remove("selected-degree");
	} else {
		newValue = Math.round((temperatureValue - 32) * 5/9);
		celsius.classList.add("selected-degree");
		fahrenheit.classList.remove("selected-degree");
	}

	tempValueBox.innerText = newValue;
}
let celsius = document.querySelector(".celsius");
let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", degreeConversion);
celsius.addEventListener("click", degreeConversion);

// ............ API FORMAT DATE FORECAST......... //
function formatDate(timestamp) {
	let date = new Date(timestamp * 1000);
	let day = date.getDay();
	let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	
	return days[day];
}

// ............ API DISPLAY FORECAST......... //


function displayForecast(response) {
	let forecast = response.data.daily;
	console.log(forecast);
	let forecastElement = document.querySelector("#weather-forecast");
	let forecastHTML = `<div class="forecast">`;
	let days = ['a', 'b', 'c', 'd', 'e'];
	const newForecastArray = forecast.splice(1, 5);
	newForecastArray.forEach((forecastDay, index) => {
		console.log(index, 'forecastDay', forecastDay);
		// src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" 
		forecastHTML =
			forecastHTML + `
				<div class="forecast-day">
					<div class="weather-forecast-day">
						${formatDate(forecastDay.dt)}
					</div>
					<img 
						src="${weatherData[forecastDay.weather[0].main]}"
						alt=""
						width="42"
					>
					<div class="weather-forecast-temperatures">
						<span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}°</span>
						<span class="weather-forecast-temperature-min">   ${Math.round(forecastDay.temp.min)}° </span>
					</div>
				</div>
			`;
		
	});

	forecastHTML = forecastHTML + `</div>`;

	forecastElement.innerHTML = forecastHTML;
}

// ............ API FORECAST......... //
function getForecast(coordinates) {
	console.log(coordinates);
	let apiKeyForecast = "a43564c91a6c605aeb564c9ed02e3858";
	// let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyForecast}&units=metric`
	let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKeyForecast}&units=metric`
	console.log(apiUrl);
	axios.get(apiUrl).then(displayForecast);
}

// ............ API TEMPERATURE......... //

let city = "kyiv";
let apiKey = "5da7b2dc058f07286fea39c4cee516a3";

function apiWeather(city) {
	return `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; 
}
function showTemp(response) {

	console.log(response.data);
	console.log(response.data.name);
	console.log(response.data.sys.country);
	console.log(response.data.main.temp);
	console.log(response.data.weather[0].description);
	console.log(response.data.wind.speed);
	console.log(response.data.main.humidity);
	
	let cityName = response.data.name;
	let country = response.data.sys.country;
	let cityTemp = Math.round(response.data.main.temp);
	let description = response.data.weather[0].description;
	let windSpeed = Math.round(response.data.wind.speed);
	let humidity = Math.round(response.data.main.humidity);
	let icon = response.data.weather[0].icon;

	let titleCity = document.querySelector("#location");
	titleCity.innerHTML = `${cityName}, ${country}`;

	let titleTemp = document.querySelector(".temp-value");
	titleTemp.innerHTML = cityTemp;

	let weatherDescription = document.querySelector(".weather-description");
	weatherDescription.innerHTML = description;

	let cityWindSpeed = document.querySelector(".wind-value");
	cityWindSpeed.innerHTML = `${windSpeed} m/s`;

	let humidityValue = document.querySelector(".humidity-value");
	humidityValue.innerHTML = `${humidity} %`;

	let iconTemp = document.querySelector("#icon");
	iconTemp.setAttribute("src", `${weatherData[response.data.weather[0].main]}`);

	getForecast(response.data.coord);
}
const weatherData = {
	Clouds: 'img/sunny-cloud.gif',
	Rain: 'img/sunny-rainy.gif',
	Clear: 'img/sunny.gif',
	Snow: 'img/snow.gif',
	Thunderstorm: 'img/stormy.gif',
	Drizzle: 'img/rainy.gif',
	Mist: 'img/windy.gif',
};

let sun = 
axios.get(apiWeather(city)).then(showTemp);

// ............ NAVIGATION......... //


function myPosition(position) {
	console.log(position.coords.latitude);
	console.log(position.coords.longitude);

	let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
	axios.get(url).then(showTemp);
}

navigator.geolocation.getCurrentPosition(myPosition);


// ............ NAVIGATION BUTTON......... //

function currentPosition (event) {
	navigator.geolocation.getCurrentPosition(myPosition);
}
let myLocationButton = document.querySelector(".location-button");
myLocationButton.addEventListener("click", currentPosition)


displayForecast();