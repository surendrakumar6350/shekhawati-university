import { createSlice } from "@reduxjs/toolkit";

const Slicee = createSlice({
  name: "first slice",
  initialState: {
    data: "",
  },
  reducers: {
    addduserdetails: (state, action) => {
      state.data = action.payload;
      console.log("data added in slice");
    },
  },
});

export default Slicee.reducer;
export const { addduserdetails } = Slicee.actions;
