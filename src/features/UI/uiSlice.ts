import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSidebarVisible: boolean;
}

const uiSlice = createSlice({
  name: "UI",
  initialState: {
    isSidebarVisible: false,
  } as UIState,
  reducers: {
    setIsSidebarVisible: (state, action: PayloadAction<boolean>) => {
      state.isSidebarVisible = action.payload;
    },
  },
});

export const { setIsSidebarVisible } = uiSlice.actions;
export default uiSlice.reducer;
