import { createSlice } from "@reduxjs/toolkit";

const Slicee = createSlice({
  name: "first slice",
  initialState: {
    data: "",
  },
  reducers: {
    addduserdetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default Slicee.reducer;
export const { addduserdetails } = Slicee.actions;
