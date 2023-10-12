//

let apiInfo =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const cityBox = document.getElementById("cityInput");
const weatherIcon = document.querySelector(".weatherLogo");
cityBox.value = "";

function getWeatherIcon(weatherMain) {
  switch (weatherMain) {
    case "Clouds":
      return "public/src/clouds.png";
    case "Clear":
      return "public/src/clear.png";
    case "Drizzle":
      return "public/src/drizzle.png";
    case "Mist":
      return "public/src/mist.png";
    case "Rain":
      return "public/src/rain.png";
    case "Snow":
      return "public/src/snow.png";
    default:
      return "public/src/default.png";
  }
}

export async function dataWeather(city) {
  const data = await fetch(
    apiInfo + city + `&appid=${import.meta.env.VITE_SECRETWEATHERAPI_KEY}`
  );
  const dataResult = await data.json();

  document.querySelector(".weatherLogo").src =
    dataResult.list[0].weather[0].main;

  document.getElementById("city").textContent =
    "City : " + dataResult.city.name + " , " + dataResult.city.country;
  document.getElementById("maxTemp").textContent =
    "Temp max: " + Math.round(dataResult.list[0].main.temp_max) + " °C ";
  document.getElementById("minTemp").textContent =
    "Temp min: " + Math.round(dataResult.list[0].main.temp_min) + " °C ";
  document.getElementById("nowTemp").textContent =
    "Temp now: " + Math.round(dataResult.list[0].main.temp) + " °C ";
  document.getElementById("wind").textContent =
    "Wind : " + dataResult.list[0].wind.speed + " KM/H";
  document.getElementById("humidity").textContent =
    "Humidity : " + dataResult.list[0].main.humidity + "%";

  console.log(dataResult);

  switch (dataResult.list[0].weather[0].main) {
    case "Clouds":
      weatherIcon.src = "public/src/clouds.png";
      break;
    case "Clear":
      weatherIcon.src = "public/src/clear.png";
      break;
    case "Drizzle":
      weatherIcon.src = "public/src/drizzle.png";
      break;
    case "Mist":
      weatherIcon.src = "public/src/mist.png";
      break;
    case "Rain":
      weatherIcon.src = "public/src/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "public/src/rain.png";
      break;
  }

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  for (let day = 0; day <= 4; day++) {
    const dayData = dataResult.list[day * 7];

    const dayContainer = document.createElement("div");
    dayContainer.className = "forecastDay";
    forecastContainer.appendChild(dayContainer);

    const maxTempDay = document.createElement("span");
    maxTempDay.textContent =
      "Temp max: " + Math.round(dayData.main.temp_max) + " °C ";

    const minTempDay = document.createElement("span");
    minTempDay.textContent =
      "Temp min: " + Math.round(dayData.main.temp_min) + " °C ";

    const weatherIconDay = document.createElement("img");
    weatherIconDay.src = getWeatherIcon(dayData.weather[0].main);

    dayContainer.appendChild(weatherIconDay);
    dayContainer.appendChild(maxTempDay);
    dayContainer.appendChild(minTempDay);
  }
}

cityBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    dataWeather(cityBox.value);
    cityBox.value = "";
  }
});
