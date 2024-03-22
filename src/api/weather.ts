import { IArrayLocation, ICurrentWeather, IForecast } from "@/interfaces/weather";
import request from "./index";

export const getGeoLocation = (location: String) => {
  return request<IArrayLocation>({
    url: "geo/1.0/direct",
    method: "get",
    params: { q: location, limit: 5, appid: process.env.REACT_APP_OPEN_WEATHER }
  });
};

export const getCurrentWeather = (lon: Number, lat: Number) => {
  return request<ICurrentWeather>({
    url: "data/2.5/weather",
    method: "get",
    params: {
      lon,
      lat,
      appid: process.env.REACT_APP_OPEN_WEATHER,
      unit: "metric"
    }
  });
};

export const getForecastWeather = (lon: Number, lat: Number) => {
  return request<IForecast>({
    url: "data/2.5/forecast",
    method: "get",
    params: {
      lon,
      lat,
      appid: process.env.REACT_APP_OPEN_WEATHER,
      unit: "metric"
    }
  });
};
