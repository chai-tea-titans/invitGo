import React, { useState, useEffect } from "react";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then(response => response.json())
      .then(data => {
        setLocation(data);
        const { latitude, longitude } = data;
        const API_KEY = "a2a12f5e1af70c2d839de826515c5e1e";
        const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=imperial`;
        fetch(API_ENDPOINT)
          .then(response => response.json())
          .then(data => {
            setWeatherData(data);
          })
          .catch(error => console.log(error));
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      {location && (
        <div>
          <h2>
            Location: {location.city}, {location.region},{" "}
            {location.country}
          </h2>
        </div>
      )}
      {weatherData && (
        <div>
          <p>{weatherData.main.temp}°F</p>
          <p>{weatherData.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="weather icon"
          />
        </div>
      )}
    </div>
  );
}

export default Weather;
