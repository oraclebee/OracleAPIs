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

//TODO: Define a mapping from weather conditions to image paths
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
  //TODO: "Light rain shower":drizzle,
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

  // Add more conditions and corresponding images as needed
};

export default function WeatherApi() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        //TODO: Fetch data from the first API
        const response1 = await fetch("https://ipapi.co/json/");
        if (!response1.ok) {
          throw new Error("Error fetching initial data");
        }
        const data1 = await response1.json();

        //TODO: Extract the city value
        const city = data1.city;
        console.log(`City: ${city}`);

        //TODO: Construct the URL for the second API
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=db3b549960994f87ac5143034243107&q=${city}`;

        //TODO: Fetch data from the second API using the constructed URL
        const response2 = await fetch(apiUrl);
        if (!response2.ok) {
          throw new Error("Error fetching weather details");
        }
        const data2 = await response2.json();

        //TODO: Process the data from the second API
        console.log("Weather Details:", data2);
        setWeatherData(data2);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

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

  //TODO: Determine the image source based on the weather condition
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
          <h2>{weatherData.location.name}</h2>
          <p>{conditionText}</p>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} kph</p>
          <p>Feels like: {weatherData.current.feelslike_c}°C</p>
        </div>
      )}
    </div>
  );
}
