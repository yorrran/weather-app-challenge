import "../styles/searchbar.less";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import locationLogo from "../assets/location.svg";
import {
  getCurrentWeather,
  getForecastWeather,
  getGeoLocation
} from "@/api/weather";
import {
  IArrayLocation,
  ICurrentWeather,
  IForecast
} from "@/interfaces/weather";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentWeather } from "@/stores/weather";
import { RootState } from "@/stores";
import {
  setCurrentLoading,
  unsetCurrentLoading,
  setForecastLoading,
  unsetForecastLoading
} from "@/stores/loading";
import { updateForecastWeather } from "@/stores/forecast";


function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loadingSlice.forecastLoading
  );

  const onclick = () => {
    navigate("/search-history");
  };

  const onSearch = async () => {
    try {
      dispatch(setForecastLoading());
      dispatch(setCurrentLoading());
      const res = await getGeoLocation(inputValue);
      const localData: IArrayLocation = res.data;
      if (localData.length <= 0) {
        throw Error("location input not correct");
      }
      const { lon, lat } = localData[0];
      const res1 = await getCurrentWeather(lon, lat);
      const weatherData: ICurrentWeather = res1.data;
      dispatch(updateCurrentWeather(weatherData));
      dispatch(unsetCurrentLoading());
      onForecastSearch(lon, lat);
    } catch (e) {
      console.log("e:", e);
      dispatch(unsetCurrentLoading());
    } finally {
      dispatch(unsetForecastLoading());
    }
  };

  const onForecastSearch = async (lon: number, lat: number) => {
    try {
      const forecastRes = await getForecastWeather(lon, lat);
      const forecastData: IForecast = forecastRes.data;
      dispatch(updateForecastWeather(forecastData));
    } catch (e) {
      throw e;
    }
  };

  return (
    <div className="search-bar-container">
      <img src={locationLogo} className="location-logo" onClick={onclick} />
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        size="large"
      />
      <Button
        type="text"
        icon={<SearchOutlined />}
        onClick={onSearch}
        loading={loading}
      />
    </div>
  );
}

export default SearchBar;
