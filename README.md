# weather_dashboard

// Weather 
// ========
// Using two APIs from openweathermap.org
//  1) Current Weather API - just need to get the latitude and longitude, pass in city name 
//  2) One Call API - pass in the latitude and longitude you received from the Current Weather API, pass in 'exclude' parameter for minutely, hourly, and alerts (we only need current and daily), then pass in units and specify 'imperial'
// HTML
- Search field for city name and a search button or icon
- A list of past city searches
- Current Weather info
- 5-day Forecast
<div>
  <h2 class='city-name'></h2>
  <h3 class='current-date'></h3>
  <p>Temp: <span class='current-temp'></span></p>
  <p>Humidity: <span class='humidity'></span></p>
  <p>Wind speed: <span class='wind-speed'></span></p>
  <p>UV Index: <span class='uv-index'></span></p>
</div>
// Javascript
- Get a reference to the search button and assign a click event listener to it
  - The function that will be called should do the following
    a) Get the value of the search field (city name)
    b) Call the Current Weather API and pass in the city name
    c) Call the One Call API ans pass in the latitude and longitude, the exlude, and the units
    d) Then display the data for Current Weather and 5-day Forecast
  <input type="text" class='search-field' placeholder='Enter name of city' /> <button type='button' class='search-button'>Search</button>  
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
    $currentDate.text(correctedDate) // Use moment() to convert this to Month, date, and year
    $currentTemp.text(weatherData.temp);
    $humidity.text(weatherData.humidity);
    $windSpeed.text(weatherData.wind_speed);
    $uvIndex.text(weatherData.uvi);
  }
  function displayFiveDayForecast(weatherData) {
    // TODO: Jin to implement
  }
  $searchBtn.on('click', function() {
    let latAndLong;
    // TODO: Get the value of the search field (city name)
    cityName = $searchField.val();
    // TODO: Call the Current Weather API and pass in the city name
    latAndLong = getLatAndLong(cityName);
    // TODO: Call the One Call API ans pass in the latitude and longitude, the exlude, and the units
    getWeatherData(latAndLong.lat, latAndLon.lon);
    // TODO: Then display the data for Current Weather and 5-day Forecast    
  });
  // OTHER TODOS:
  // function to save list of past searches to local storage
  // function to retrieve list of past searches from local storage and display them on the list under the Search field
  