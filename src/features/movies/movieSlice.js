import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = createAsyncThunk(
  'movies/search',
  async ({ searchTerm, year, page }) => {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: searchTerm || 'movie',
        y: year || '',
        page: page || 1,
      },
    });
    return response.data;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    totalResults: 0,
    loading: false,
    error: null,
    searchTerm: '',
    year: '',
    sortBy: 'rating',
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    clearMovies: (state) => {
      state.movies = [];
      state.totalResults = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.Response === 'True') {
          state.movies = action.payload.Search || [];
          state.totalResults = parseInt(action.payload.totalResults) || 0;
        } else {
          state.error = action.payload.Error;
          state.movies = [];
          state.totalResults = 0;
        }
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.movies = [];
      });
  },
});

export const { setSearchTerm, setYear, setSortBy, clearMovies } = movieSlice.actions;
export default movieSlice.reducer;
