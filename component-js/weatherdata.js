let apiInfo =
  "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

const cityBox = document.getElementById("cityInput");
cityBox.value = "";

function getWeatherIcon(weatherMain) {
  switch (weatherMain) {
    case "Clouds":
      return "./src/clouds.png";
    case "Clear":
      return "./src/clear.png";
    case "Drizzle":
      return "./src/drizzle.png";
    case "Mist":
      return "./src/mist.png";
    case "Rain":
      return "./src/rain.png";
    case "Snow":
      return "./src/snow.png";
    default:
      return "./src/default.png";
  }
}

export async function dataWeather(city) {
  const data = await fetch(
    apiInfo + city + `&appid=${import.meta.env.VITE_SECRETWEATHERAPI_KEY}`
  );
  const dataResult = await data.json();

  document.querySelector(".weatherLogo").src = getWeatherIcon(
    dataResult.list[0].weather[0].main
  );

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

  const forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = "";

  let tempMax = [];
  let tempMin = [];

  for (let day = 0; day <= 4; day++) {
    const dayData = dataResult.list[day * 7];

    for (let i = 0; i <= 7; i++) {
      const dayData = dataResult.list[day * 7 + i];
      tempMax.push(dayData.main.temp_max);
      tempMin.push(dayData.main.temp_min);
    }

    const mainWeather = dayData.weather[0].main;

    const dayContainer = document.createElement("div");
    dayContainer.className = "forecastDay";
    dayContainer.classList.add("flex", "flex-col", "text-center", "border");
    forecastContainer.appendChild(dayContainer);

    const dayName = document.createElement("span");
    dayName.textContent = new Date(dayData.dt_txt).toLocaleDateString("en-US", {
      weekday: "long",
    });
    dayName.classList.add("font-bold", "pt-2");
    dayContainer.appendChild(dayName);

    const maxTempDay = document.createElement("span");
    maxTempDay.textContent =
      "Temp max: " + Math.round(Math.max(...tempMax)) + " °C ";

    const minTempDay = document.createElement("span");
    minTempDay.classList.add("pb-2");
    minTempDay.textContent =
      "Temp min: " + Math.round(Math.min(...tempMin)) + " °C ";

    const weatherIconDay = document.createElement("img");
    weatherIconDay.src = getWeatherIcon(mainWeather);

    dayContainer.appendChild(weatherIconDay);
    dayContainer.appendChild(maxTempDay);
    dayContainer.appendChild(minTempDay);
  }
}

cityBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    dataWeather(cityBox.value);
    cityBox.value = "";
    const cont = document.getElementById("container");
    cont.classList.add("border");
  }
});
