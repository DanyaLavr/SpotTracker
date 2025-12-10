import { createSlice } from "@reduxjs/toolkit";
import { FINDER } from "./constants";
import { fetchSuggestions } from "./operations";

const finderSlice = createSlice({
  name: "finder",
  initialState: FINDER,
  reducers: {
    handleChangeQuery: {
      reducer(state, action) {
        state.query = action.payload;
      },
    },
    resetQuery: {
      reducer(state) {
        state.query = "";
      },
    },
    resetSuggestions: {
      reducer(state) {
        state.suggestions = [];
      },
    },
  },
});
export const { handleChangeQuery, resetQuery, resetSuggestions } =
  finderSlice.actions;
export const finderReducer = finderSlice.reducer;
