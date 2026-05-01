import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../features/movies/movieSlice';
import watchlistReducer from '../features/watchlist/watchlistSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    watchlist: watchlistReducer,
  },
});
