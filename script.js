var appId = 'bcb42cafda271a2eb84b45ee3a3200b8';
var units = 'imperial';

function getsearchMethodValidation(searchTerm) {

    if (Number.isInteger(parseInt(searchTerm)) && searchTerm.length === 5) {
        return 'zip';
    } else {
        return 'q';
    }
}
function searchWeather(searchTerm) {
    var searchMethod = getsearchMethodValidation(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
        .then(response => {
            return response.json();
        }).then(response => {
            init(response);
            console.log(response);
        })
        .catch(error => {
            alert("Invalid Zip Code or City Name. Please re-enter a Zip Code or City Name");
        })
}


var apiKey = 'LpGRYoMy3u0jMWSHsqfe8CUWKQ9HtnqT';
var selectPic = '';

var maxIntervalCount = 10;
var thisIntervalCount = 0;
var intervalFunc = null;

var outputContainer = document.getElementsByClassName('output')[0];

async function searchPictures(selectPic) {
    const result = await fetch(`https://api.giphy.com/v1/gifs/search?q=${selectPic}&api_key=${apiKey}&limit=25&`)
        .then(res => res.json())
    if (result) {
        display(result);
    } else {
        alert('No Pics Found');
    }
}
function display(result) {

    // clear interval initially if set
    if (intervalFunc) {
        clearInterval(intervalFunc);
        clearOutputContainer();
    }
    intervalFunc = setInterval(function changePic() {

        thisIntervalCount++;
        var img = document.createElement('img');
        var randomIndex = Math.floor(Math.random() * result.data.length)

        console.log(randomIndex);

        img.src = result.data[randomIndex].images.downsized.url;
        img.style.height = '250px';
        img.style.width = '250px';

        clearOutputContainer();
        outputContainer.appendChild(img);
        if (thisIntervalCount >= maxIntervalCount) {
            clearInterval(intervalFunc);
            resetInterval();

        }

    }, 1000);

}
function resetInterval() {
    thisIntervalCount = 0;
    intervalFunc = null;
}


function init(data) {
    if (data.weather[0].main == 'Clear') {
        document.body.style.backgroundImage = 'url("clear.jpeg")';

        selectPic = 'sun';
    } else if (data.weather[0].main == 'Clouds' || data.weather[0].main == 'smoke' || data.weather[0].main == 'haze' || data.weather[0].main == 'dust' || data.weather[0].main == 'fog' || data.weather[0].main == 'sand' || data.weather[0].main == 'ash' || data.weather[0].main == 'squall') {
        document.body.style.backgroundImage = 'url("cloudy.jpeg")';

        selectPic = 'clouds';
    } else if (data.weather[0].main == 'Rain' || data.weather[0].main == 'Drizzle' || data.weather[0].main == 'Mist') {
        document.body.style.backgroundImage = 'url("rain.jpeg")';

        selectPic = 'rain';
    } else if (data.weather[0].main == 'Snow') {
        document.body.style.backgroundImage = 'url("snow.jpeg")';

        selectPic = 'snow';
    } else if (data.weather[0].main == 'thunderstorm' || data.weather[0].main == 'tornado') {
        document.body.style.backgroundImage = 'url("storm.jpeg")';

        selectPic = 'storm';
    } else {
        Document.body.style.backgroundImage = 'url("default.jpeg")';
    }
    var getcityName = document.getElementById('cityName');
    getcityName.innerHTML = data.name;

    var getTemperature = document.getElementById('temperature');
    getTemperature.innerHTML = Math.floor(data.main.temp) + '&#176' + 'F';

    var getWeatherDescription = document.getElementById('weatherDescription');
    getWeatherDescription.innerHTML = data.weather[0].description;

    var getWeatherIcon = document.getElementById('weatherIcon');
    getWeatherIcon.src = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';

    displayWeatherInfo();
    searchPictures(selectPic);

    // reset selectPic
    selectPic = '';
}
function displayWeatherInfo() {

    var weatherContainer = document.getElementById('weather-container');
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click', () => {

    clearOutputContainer();
    var searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {

        searchWeather(searchTerm);
    } else {

    }
});

function clearOutputContainer() {

    if (outputContainer.hasChildNodes()) {
        outputContainer.removeChild(outputContainer.childNodes[0])
    }

}