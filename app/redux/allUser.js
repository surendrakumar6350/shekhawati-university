import { createSlice } from "@reduxjs/toolkit";

const AlluserSlice = createSlice({
  name: "All user slice",
  initialState: {
    data: [],
  },
  reducers: {
    setAllUsersdetails: (state, action) => {
      state.data = action.payload;
      console.log("data added in slice");
    },
  },
});

export default AlluserSlice.reducer;
export const { setAllUsersdetails } = AlluserSlice.actions;
