(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const r of t.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();let u="https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";const i=document.getElementById("cityInput"),c=document.querySelector(".weatherLogo");i.value="";function p(a){switch(a){case"Clouds":return"./src/clouds.png";case"Clear":return"./src/clear.png";case"Drizzle":return"./src/drizzle.png";case"Mist":return"./src/mist.png";case"Rain":return"./src/rain.png";case"Snow":return"./src/snow.png"}}async function y(a){const n=await(await fetch(u+a+"&appid=8d4bdf74ac3444daa0063fb3468f3660")).json();switch(document.querySelector(".weatherLogo").src=n.list[0].weather[0].main,document.getElementById("city").textContent="City : "+n.city.name+" , "+n.city.country,document.getElementById("maxTemp").textContent="Temp max: "+Math.round(n.list[0].main.temp_max)+" °C ",document.getElementById("minTemp").textContent="Temp min: "+Math.round(n.list[0].main.temp_min)+" °C ",document.getElementById("nowTemp").textContent="Temp now: "+Math.round(n.list[0].main.temp)+" °C ",document.getElementById("wind").textContent="Wind : "+n.list[0].wind.speed+" KM/H",document.getElementById("humidity").textContent="Humidity : "+n.list[0].main.humidity+"%",console.log(n),n.list[0].weather[0].main){case"Clouds":c.src="./src/clouds.png";break;case"Clear":c.src="./src/clear.png";break;case"Drizzle":c.src="./src/drizzle.png";break;case"Mist":c.src="./src/mist.png";break;case"Rain":c.src="./src/rain.png";break;case"Snow":c.src="./src/rain.png";break}const o=document.getElementById("forecastContainer");o.innerHTML="";for(let e=0;e<=4;e++){const t=n.list[e*7],r=document.createElement("div");r.className="forecastDay",o.appendChild(r);const d=document.createElement("span");d.textContent="Temp max: "+Math.round(t.main.temp_max)+" °C ";const m=document.createElement("span");m.textContent="Temp min: "+Math.round(t.main.temp_min)+" °C ";const l=document.createElement("img");l.src=p(t.weather[0].main),r.appendChild(l),r.appendChild(d),r.appendChild(m)}}i.addEventListener("keyup",a=>{a.key==="Enter"&&(y(i.value),i.value="")});
