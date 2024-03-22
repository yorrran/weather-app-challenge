import { configureStore } from "@reduxjs/toolkit";
import weather from "./weather";
import loading from "./loading";
import forecast from "./forecast";

export const store = configureStore({
  reducer: {
    weatherSlice: weather,
    loadingSlice: loading,
    forecastSlice: forecast
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
