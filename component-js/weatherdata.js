//
import { apiKey } from "../.gitignore/apikey.js";

let apiInfo = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityBox = document.getElementById("cityInput");
const weatherIcon = document.querySelector(".weatherLogo");
cityBox.value = "";

export async function dataWeather(city) {
  const data = await fetch(apiInfo + city + `&appid=${apiKey}`);
  const dataResult = await data.json();

  document.getElementById("city").textContent =
    "City : " + dataResult.name + " , " + dataResult.sys.country;
  document.getElementById("temp").textContent =
    "Temperature : " + Math.round(dataResult.main.temp) + " °C";
  document.getElementById("wind").textContent =
    "Wind : " + dataResult.wind.speed + " KM/H";
  document.getElementById("humidity").textContent =
    "Humidity : " + dataResult.main.humidity + "%";

  console.log(dataResult);

  switch (dataResult.weather[0].main) {
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
  }
}

cityBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    dataWeather(cityBox.value);
    cityBox.value = "";
  }
});
