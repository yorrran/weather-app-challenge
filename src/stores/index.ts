import { configureStore } from '@reduxjs/toolkit'
import weather from './weather'
import loading from './loading'

export const store = configureStore({
  reducer: {
    weatherSlice:  weather,
    loadingSlice: loading
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch