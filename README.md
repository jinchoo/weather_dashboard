# weather_dashboard


Introduction
*  As a student developer, the project was to build a Weather Dashboard.

Table of Contents:
1.  Description
2.  Techologies
3.  SetUp

Description:

1. Using two APIs from openweathermap.org
  * Current Weather API - just need to get the latitude and longitude, pass in city name 
  * One Call API - pass in the latitude and longitude you received from the Current Weather API, pass in 'exclude' parameter for minutely, hourly, and alerts (we only need current and daily), then pass in units and specify 'imperial'

2.  HTML
  * Search field for city name and a search button or icon
  * A list of past city searches
  * Current Weather info
  * 5-day Forecast

3.  Javascript
  * Get a reference to the search button and assign a click event listener to it
  * The function that will be called should do the following
    * Get the value of the search field (city name)
    * Call the Current Weather API and pass in the city name
    * Call the One Call API ans pass in the latitude and longitude, the exlude, and the units
    * Then display the data for Current Weather and 5-day Forecast

4.  Function that retrieves the latitude and longitude for a city
  * Use $.ajax() to make a call to the Current Weather API
  * Get the value of the search field (city name)
  * Call the Current Weather API and pass in the city name
  * Call the One Call API ans pass in the latitude and longitude, the exlude, and the units

5.  Then display the data for Current Weather and 5-day Forecast    
6.  Function to save list of past searches to local storage
7.  Function to retrieve list of past searches from local storage and display them on the list under the Search field

Technologies:
1.  HTML 5
2.  CSS 3
3.  JavaScript
4.  Bootstrap
5.  jQuery
6.  VS-Code Editor
7.  Github Repository

Set-up:
*  Right click the file index.html.  
 