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

interface IWeather {
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
}

export type IArrayLocation = Array<ILocation>;

export type ILocationResponse = AxiosPromise<AxiosResponse<ILocation>>;
