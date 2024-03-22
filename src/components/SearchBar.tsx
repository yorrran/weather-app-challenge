import "../styles/searchbar.less";
import { Button, Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
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
import { createSearchParams, useSearchParams } from "react-router-dom";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(
    (state: RootState) => state.loadingSlice.forecastLoading
  );
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParam] = useSearchParams();
  const location = searchParam.get("location");
  const routeLocation = useLocation();
  const url = routeLocation.pathname;

  useEffect(() => {
    if (location) {
      setInputValue(location);
      onCurrWeatherSearch(location);
    }
  }, [location]);

  const onclick = () => {
    navigate("/search-history");
  };

  const onSearch = async () => {
    if (!inputValue) {
      messageApi.open({
        type: "error",
        content: "Please select location"
      });
      return;
    }
    if (url !== "/home" && !!inputValue) {
      navigate({
        pathname: "/home",
        search: createSearchParams({
          location: inputValue
        }).toString()
      });
    }
    onCurrWeatherSearch(inputValue);
  };

  const onCurrWeatherSearch = async (inputValue: String) => {
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
      await onForecastSearch(lon, lat);
    } catch (e: any) {
      console.log("e:", e);
      messageApi.open({
        type: "error",
        content: e.toString()
      });
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
    <>
      {contextHolder}
      <div className="search-bar-container">
        <img
          src={locationLogo}
          className="location-logo"
          onClick={onclick}
          alt="location-logo"
        />
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          size="large"
          disabled={true}
        />
        <Button
          type="text"
          icon={<SearchOutlined />}
          onClick={onSearch}
          loading={loading}
        />
      </div>
    </>
  );
}

export default SearchBar;
