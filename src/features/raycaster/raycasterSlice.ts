import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RaycasterState {
  intersectedProductID: string | null;
}

const initialState: RaycasterState = {
  intersectedProductID: null,
};

const raycasterSlice = createSlice({
  name: "raycaster",
  initialState,
  reducers: {
    setIntersectedProductID: (state, action: PayloadAction<string | null>) => {
      state.intersectedProductID = action.payload;
    },
  },
});

export const { setIntersectedProductID } = raycasterSlice.actions;
export default raycasterSlice.reducer;
