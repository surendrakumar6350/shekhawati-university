import { createSlice } from "@reduxjs/toolkit";

const AlluserSlice = createSlice({
  name: "All user slice",
  initialState: {
    data: [],
  },
  reducers: {
    setAllUsersdetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default AlluserSlice.reducer;
export const { setAllUsersdetails } = AlluserSlice.actions;
