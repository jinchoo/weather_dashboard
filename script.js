// const settings = {
// 	"async": true,
// 	"crossDomain": true,
// 	"url": "https://community-open-weather-map.p.rapidapi.com/forecast?q=san%20francisco%2Cus",
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "f3e3f420ecmsh744d6652dc05902p13af66jsn68c5d55f813d",
// 		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
// 	}
// };

// $.ajax(settings).done(function (response) {
// 	console.log(response);
// });

const API_KEY = 'askjfkjq3;tjq9g' // Put your API key here
  let $searchBtn = $('.search-button');
  let $searchField = $('.search-field');
  let cityName;
  // Function that retrieves the latitude and longitude for a city
  function getLatAndLong(city) {
    let apiUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + API_KEY;
    let lat;
    let lon;
    // Use $.ajax() to make a call to the Current Weather API
    $.get(apiUrl, function(data, status){
      lat = data.coord.lat;
      lon = data.coord.lon;
      return {
        lat: lat,
        lon: lon
      };
    }); 
  }
  function getWeatherData(lat, lon) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts&units=imperial&appid=' + API_KEY;
    let currentWeatherData;
    let fiveDayForecastData;
    $.get(apiUrl, function(data, status){
      currentWeatherData = data.current;
      fiveDayForecastData = data.daily;
      // TODO: display Current Weather Info
      displayCurrentWeather(currentWeatherData);
      // TODO: display 5-day Forecast
      displayFiveDayForecast(fiveDayForecastData);
    });    
  }
  function displayCurrentWeather(weatherData) {
    // TODO Target the necessary elements for the different wwather info
    let $citeName = $('.city-name');
    let $currentDate = $('.current-date');
    let $currentTemp = $('.current-temp');
    let $humidity = $('.humidity');
    let $windSpeed = $('.wind-speed');
    let $uvIndex = $('.uv-index');
    let correctedDate;
    $cityName.text(cityName);
    correctedDate = moment(weatherData.dt).format() // look up usage using their manual
    //$currentDate.text(correctedDate) // Use moment() to convert this to Month, date, and year
    $currentTemp.text(weatherData.temp);
    $humidity.text(weatherData.humidity);
    $windSpeed.text(weatherData.wind_speed);
    $uvIndex.text(weatherData.uvi);
  }
  function formatDate(millis) {
    var now = new Date(millis);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var formattedDate = (month) + "/" + (day) + "/" + now.getFullYear();
    return (formattedDate);
}

  $("#forecast-cards").empty();

  function displayFiveDayForecast(weatherData) {
	// TODO: Jin to implement
	for (i = 1; i < 6; i++) {
		var $forecastCol = $("<div class='col-sm'>");
		var $forecastCard = $("<div class='card forecast'>");
		$forecastCard.append("<span><strong>" + formatDate(currentWeather.daily[i].dt * 1000) + "</strong></span>");
		$forecastCard.append("<span><strong>Temp:</strong> " + currentWeather.daily[i].temp.day.toFixed(1) + " \xB0F</span");
		$forecastCard.append("<span><strong>Humidity:</strong> " + currentWeather.daily[i].humidity.toFixed(0) + " %</span>");
		$forecastCol.append($forecastCard);
		$("#forecast-cards").append($forecastCol);
	}
  }
  
  $searchBtn.on('click', function() {
    let LatAndLong;
    // TODO: Get the value of the search field (city name)
    cityName = $searchField.val();
    // TODO: Call the Current Weather API and pass in the city name
    latAndLong = getLatAndLong(cityName);
    // TODO: Call the One Call API ans pass in the latitude and longitude, the exlude, and the units
    getWeatherData(latAndLong.lat, latAndLon.lon);
    // TODO: Then display the data for Current Weather and 5-day Forecast    
  });
 
  // //
  // function to save list of past searches to local storage
  // function to retrieve list of past searches from local storage and display them on the list under the Search field
  