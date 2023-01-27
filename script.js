let searchInput = document.querySelector('.weatherSearch');
let city = document.querySelector('.weatherCity');
let day = document.querySelector('.weatherDay');
let image = document.querySelector('.weatherImage');
let temperature = document.querySelector('.weatherTemperature');
let forecastDay = document.querySelectorAll('.weatherForecastDay');
let forecastTemperature = document.querySelectorAll('.weatherForecastTemperature');
let locationIcon = document.querySelector('.weather-icon');
let locationIcons = document.querySelectorAll('.weather-icons');
let unsplash = document.querySelector('.unsplash');
let chartDiv = document.querySelector('.chart');




let weatherApiKey = '94a0709f1e11021571d0d86134cebd6d';
let forecastBaseEndpoint = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=' + weatherApiKey;
let weatherBaseEndpoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+ weatherApiKey;

let chartDays = [];
let chartTemperature = [];
const ctx = document.getElementById('myChart');

let lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        backgroundColor: 'white',
        label: '',
        data: [],
        fill: false,
        borderColor: 'red',
        color: 'white',
        tension: 0.1
      }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
      scales: {
        y: {
            ticks:{
                color: 'white',
            },
          beginAtZero: true
        },
        x: {
            ticks:{
                color: 'white',
            },
        }
      }
    }
  });

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
    return daily;
};

searchInput.addEventListener('keydown', async (e) => {
    if (e.keyCode === 13) {
        let weather = await getWeatherByCityName(searchInput.value);
        let cityId = weather.id;
        updateCurrentWeather(weather); 
        let forecast = await getForecastByCityId(cityId);
        updateForecast(forecast);

        lineChart.data.datasets[0].data = chartTemperature;
        lineChart.data.labels = chartDays;
        lineChart.update();
    
     } else if (e.keyCode === 8) {
        chartDays = [];
        chartTemperature = []
    }

});

searchInput.addEventListener('click', () => {
        chartDays = [];
        chartTemperature = [];
})






let updateCurrentWeather = (data) => {
    city.textContent = data.name + ', ' + data.sys.country;
    day.textContent = dayOfWeek();
    temperature.textContent = data.main.temp > 0 ? '+' + Math.round(data.main.temp) : Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    let place = data.name;
    locationIcon.innerHTML = `<img src="icons/${icon}.png"></img>`;
    document.body.style.backgroundImage = "url('https://source.unsplash.com/2560x1440/?" + place + "')";
};

let updateForecast = (data) => {
   for (let i=0; i<forecastTemperature.length; i++) {
    forecastTemperature[i].textContent = data[i].main.temp > 0 ? '+' + Math.round(data[i].main.temp) : Math.round(data[i].main.temp);
    chartTemperature.push(forecastTemperature[i].textContent = data[i].main.temp > 0 ? '+' + Math.round(data[i].main.temp) : Math.round(data[i].main.temp))
   };

   for (let i=0; i<forecastDay.length; i++) {

    let date = new Date(data[i].dt_txt)
    let formattedDate = date.toLocaleDateString("en-Be", {'weekday': "long"})
    forecastDay[i].textContent = formattedDate;
    chartDays.push(forecastDay[i].textContent = formattedDate);
   };

   for (let i=0; i<locationIcons.length; i++) {
    const icon = data[i].weather[0].icon;
    locationIcons[i].innerHTML = `<img src="icons/${icon}.png"></img>`;
   }
};

let dayOfWeek = () => {
    return new Date().toLocaleDateString('en-BE', {'weekday': 'long'});
};

