import { createSlice } from "@reduxjs/toolkit";
import { getLanguages, translateText } from "../actions/translateAction";

const initialState = {
  isLoading: true,
  isError: false,
  languages: [],
  isTextLoading: false,
  isTextError: false,
  answer: "",
};

export const translateSlice = createSlice({
  name: "translate",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLanguages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getLanguages.fulfilled, (state, actions) => {
      state.isLoading = false;
      state.isError = false;
      state.languages = actions.payload;
    });
    builder.addCase(getLanguages.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(translateText.pending, (state) => {
      state.isTextLoading = true;
    });
    builder.addCase(translateText.fulfilled, (state, action) => {
      state.isTextLoading = false;
      state.isTextError = false;
      state.answer = action.payload;
    });
    builder.addCase(translateText.rejected, (state) => {
      state.isTextLoading = false;
      state.isTextError = true;
    });
  },
  reducers: {
    clearAnswer: (state) => {
      state.answer = " ";
    },
  },
});
export const { clearAnswer } = translateSlice.actions;
