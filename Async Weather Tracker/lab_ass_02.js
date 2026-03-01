// this is the JS part of my lab assignment 2 where i am making a weather tracker using async

let API_Key = "84f60acf4132703a2cab1b69d9581e79"

let url = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric"

let city = document.querySelector("#city-name")

let form = document.querySelector("form")

let weather = document.querySelector("#weather-info-box")

let searchedCitiesList = document.querySelector("#searched-cities-list")

async function getweatherinfo(cityName){
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_Key}&units=metric`)
        if(!response.ok) {
            weather.innerHTML = '<div class="error">City not found</div>'
            return
        }
        let data = await response.json()
        let listItem = document.createElement("li")

        // build table for weather info
        let html = `<table>
            <tr><td class="label">City</td><td>${data.name}, ${data.sys.country}</td></tr>
            <tr><td class="label">Temp</td><td>${data.main.temp.toFixed(1)} °C</td></tr>
            <tr><td class="label">Weather</td><td>${data.weather[0].main}</td></tr>
            <tr><td class="label">Humidity</td><td>${data.main.humidity}%</td></tr>
            <tr><td class="label">Wind</td><td>${data.wind.speed} m/s</td></tr>
        </table>`

        weather.innerHTML = html

        // Store cities in array
        let cities = JSON.parse(localStorage.getItem("Cities") || "[]")
        if(!cities.includes(cityName)) {
            cities.push(cityName)
            localStorage.setItem("Cities", JSON.stringify(cities))
        }

        listItem.textContent = cityName
        listItem.addEventListener('click', () => getweatherinfo(cityName))
        searchedCitiesList.append(listItem)
    } catch(error) {
        console.error("Error:", error)
        alert("Error fetching weather data")
    }
}

// Load stored cities on page load
let storedCities = JSON.parse(localStorage.getItem("Cities") || "[]")
if(storedCities.length > 0){
    storedCities.forEach(cityName => {
        let listItem = document.createElement("li")
        listItem.textContent = cityName
        listItem.addEventListener('click', () => getweatherinfo(cityName))
        searchedCitiesList.append(listItem)
    })
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if(city.value.trim()) {
        getweatherinfo(city.value.trim())
        city.value = ""
    }
})