$("#input-city").on("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btn-search").click();
    }
});

$("#city-list").on("click", function (event) {
    event.preventDefault();
    var city = event.target.innerHTML;
    getCityWeather(city);

});

$("#btn-search").on("click", function (event) {
    
    event.preventDefault();

    var inputCity = $("#input-city").val().trim().toLowerCase();

    if (inputCity === "") {
        alert("Must enter city!");
       
    } else {

        var cityList = localStorage.getItem("cityList");
        var cities;

        if (cityList != "") {
            cities = JSON.parse(localStorage.getItem("cityList"));
        }
        console.log(cityList);

        
        var citiesAry = [];
        for (key in cities) {
            citiesAry.push(cities[key]);
        }
        console.log(citiesAry);
        for (i = 0; i < citiesAry.length; i++) {
            if (inputCity === citiesAry[i]) {
                citiesAry.splice(i, 1);
            }
        }
        console.log(citiesAry);
        
        citiesAry.unshift(inputCity);
        console.log(citiesAry);
        
        $("#city-list").empty();

        
        $("#city-section").attr("class", "card");

        
        for (i = 0; i < citiesAry.length; i++) {

            var $cityListItem = $("<li class='list-group-item'>");
            $cityListItem.append(citiesAry[i]);

            $("#city-list").append($cityListItem);
        }

        

        for (i = 0; i < citiesAry.length; i++) {
            citiesJson[i] = citiesAry[i];
        }

        console.log(citiesJson);

        localStorage.setItem("cityList", JSON.stringify(citiesJson));
        
        getCityWeather(inputCity);
    }

});

//function for date
function formatDate(millis) {
    var now = new Date(millis);
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var formattedDate = (month) + "/" + (day) + "/" + now.getFullYear();
    return (formattedDate);
}
//function to get data for current city
function getCityWeather(inputCity) {
    
    var query1day = "http://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&appid=513af3de6beb84fb3eb34fb681d375e8=imperial";
    
    var currentLat = 0;
    var currentLon = 0;
    //pulling the variables from the html
    var currentCity = document.getElementById("currentCity");
    var currentTemp = document.getElementById("currentTemp");
    var currentHum = document.getElementById("currentHumidity");
    var currentWind = document.getElementById("currentWindSpeed");
    var currentUV = document.getElementById("currentUVIndex");

    
    $.ajax({
        url: query1day,
        method: "GET"

    }).then(function (response) {

        
        console.log(response);
        var cityWeather = response;

        var now = new Date();
        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);
        var today = (month) + "/" + (day) + "/" + now.getFullYear();
        console.log(cityWeather);
        var weather = cityWeather.weather[0].main;
        var weatherIcon;

        if (weather === "Clear") {
            weatherIcon = "<span class='fa fa-sun-o'></span></i> ";
        }
        if (weather === "Clouds") {
            weatherIcon = "<span class='fa fa-cloud'></span>";
        }
        if (weather === "Rain") {
            weatherIcon = "<span class='fa fa-bolt'></span>";
        }
        currentCity.innerHTML = cityWeather.name + " (" + today + ")" + weatherIcon;

        
        currentLat = cityWeather.coord.lat;
        currentLon = cityWeather.coord.lon;
        console.log(currentLat);
        console.log(currentLon);
       
        var query5day = "https://api.openweathermap.org/data/2.5/onecall?lat=" + currentLat + "&lon=" + currentLon + "&units=imperial&exclude=hourly,minutely,alerts&appid=513af3de6beb84fb3eb34fb681d375e8";
        
        $.ajax({
            url: query5day,
            method: "GET"

           
        }).then(function (response) {
            var cityWeather = response;
            currentTemp.textContent = "Temperature: " + cityWeather.current.temp.toFixed(1) + " \xB0F";
            currentHum.textContent = "Humidity: " + cityWeather.current.humidity + "%";
            currentWind.textContent = "Wind Speed: " + cityWeather.current.wind_speed.toFixed(1) + " mph";
            // currentUV.textContent = "UV Index: " + cityWeather.current.uvi.toFixed(1);
            var uvIndex = cityWeather.current.uvi.toFixed(1);
            currentUV.innerHTML = "&nbsp" + uvIndex + "&nbsp";
            if (uvIndex < 3) { currentUV.style.backgroundColor = "#98f58e"; }
            if (uvIndex >= 2 && uvIndex < 6) { currentUV.style.backgroundColor = "#ffc56e"; }
            if (uvIndex >= 6) {
                currentUV.style.backgroundColor = "#ff4942";
                currentUV.style.color = "white";
            }

            $("#forecast-cards").empty();


           
            for (i = 1; i < 6; i++) {
                var $forecastCol = $("<div class='col-sm'>");
                var $forecastCard = $("<div class='card forecast'>");
                $forecastCard.append("<span><strong>" + formatDate(cityWeather.daily[i].dt * 1000) + "</strong></span>");
                $forecastCard.append("<span><strong>Temp:</strong> " + cityWeather.daily[i].temp.day.toFixed(1) + " \xB0F</span");
                $forecastCard.append("<span><strong>Humidity:</strong> " + cityWeather.daily[i].humidity.toFixed(0) + " %</span>");
                $forecastCol.append($forecastCard);
                $("#forecast-cards").append($forecastCol);
            }
        }); 
    }); 
}; 

$(function () {

    var cityList = localStorage.getItem("cityList");
    var cities;

    console.log(cityList);

    if (cityList != "") {
        cities = JSON.parse(localStorage.getItem("cityList"));

        // Create an array to store cities in.
        var citiesAry = [];
        for (key in cities) {
            citiesAry.push(cities[key]);
        }
        
        $("#city-list").empty();

        
        $("#city-section").attr("class", "card");

        
        for (i = 0; i < citiesAry.length; i++) {

            var $cityListItem = $("<li class='list-group-item'>");
            $cityListItem.append(citiesAry[i]);

            $("#city-list").append($cityListItem);
        }

       
        var citiesJson = {};

        for (i = 0; i < citiesAry.length; i++) {
            citiesJson[i] = citiesAry[i];
        }

        getCityWeather(citiesAry[0]);
        console.log(citiesAry[0]);
    }

});