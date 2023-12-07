const country = document.querySelector("#country")
const tempIcon = document.querySelector("#temp-icon")
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
weatherCont.style.display = "none"


button.addEventListener("click", ()=>{
    localStorage.clear()
    document.getElementsByClassName("latitude")[0].innerHTML = ""
    document.getElementsByClassName("longitude")[0].innerHTML = ""
    country.removeAttribute("class", "animate")
    weatherCont.removeAttribute("class", "animate")
    image.removeAttribute("class", "animate")
    city.removeAttribute("class", "animate")
        let inputValue = input.value.trim()
            async function getCity(value){
                let response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8e8ee2813dcc4be3b69145705230312&q=${value}}`)
                let data = await response.json()
                console.log(data)
                country.setAttribute("class", "animate")
                weatherCont.setAttribute("class", "animate")
                image.setAttribute("class", "animate")
                city.setAttribute("class", "animate")
                city.innerHTML = inputValue
                if(data.error && inputValue === ""){
                    city.innerHTML = ""
                    weatherCont.style.display = "none"
                    country.innerHTML = ""
                    image.src = ""
                    alert("Вы ничего не вводили")
                }else if(data.error){
                    city.innerHTML = ""
                    weatherCont.style.display = "none"
                    country.innerHTML = ""
                    image.src = ""   
                    alert("Такого города не существует")
                }
                city.innerHTML = data.location.name
                localStorage.setItem("city", data.location.name)
                weatherCont.style.display = "block"
                localStorage.setItem("weatherCont", "block")
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
            }
            getCity(inputValue)
})

input.addEventListener("focus", () => {
    country.removeAttribute("class", "animate")
    city.removeAttribute("class", "animate")
    weatherCont.removeAttribute("class", "animate")
    image.removeAttribute("class", "animate")          
})

buttonGeo.addEventListener("click", ()=>{
    country.removeAttribute("class", "animate")
    weatherCont.removeAttribute("class", "animate")
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
        image.setAttribute("class", "animate")
        weatherCont.style.display = "block"
        localStorage.setItem("city", data.city)
        localStorage.setItem("country", data.country)
        localStorage.setItem("weatherCont", "block")
        windImg.style.display = "block"
        humidityImg.style.display = "block"
        localStorage.setItem("wind", "block")
        localStorage.setItem("humidity", "block")
        function getTemp(cityName){
            fetch(`https://api.weatherapi.com/v1/current.json?key=8e8ee2813dcc4be3b69145705230312&q=${cityName}`)
            .then(res => res.json())
            .then(getData =>{
                console.log(getData)
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
        localStorage.setItem("latitude",document.getElementsByClassName("latitude")[0].innerHTML = "Latitude: " + lat)
        localStorage.setItem("longitude",document.getElementsByClassName("longitude")[0].innerHTML = "Longitude: " + lon)
    }
    getPosition()
    
})
city.innerHTML = localStorage.getItem("city")
country.innerHTML = localStorage.getItem("country")
weatherCont.style.display = localStorage.getItem("weatherCont")
image.src = localStorage.getItem("img")
weather.innerHTML = localStorage.getItem("weather")
temperature.innerHTML = localStorage.getItem("temperature")
windImg.style.display = localStorage.getItem("wind")
humidityImg.style.display = localStorage.getItem("humidity")
wind.innerHTML = localStorage.getItem("windText")
humidity.innerHTML = localStorage.getItem("humidityText")
localStorage.getItem("latitude")
localStorage.getItem("longitude")

// async function getWeather(city){
//     const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=8e8ee2813dcc4be3b69145705230312&q=${city}`)
//     let data = await response.json()
//     console.log(data)
//     // // button.addEventListener("click", ()=>{
//     // //     async function geoLocation(){
//     // //         const response = await fetch("https://api.db-ip.com/v2/free/self")
//     // //         const data = await response.json()
//     // //         city.innerHTML = data.stateProv
//     // //         country.innerHTML = data.countryName
//     // //         country.setAttribute("class", "animate")
//     // //         tempIcon.setAttribute("class", "animate")
//     // //         city = document.querySelector("#city")
//     // //         city.setAttribute("class", "animate")
//     // //         image.setAttribute("class", "animate")
//     // //     }
//     // //     geoLocation()
//     // })
// }
// getWeather(city)


