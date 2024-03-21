import dayjs from "dayjs";
import { useEffect, useState } from "react";
import weatherIcon from "@/assets/weather-icon.png";
import "@/styles/forecastlistitem.less";

function ForecastListItem() {
  const [inputValue, setInputValue] = useState("");
  const [date, setDate] = useState("");

  return (
    <div className="forecast-list-wrapper">
      <div className="forecast-list-title">Today</div>
      <div className="forecast-list-content">
        <div className="forecast-list-left">
          <span className="forecast-list-time">8:00</span>
          <img src={weatherIcon} className="weather-icon" />
          <span className="forecast-list-temperature">25.35&nbsp;/&nbsp;</span>
          <span className="forecast-list-temperature">25.22&deg;C</span>
        </div>
        <span className="forecast-list-description">moderate rain</span>
      </div>
    </div>
  );
}

export default ForecastListItem;
