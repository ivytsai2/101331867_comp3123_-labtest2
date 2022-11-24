# Comp3123 Lab Test2
## by Hsin Yu Ivy Tsai - 101331867

WeatherForecast5DaysList.js is where I used axios to access REST API,
and passed relevent data to its children (WeatherForecast1Day.js and CurrentWeather.js files).
A city search bar is added on top for users to change city and the city's weather forecast will be displayed.

CurrentWeather.js contains the component of current weather data and html.

WeatherForecast1Day.js contains the component of 1 day weather forecast data and html.
This component is being mapped from WeatherForecast5DaysList.js, so the same logic and html 
applies to all 1 day weather forecast data.
For the 5 days weather forecast, it contains data for every 3 hours thus total of 40 sets of data.
However, only 4 sets of data are being displayed. I excluded current date's forecast and picked
the next 4 days with the estimated weather forecast time of 12:00:00. 
This estimated time is referred to the "dt_txt" respond attribute.
Please check https://openweathermap.org/forecast5 for more details.