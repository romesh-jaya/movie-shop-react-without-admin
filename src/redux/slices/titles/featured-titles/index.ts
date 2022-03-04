import { createSlice } from "@reduxjs/toolkit";
import { MovieLibrary } from "../../../../types/MovieLibrary";
import extraReducersFunctions from "./functions";

export interface IFeaturedTitlesState {
  value: MovieLibrary[];
  loading: boolean;
  error: string;
  fetched: boolean;
}

const initialState: IFeaturedTitlesState = {
  value: [],
  loading: true,
  error: "",
  fetched: false,
};

export const featuredTitles = createSlice({
  name: "featuredTitles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducersFunctions(builder);
  },
});

export const featuredTitlesReducer = featuredTitles.reducer;
