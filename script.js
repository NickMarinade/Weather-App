let searchInput = document.querySelector('.weatherSearch');
let city = document.querySelector('.weatherCity');
let day = document.querySelector('.weatherDay');
let image = document.querySelector('.weatherImage');
let temperature = document.querySelector('.weatherTemperature');
let forecastDay = document.querySelectorAll('.weatherForecastDay');
let forecastTemperature = document.querySelectorAll('.weatherForecastTemperature');


let weatherApiKey = '94a0709f1e11021571d0d86134cebd6d';
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherApiKey;
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+ weatherApiKey;

// let weatherImages = [
//     {
//         url: 'images/sun.png',
//         ids: [800]
//     },
//     {
//         url: 'images/broken_cloudsT.png',
//         ids: [803, 804, 500, 501, 502, 503, 504]
//     },
//     {
//         url: 'images/cloudsT.png',
//         ids: [801]
//     },
//     {
//         url: 'images/cloudT.png',
//         ids: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781, 802]
//     },
//     {
//         url: 'images/hard_rain.png',
//         ids: [500, 501, 502, 503, 504, 520, 521, 300, 302, 311, 312, 313, 314, 321]
//     },
//     {
//         url: 'images/storm.png',
//         ids: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232]
//     },
//     {
//         url: 'images/snow.png',
//         ids: [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622]
//     }
// ]

let getWeatherByCityName = async (city) => {
    let endpoint = weatherBaseEndpoint + '&q=' + city;
    let response = await fetch(endpoint);
    let weather = await response.json();

    return weather;
};

let getForecastByCityId = async (id) => {
    let endpoint = forecastBaseEndpoint + '&id=' +id;
    let result = await fetch(endpoint);
    let forecast = await result.json();
    let forecastList = forecast.list;
    let daily = [];

    forecastList.forEach(day => {
        let date = new Date(day.dt_txt.replace(" ", 'T'));
            let hours = date.getHours();
        if (hours === 12) {
            daily.push(day);
        }
    })
    console.log(daily)
    return daily;
};

searchInput.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInput.value);
        let cityId = weather.id;
        updateCurrentWeather(weather); 
        let forecast = await getForecastByCityId(cityId);
        updateForecast(forecast);
    }
});

let updateCurrentWeather = (data) => {
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    temperature.textContent = data.main.temp > 0 ? '+' + Math.round(data.main.temp) : Math.round(data.main.temp);
};

let updateForecast = (data) => {
   for (let i=0; i<forecastTemperature.length; i++) {
    forecastTemperature[i].textContent = data[i].main.temp > 0 ? '+' + Math.round(data[i].main.temp) : Math.round(data[i].main.temp);
   };

   for (let i=0; i<forecastDay.length; i++) {

    let date = new Date(data[i].dt_txt)
    let formattedDate = date.toLocaleDateString("en-Be", {'weekday': "long"})
    forecastDay[i].textContent = formattedDate;

    console.log(formattedDate)

   };
};

let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-BE', {'weekday': 'long'});
};

