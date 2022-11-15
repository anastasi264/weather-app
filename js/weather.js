
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
}

axios.get(apiWeather(city)).then(showTemp);

// ............LOCATION......... //

// function changeCity(event) {

// 	let searchInput = document.querySelector("#search-input");
// 	let location = document.querySelector("#location");
// 	location.innerHTML = searchInput.value;
// }

// let searchButton = document.querySelector("#button-addon1");
// searchButton.addEventListener("click", changeCity);

// axios.get(apiWeather).then(changeCity)



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
