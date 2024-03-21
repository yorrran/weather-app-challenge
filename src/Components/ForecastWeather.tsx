import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "@/styles/forecastweather.less";
import ForecastListItem from "./ForecastListItem";

function Forecast() {
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="forecast-weather-wrapper">
      <div className="forecast-weather-title">5-day Forecast(3 hours)</div>
      <div className ="forecast-weather-information"><ForecastListItem/></div>
    </div>
  );
}

export default Forecast;
