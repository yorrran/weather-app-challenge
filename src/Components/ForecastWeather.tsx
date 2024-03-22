import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "@/styles/forecastweather.less";
import ForecastListItem from "./ForecastListItem";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { convertToDays } from "@/utils/TempConverter";
import { ICurrentWeather } from "@/interfaces/weather";
import { Spin } from "antd";

function Forecast() {
  const [forecastWeather, setForecastWeather] = useState({});
  const [date, setDate] = useState("");
  const forecastData: Array<ICurrentWeather> = useSelector(
    (state: RootState) => state.forecastSlice.list
  );
  const loading = useSelector(
    (state: RootState) => state.loadingSlice.forecastLoading
  );

  useEffect(() => {
    const res: any = convertToDays(forecastData);
    setForecastWeather(res);
  }, [forecastData]);

  return (
    <div className="forecast-weather-wrapper">
      <div className="forecast-weather-title">5-day Forecast(3 hours)</div>
      <div className="forecast-weather-information">
        <Spin spinning={loading}>
          {forecastWeather &&
            Object.keys(forecastWeather as { [key: string]: any }).map(
              (forecastKey: string, index: number) => (
                <ForecastListItem
                key={forecastKey}
                  props={
                    (forecastWeather as { [key: string]: any })[forecastKey]
                  }
                />
              )
            )}
        </Spin>
      </div>
    </div>
  );
}

export default Forecast;
