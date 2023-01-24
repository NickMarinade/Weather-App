let searchInput = document.querySelector('.weatherSearch');
let city = document.querySelector('.weatherCity');
let day = document.querySelector('.weatherDay');
let image = document.querySelector('.weatherImage');
let temperature = document.querySelector('.weatherTemperature');

let weatherApiKey = '94a0709f1e11021571d0d86134cebd6d';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+ weatherApiKey;

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();

    return weather;
}

searchInput.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInput.value);
        console.log(weather);
    }
})