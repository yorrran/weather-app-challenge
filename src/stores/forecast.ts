import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IForecast } from "@/interfaces/weather";

const initialState: IForecast = { list: [] };

export const forecastSlice = createSlice({
  name: "forecastSlice",
  initialState,
  reducers: {
    updateForecastWeather: (state, action: PayloadAction<IForecast>) => {
      state.list = JSON.parse(JSON.stringify(action.payload.list));
    }
  }
});

// Action creators are generated for each case reducer function
export const { updateForecastWeather } = forecastSlice.actions;

export default forecastSlice.reducer;
