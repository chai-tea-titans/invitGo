import React, { useState, useEffect } from "react";

const API_KEY = "a2a12f5e1af70c2d839de826515c5e1e";
const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      fetch(`${API_ENDPOINT}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setLoading(false);
        })
        .catch(error => console.log(error));
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{weatherData.name}</h1>
      <p>Current Temperature: {weatherData.main.temp}</p>
      <p>Weather Description: {weatherData.weather[0].description}</p>
    </div>
  );
}

export default Weather;
