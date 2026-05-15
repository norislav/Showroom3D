import { createSlice } from "@reduxjs/toolkit";
import decorationsData from "./decorations.json";

interface DecorationState {
  decorations: typeof decorationsData;
}

const initialState: DecorationState = {
  decorations: decorationsData,
};

const decorationSlice = createSlice({
  name: "decoration",
  initialState,
  reducers: {},
});

export default decorationSlice.reducer;
