// playerSlice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
}

const playerInitialState: PlayerState = {
  position: { x: 0, y: 5, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
};

const playerSlice = createSlice({
  name: "player",
  initialState: playerInitialState,
  reducers: {
    setPosition: (
      state,
      action: PayloadAction<{ x: number; y: number; z: number }>,
    ) => {
      state.position = action.payload;
    },
    setRotation: (
      state,
      action: PayloadAction<{ x: number; y: number; z: number }>,
    ) => {
      state.rotation = action.payload;
    },
  },
});

export const { setPosition, setRotation } = playerSlice.actions;

export default playerSlice.reducer;
