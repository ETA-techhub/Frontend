const API_KEY = "YOUR_API_KEY_HERE";
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const weatherSection = document.getElementById('weatherSection');
const errorMsg = document.getElementById('errorMsg');
const cityNameEl = document.getElementById('cityName');
const countryEl = document.getElementById('country');
const temperatureEl = document.getElementById('temperature');
const descEl = document.getElementById('desc');
const weatherIconEl = document.getElementById('weatherIcon');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');
const feelsLikeEl = document.getElementById('feelsLike');
const pressureEl = document.getElementById('pressure');
function showError(msg){
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
  weatherSection.classList.add('hidden');
}
function kelvinToCelsius(k) { return (k - 273.15).toFixed(1); }
async function fetchWeather(city){
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('City not found');
    const data = await res.json();
    renderWeather(data);
  } catch (err) {
    showError(err.message);
  }
}
function renderWeather(data){
  const { name, sys, main, weather, wind } = data;
  cityNameEl.textContent = name;
  countryEl.textContent = `${sys.country}`;
  temperatureEl.textContent = `${kelvinToCelsius(main.temp)}°C`;
  descEl.textContent = weather[0].description;
  weatherIconEl.src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  humidityEl.textContent = `${main.humidity}%`;
  windEl.textContent = `${wind.speed} m/s`;
  feelsLikeEl.textContent = `${kelvinToCelsius(main.feels_like)}°C`;
  pressureEl.textContent = `${main.pressure} hPa`;
  weatherSection.classList.remove('hidden');
  errorMsg.classList.add('hidden');
}
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  fetchWeather(city);
});
