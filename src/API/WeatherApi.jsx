import React, { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import clearSky from "../Img/clear-sky.png";
import clouds from "../Img/clouds.png";
import cloudy from "../Img/cloudy.png";
import drizzle from "../Img/drizzle.png";
import fog from "../Img/fog.png";
import p_cloudy from "../Img/partly-cloudy.png";
import rain from "../Img/rain.png";
import snow from "../Img/snow.png";
import storm from "../Img/storm.png";
import sun from "../Img/sun.png";
import windy from "../Img/windy.png";
import thunderstorm from "../Img/thunderstorm.png";
import sleet from "../Img/sleet.png";
import snowflake from "../Img/snowflake.png";
import "../App.css";

// Define a mapping from weather conditions to image paths
const weatherImages = {
  Clear: clearSky,
  "Partly cloudy": p_cloudy,
  Cloudy: cloudy,
  Overcast: clouds,
  Rain: rain,
  Snow: snow,
  Storm: storm,
  Fog: fog,
  "Light rain shower": drizzle,
  Wind: windy,
  Sunny: sun,
  "Patchy rain possible": drizzle,
  "Patchy rain nearby": drizzle,
  Mist: fog,
  "Patchy snow possible": snow,
  "Patchy sleet possible": snow,
  "Patchy freezing drizzle possible": drizzle,
  "Thundery outbreaks possible": thunderstorm,
  "Blowing snow": snow,
  Blizzard: snow,
  "Freezing fog": fog,
  "Patchy light drizzle": drizzle,
  "Light drizzle": drizzle,
  "Freezing drizzle": drizzle,
  "Heavy freezing drizzle": drizzle,
  "Patchy light rain": rain,
  "Light rain": rain,
  "Moderate rain at times": rain,
  "Moderate rain": rain,
  "Heavy rain at times": rain,
  "Heavy rain": rain,
  "Light freezing rain": rain,
  "Moderate or heavy freezing rain": rain,
  "Light sleet": sleet,
  "Moderate or heavy sleet": sleet,
  "Patchy light snow": sleet,
  "Light snow": snow,
  "Patchy moderate snow": snow,
  "Moderate snow": snow,
  "Patchy heavy snow": snow,
  "Heavy snow": snow,
  "Ice pellets": snowflake,
  "Moderate or heavy rain shower": rain,
  "Torrential rain shower": rain,
  "Light sleet showers": snowflake,
  "Moderate or heavy sleet showers": snowflake,
  "Light snow showers": snow,
  "Moderate or heavy snow showers": snow,
  "Light showers of ice pellets": snow,
  "Moderate or heavy showers of ice pellets": snowflake,
  "Patchy light rain with thunder": storm,
  "Moderate or heavy rain with thunder": storm,
  "Patchy light snow with thunder": storm,
  "Moderate or heavy snow with thunder": storm,
};

export default function WeatherApi() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response1 = await fetch("https://ipapi.co/json/");
        if (!response1.ok) {
          throw new Error("Error fetching initial data");
        }
        const data1 = await response1.json();

        const city = data1.city;
        fetchWeatherDetails(city);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  const fetchWeatherDetails = async (city) => {
    try {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=db3b549960994f87ac5143034243107&q=${city}`;
      const response2 = await fetch(apiUrl);
      if (!response2.ok) {
        throw new Error("Error fetching weather details");
      }
      const data2 = await response2.json();
      setWeatherData(data2);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (location) {
      setLoading(true);
      fetchWeatherDetails(location);
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const conditionText = weatherData?.current.condition.text;
  const imageSrc = weatherImages[conditionText] || sun;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }} id="weather">
      <h1>Weather Information</h1>
      <img
        src={imageSrc}
        alt={conditionText}
        style={{ width: "300px", height: "auto", marginBottom: "20px" }}
      />
      {weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2> <h2>{weatherData.location.country}</h2>
          <h5>{weatherData.location.localtime}</h5>
          <p>{conditionText}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} kph</p>
          <p>Feels like: {weatherData.current.feelslike_c}°C</p>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter City To Check Weather"
            />
            <br />
            <button
              type="submit"
              style={{ backgroundColor: "cyan", color: "white", border: "0", padding: "4px" }}
            >
              Get Weather
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
