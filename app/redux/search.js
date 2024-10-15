import { createSlice } from "@reduxjs/toolkit";


const Search = createSlice({
  name: "SearchSlice",
  initialState: {
    data: [],
  },
  reducers: {
    changeSearch: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default Search.reducer;
export const { changeSearch } = Search.actions;
