import { AxiosPromise, AxiosResponse } from "axios";
export interface ILocation {
  name: string;
  lat: number;
  lon: number;
}

interface IMain {
  temp: number | undefined;
  humidity: number | undefined;
}

interface IWind {
  speed: number;
  deg: number;
}

export interface IWeather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface ICurrentWeather {
  main: IMain;
  wind: IWind;
  visibility: number;
  weather: Array<IWeather>;
  dt_txt: string;
}

export interface IForecast {
  list: Array<ICurrentWeather>;
}

export type IArrayLocation = Array<ILocation>;
