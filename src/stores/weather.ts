import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICurrentWeather } from "@/interfaces/weather";

const initialState: ICurrentWeather = {
  main: { temp: undefined, humidity: 0 },
  wind: { speed: 0, deg: 0 },
  visibility: 0,
  weather: [],
  dt_txt: ""
};

export const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState,
  reducers: {
    updateCurrentWeather: (state, action: PayloadAction<ICurrentWeather>) => {
      state.main = { ...action.payload.main };
      state.wind = { ...action.payload.wind };
      state.visibility = action.payload.visibility;
      state.weather = JSON.parse(JSON.stringify(action.payload.weather));
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateCurrentWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
