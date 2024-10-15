import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "User slice",
  initialState: {
    data: {
        name: "",
        picture: "Loading",
        success: null,
      },
  },
  reducers: {
    setUserdetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUserdetails } = userSlice.actions;
