import { createSlice } from "@reduxjs/toolkit";

export const localeSlice = createSlice({
  name: "locale",
  initialState: {
    lang: { title: "Türkçe", code: "TR", country: "tr" },
  },
  reducers: {
    setLang: (state, action) => {
      state.lang = action.payload;
    },
  },
});

export const { setLang } = localeSlice.actions;
export default localeSlice.reducer;
