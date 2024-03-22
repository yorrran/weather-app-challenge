import { useEffect, useState } from "react";
import "@/styles/forecastlistitem.less";
import { convertToHour, tempConverter } from "@/utils/TempConverter";
import { IWeather } from "@/interfaces/weather";

function ForecastListItem({ props }: any) {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    setTitle(props.title);
    setData(props.data);
  }, [props]);

  const getIconUrl = (weather: IWeather) => {
    const iconCode = weather ? weather.icon : "10d";
    const res = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return res;
  };

  return (
    <div className="forecast-list-wrapper">
      <div className="forecast-list-title">{title}</div>
      {data &&
        data.map((item: any, index:number) => (
          <div className="forecast-list-content" key={index}>
            <div className="forecast-list-left">
              <span className="forecast-list-time">
                {convertToHour(item.dt_txt)}
              </span>
              <img src={getIconUrl(item.weather[0])} className="weather-icon" />
              <span className="forecast-list-temperature">
                {tempConverter(item.main.temp_min)}&nbsp;/&nbsp;
              </span>
              <span className="forecast-list-temperature">
                {tempConverter(item.main.temp_max)}&deg;C
              </span>
            </div>
            <span className="forecast-list-description">
              {item.weather[0] ? item.weather[0].description : ""}
            </span>
          </div>
        ))}
    </div>
  );
}

export default ForecastListItem;
