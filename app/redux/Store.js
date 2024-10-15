import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";
import userSlice from "./allSlice"
import AlluserSlice from "./allUser"
import Search from "./search"

export const Store = configureStore({
  reducer: {
    Slice: Slice,
    userSlice: userSlice,
    AlluserSlice: AlluserSlice,
    Search: Search
  },
});
