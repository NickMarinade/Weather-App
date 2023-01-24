let searchInput = document.querySelector('.weatherSearch');
let city = document.querySelector('.weatherCity');
let day = document.querySelector('.weatherDay');
let image = document.querySelector('.weatherImage');
let temperature = document.querySelector('.weatherTemperature');

let weatherApiKey = '94a0709f1e11021571d0d86134cebd6d';
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+ weatherApiKey;

searchInput.addEventListener('keydown', (e) => {
    console.log(e);
})