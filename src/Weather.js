import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=de464205d7ab89e3886c48925b7e3380`
      );
      setWeatherData(response.data);
      console.log(response.data); //Andmed konsoolis
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const toDateFunction = () => {
    const months = [
      "Jaanuar",
      "Veebruar",
      "Märts",
      "Aprill",
      "Mai",
      "Juuni",
      "Juuli",
      "August",
      "September",
      "Oktoober",
      "November",
      "Detsember",
    ];
    const WeekDays = [
      "Pühapäev",
      "Esmaspäev",
      "Teisipäev",
      "Kolmapäev",
      "Neljapäev",
      "Reede",
      "Laupäev",
    ];
    const currentDate = new Date();
    const date = `${WeekDays[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };
  return (
    <div>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          style={{ width: "300px", height: "30px", paddingBottom: "20px" }}
          type="text"
          placeholder="Linna nimi"
          value={city}
          onChange={handleInputChange}
        />
        <button className="btn" type="submit">
          Vaata ilma
        </button>
      </form>
      {weatherData ? (
        <>
          <div className="date">
            <span>{toDateFunction()}</span>
          </div>
          <div className="city-name">
            <h2>
              {weatherData.name}, <span>{weatherData.sys.country}</span>
            </h2>
          </div>
          <div className="box">
            <div className="icon-temp">
              <img
                className=""
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              {Math.round(weatherData.main.temp)}
              <sup className="deg">°C</sup>
            </div>
            <div className="des-wind">
              <p>Tuule kiirus : {weatherData.wind.speed}m/s</p>
              <p>Õhuniiskus : {weatherData.main.humidity}%</p>
              <p>Rõhk : {weatherData.main.pressure}</p>
            </div>
          </div>
        </>
      ) : (
        <p>Laeb ilma andmeid...</p>
      )}
    </div>
  );
};

export default Weather;
