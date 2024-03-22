import { createSlice } from "@reduxjs/toolkit";

const initialState: { currLoading: boolean, forecastLoading:boolean } = {
  currLoading: false,
  forecastLoading: false

};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setCurrentLoading: (state) => {
      state.currLoading = true;
    },
    unsetCurrentLoading: (state) => {
      state.currLoading = false;
    },
    setForecastLoading: (state) => {
      state.forecastLoading = true;
    },
    unsetForecastLoading: (state) => {
      state.forecastLoading = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setCurrentLoading, unsetCurrentLoading, setForecastLoading, unsetForecastLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
