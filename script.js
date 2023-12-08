const country = document.querySelector("#country")
const button = document.querySelector("#btn")
const buttonGeo = document.querySelector("#btn-geo")
const input = document.querySelector("#input-city")
const city = document.querySelector("#city")
const image = document.querySelector("#image")
const weather = document.querySelector("#weather")
const weatherCont = document.querySelector("#weather-container")
const temperature = document.querySelector("#temperature")
const wind = document.querySelector("#wind-speed")
const humidity = document.querySelector("#humidity")
const windImg = document.querySelector(".windImg")
const humidityImg = document.querySelector(".humidityImg")
const weatherDays = document.querySelector("#weather-days")
const date = document.querySelectorAll(".date")
const temp = document.querySelectorAll(".temp")
const icon = document.querySelectorAll(".icon")
weatherCont.style.display = "none"
weatherDays.style.display = "none"


button.addEventListener("click", ()=>{
    localStorage.clear()
    document.getElementsByClassName("latitude")[0].innerHTML = ""
    document.getElementsByClassName("longitude")[0].innerHTML = ""
    country.removeAttribute("class", "animate")
    weatherCont.removeAttribute("class", "animate")
    weatherDays.removeAttribute("class", "animate")
    image.removeAttribute("class", "animate")
    city.removeAttribute("class", "animate")
        let inputValue = input.value.trim()
            async function getCity(value){
                let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8e8ee2813dcc4be3b69145705230312&q=${value}&days=7`)
                let data = await response.json()
                console.log(data)
                country.setAttribute("class", "animate")
                weatherCont.setAttribute("class", "animate")
                image.setAttribute("class", "animate")
                city.setAttribute("class", "animate")
                weatherDays.setAttribute("class", "animate")
                city.innerHTML = inputValue
                if(data.error && inputValue === ""){
                    city.innerHTML = ""
                    weatherCont.style.display = "none"
                    country.innerHTML = ""
                    image.src = ""
                    weatherDays.style.display = "none"
                    alert("Вы ничего не вводили")
                }else if(data.error){
                    alert("Такого города не существует")
                    city.innerHTML = ""
                    weatherCont.style.display = "none"
                    country.innerHTML = ""
                    image.src = ""
                    input.value = ""
                    weatherDays.style.display = "none"
                }
                for(let i = 0; i <= 6; i++){
                    date[i].innerHTML = data.forecast.forecastday[i].date
                    icon[i].src = "http:" + data.forecast.forecastday[i].day.condition.icon
                    temp[i].innerHTML = Math.round(data.forecast.forecastday[i].day.avgtemp_c) + "<sup>o</sup>C"
                }
                    localStorage.setItem("date1", data.forecast.forecastday[0].date)
                    localStorage.setItem("icon1", "http:" + data.forecast.forecastday[0].day.condition.icon)
                    localStorage.setItem("temp1", Math.round(data.forecast.forecastday[0].day.avgtemp_c) + "<sup>o</sup>C")
    
                    localStorage.setItem("date2", data.forecast.forecastday[1].date)
                    localStorage.setItem("icon2", "http:" + data.forecast.forecastday[1].day.condition.icon)
                    localStorage.setItem("temp2", Math.round(data.forecast.forecastday[1].day.avgtemp_c) + "<sup>o</sup>C")
    
                    localStorage.setItem("date3", data.forecast.forecastday[2].date)
                    localStorage.setItem("icon3", "http:" + data.forecast.forecastday[2].day.condition.icon)
                    localStorage.setItem("temp3", Math.round(data.forecast.forecastday[2].day.avgtemp_c) + "<sup>o</sup>C")
    
                    localStorage.setItem("date4", data.forecast.forecastday[3].date)
                    localStorage.setItem("icon4", "http:" + data.forecast.forecastday[3].day.condition.icon)
                    localStorage.setItem("temp4", Math.round(data.forecast.forecastday[3].day.avgtemp_c) + "<sup>o</sup>C")
    
                    localStorage.setItem("date5", data.forecast.forecastday[4].date)
                    localStorage.setItem("icon5", "http:" + data.forecast.forecastday[4].day.condition.icon)
                    localStorage.setItem("temp5", Math.round(data.forecast.forecastday[4].day.avgtemp_c) + "<sup>o</sup>C")
    
                    localStorage.setItem("date6", data.forecast.forecastday[5].date)
                    localStorage.setItem("icon6", "http:" + data.forecast.forecastday[5].day.condition.icon)
                    localStorage.setItem("temp6", Math.round(data.forecast.forecastday[5].day.avgtemp_c) + "<sup>o</sup>C")
    
                    localStorage.setItem("date7", data.forecast.forecastday[6].date)
                    localStorage.setItem("icon7", "http:" + data.forecast.forecastday[6].day.condition.icon)
                    localStorage.setItem("temp7", Math.round(data.forecast.forecastday[6].day.avgtemp_c) + "<sup>o</sup>C")
                city.innerHTML = data.location.name
                localStorage.setItem("city", data.location.name)
                weatherCont.style.display = "block"
                localStorage.setItem("weatherCont", "block")
                weatherDays.style.display = "flex"
                localStorage.setItem("weatherDays", "flex")
                country.innerHTML = data.location.country
                localStorage.setItem("country", data.location.country)
                image.src = "http:" + data.current.condition.icon
                localStorage.setItem("img", "http:" + data.current.condition.icon)
                weather.innerHTML = data.current.condition.text
                localStorage.setItem("weather", data.current.condition.text)
                temperature.innerHTML = Math.round(data.current.temp_c) + "<sup>o</sup>C"
                localStorage.setItem("temperature", Math.round(data.current.temp_c) + "<sup>o</sup>C")
                wind.innerHTML = Math.round(data.current.wind_kph) + " km/h"
                localStorage.setItem("windText", Math.round(data.current.wind_kph) + " km/h")
                humidity.innerHTML = data.current.humidity + " %" 
                localStorage.setItem("humidityText", data.current.humidity + " %" )
                windImg.style.display = "block"
                localStorage.setItem("wind", "block")
                humidityImg.style.display = "block"
                localStorage.setItem("humidity", "block")
                input.value = ""
            }
            getCity(inputValue)
})

input.addEventListener("focus", () => {
    country.removeAttribute("class", "animate")
    city.removeAttribute("class", "animate")
    weatherCont.removeAttribute("class", "animate")
    weatherDays.removeAttribute("class", "animate")
    image.removeAttribute("class", "animate")      
})

buttonGeo.addEventListener("click", ()=>{
    localStorage.clear()
    country.removeAttribute("class", "animate")
    weatherCont.removeAttribute("class", "animate")
    weatherDays.removeAttribute("class", "amimate")
    image.removeAttribute("class", "animate")
    city.removeAttribute("class", "animate")
    async function geoLocation(){
        let response = await fetch("https://ipgeolocation.abstractapi.com/v1/?api_key=b1069ff1ce9740b29fa73de97d247674")
        let data = await response.json()
        console.log(data)
        city.innerHTML = data.city
        city.setAttribute("class", "animate")
        country.innerHTML = data.country
        country.setAttribute("class", "animate")
        weatherCont.setAttribute("class", "animate")
        weatherDays.setAttribute("class", "animate")
        image.setAttribute("class", "animate")
        weatherDays.style.display = "flex"
        weatherCont.style.display = "block"
        localStorage.setItem("city", data.city)
        localStorage.setItem("country", data.country)
        localStorage.setItem("weatherCont", "block")
        localStorage.setItem("weatherDays", "flex")
        windImg.style.display = "block"
        humidityImg.style.display = "block"
        localStorage.setItem("wind", "block")
        localStorage.setItem("humidity", "block")
        function getTemp(cityName){
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=8e8ee2813dcc4be3b69145705230312&q=${cityName}&days=7`)
            .then(res => res.json())
            .then(getData =>{
                console.log(getData)
                for(let i = 0; i <= 6; i++){
                    date[i].innerHTML = getData.forecast.forecastday[i].date
                    icon[i].src = "http:" + getData.forecast.forecastday[i].day.condition.icon
                    temp[i].innerHTML = Math.round(getData.forecast.forecastday[i].day.avgtemp_c) + "<sup>o</sup>C"
                }
                localStorage.setItem("date1", getData.forecast.forecastday[0].date)
                localStorage.setItem("icon1", "http:" + getData.forecast.forecastday[0].day.condition.icon)
                localStorage.setItem("temp1", Math.round(getData.forecast.forecastday[0].day.avgtemp_c) + "<sup>o</sup>C")

                localStorage.setItem("date2", getData.forecast.forecastday[1].date)
                localStorage.setItem("icon2", "http:" + getData.forecast.forecastday[1].day.condition.icon)
                localStorage.setItem("temp2", Math.round(getData.forecast.forecastday[1].day.avgtemp_c) + "<sup>o</sup>C")

                localStorage.setItem("date3", getData.forecast.forecastday[2].date)
                localStorage.setItem("icon3", "http:" + getData.forecast.forecastday[2].day.condition.icon)
                localStorage.setItem("temp3", Math.round(getData.forecast.forecastday[2].day.avgtemp_c) + "<sup>o</sup>C")

                localStorage.setItem("date4", getData.forecast.forecastday[3].date)
                localStorage.setItem("icon4", "http:" + getData.forecast.forecastday[3].day.condition.icon)
                localStorage.setItem("temp4", Math.round(getData.forecast.forecastday[3].day.avgtemp_c) + "<sup>o</sup>C")

                localStorage.setItem("date5", getData.forecast.forecastday[4].date)
                localStorage.setItem("icon5", "http:" + getData.forecast.forecastday[4].day.condition.icon)
                localStorage.setItem("temp5", Math.round(getData.forecast.forecastday[4].day.avgtemp_c) + "<sup>o</sup>C")

                localStorage.setItem("date6", getData.forecast.forecastday[5].date)
                localStorage.setItem("icon6", "http:" + getData.forecast.forecastday[5].day.condition.icon)
                localStorage.setItem("temp6", Math.round(getData.forecast.forecastday[5].day.avgtemp_c) + "<sup>o</sup>C")

                localStorage.setItem("date7", getData.forecast.forecastday[6].date)
                localStorage.setItem("icon7", "http:" + getData.forecast.forecastday[6].day.condition.icon)
                localStorage.setItem("temp7", Math.round(getData.forecast.forecastday[6].day.avgtemp_c) + "<sup>o</sup>C")

                image.src = "http:" + getData.current.condition.icon
                localStorage.setItem("img", "http:" + getData.current.condition.icon)
                weather.innerHTML = getData.current.condition.text
                localStorage.setItem("weather", getData.current.condition.text  )
                temperature.innerHTML = Math.round(getData.current.temp_c) + "<sup>o</sup> C"
                localStorage.setItem("temperature", Math.round(getData.current.temp_c) + "<sup>o</sup> C")
                wind.innerHTML = Math.round(getData.current.wind_kph) + " km/h"
                localStorage.setItem("windText", Math.round(getData.current.wind_kph) + " km/h")
                humidity.innerHTML = getData.current.humidity + " %"
                localStorage.setItem("humidityText", getData.current.humidity + " %")
            })
        }
        getTemp(city.innerHTML)
    }

    geoLocation()
    function getPosition(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition)
        }else{
            alert("Геолокация не поддерживается")
        }
    }
    function showPosition(position){
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        document.getElementsByClassName("latitude")[0].innerHTML = "Latitude: " + lat
        document.getElementsByClassName("longitude")[0].innerHTML = "Longitude: " + lon
        localStorage.setItem("latitude", "Latitude: " + lat)
        localStorage.setItem("longitude", "Longitude: " + lon)
    }
    getPosition()
    
})
city.innerHTML = localStorage.getItem("city")
country.innerHTML = localStorage.getItem("country")
weatherCont.style.display = localStorage.getItem("weatherCont")
weatherDays.style.display = localStorage.getItem("weatherDays")
image.src = localStorage.getItem("img")
weather.innerHTML = localStorage.getItem("weather")
temperature.innerHTML = localStorage.getItem("temperature")
windImg.style.display = localStorage.getItem("wind")
humidityImg.style.display = localStorage.getItem("humidity")
wind.innerHTML = localStorage.getItem("windText")
humidity.innerHTML = localStorage.getItem("humidityText")
date[0].innerHTML = localStorage.getItem("date1")
icon[0].src = localStorage.getItem("icon1")
temp[0].innerHTML = localStorage.getItem("temp1")

date[1].innerHTML = localStorage.getItem("date2")
icon[1].src = localStorage.getItem("icon2")
temp[1].innerHTML = localStorage.getItem("temp2")

date[2].innerHTML = localStorage.getItem("date3")
icon[2].src = localStorage.getItem("icon3")
temp[2].innerHTML = localStorage.getItem("temp3")

date[3].innerHTML = localStorage.getItem("date4")
icon[3].src = localStorage.getItem("icon4")
temp[3].innerHTML = localStorage.getItem("temp4")

date[4].innerHTML = localStorage.getItem("date5")
icon[4].src = localStorage.getItem("icon5")
temp[4].innerHTML = localStorage.getItem("temp5")

date[5].innerHTML = localStorage.getItem("date6")
icon[5].src = localStorage.getItem("icon6")
temp[5].innerHTML = localStorage.getItem("temp6")

date[6].innerHTML = localStorage.getItem("date7")
icon[6].src = localStorage.getItem("icon7")
temp[6].innerHTML = localStorage.getItem("temp7")
document.getElementsByClassName("latitude")[0].innerHTML = localStorage.getItem("latitude")
document.getElementsByClassName("longitude")[0].innerHTML = localStorage.getItem("longitude")