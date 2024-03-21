import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: { loading: boolean } = {
  loading: false
};

export const loadingSlice = createSlice({
  name: "loadingSlice",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    unSetLoading: (state) => {
      state.loading = false;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setLoading, unSetLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
