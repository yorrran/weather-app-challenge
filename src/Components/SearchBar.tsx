import "../styles/searchbar.less";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router";
import locationLogo from "../assets/location.svg";
import { getCurrentWeather, getGeoLocation } from "@/api/weather";
import { IArrayLocation, ICurrentWeather } from "@/interfaces/weather";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentWeather } from "@/stores/weather";
import { RootState } from "@/stores";
import { setLoading, unSetLoading } from "@/stores/loading";

function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.loadingSlice.loading);

  const onclick = () => {
    navigate("/search-history");
  };

  const onSearch = async () => {
    try {
      dispatch(setLoading());
      const res = await getGeoLocation(inputValue);
      const localData: IArrayLocation = res.data;
      if (localData.length <= 0) {
        throw Error("location input not correct");
      }
      const { lon, lat } = localData[0];
      const res1 = await getCurrentWeather(lon, lat);
      const weatherData: ICurrentWeather = res1.data;
      dispatch(updateCurrentWeather(weatherData));
      dispatch(unSetLoading());
    } catch (e) {
      console.log("e:", e);
      dispatch(unSetLoading());
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
