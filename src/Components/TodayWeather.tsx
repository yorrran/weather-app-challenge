import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "@/styles/todayweather.less";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { tempConverter, visibilityConverter } from "@/utils/TempConverter";
import { Spin } from "antd";
import arrow from "@/assets/cc-arrow-up.svg";
function TodayWeather() {
  const [iconUrl, setIconUrl] = useState("");
  const weatherData = useSelector((state: RootState) => state.weatherSlice);
  const [date, setDate] = useState("");
  const loading = useSelector(
    (state: RootState) => state.loadingSlice.currLoading
  );

  useEffect(() => {
    const todayDate = dayjs().format("MMMM DD, YYYY");
    setDate(todayDate);
  }, []);

  useEffect(() => {
    const weatherUrl = `https://openweathermap.org/img/wn/${
      weatherData.weather[0] ? weatherData.weather[0].icon : "10d"
    }@2x.png`;
    setIconUrl(weatherUrl);
  }, [weatherData]);

  const getStyle = (degree: number) => {
    const rotateValue = `rotate(${degree}deg)`;
    const customStyle = {
      transform: rotateValue,
      width: "1rem",
      height: "1rem",
    };
    return customStyle;
  };

  return (
    <div className="today-weather-wrapper">
      <Spin spinning={loading}>
        <span className="today-weather-title">{date}</span>
        <div className="today-weather-middle">
          <img src={iconUrl} className="weather-icon" alt="weather-icon" />
          <div className="weather-information">
            <span className="weather-degree">
              {weatherData.main.temp ? tempConverter(weatherData.main.temp) : 0}
              &deg;
            </span>
            <span className="weather-description">
              {weatherData.weather[0]
                ? weatherData.weather[0].description
                : "Broken Clouds"}
            </span>
          </div>
        </div>
        <div className="today-weather-bottom">
          <div className="list-item-wrapper">
            <div className="list-item-title">Humidity</div>
            <div className="list-item-value">
              {weatherData.main.humidity ?? 0}%
            </div>
          </div>
          <div className="list-item-wrapper">
            <div className="list-item-title">Winds</div>
            <div className="list-item-value">
              <img src={arrow} style={getStyle(weatherData.wind.deg)} alt="arrow-icon" />
              <span className="list-item-right">{weatherData.wind.speed ?? 0} m/s</span>
            </div>
          </div>
          <div className="list-item-wrapper">
            <div className="list-item-title">Visibility</div>
            <div className="list-item-value">
              {weatherData.visibility
                ? visibilityConverter(weatherData.visibility)
                : "0km"}
            </div>
          </div>
        </div>
      </Spin>
    </div>
  );
}

export default TodayWeather;
