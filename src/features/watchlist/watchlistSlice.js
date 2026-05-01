import { createSlice } from '@reduxjs/toolkit';

const loadWatchlist = () => {
  const saved = localStorage.getItem('watchlist');
  return saved ? JSON.parse(saved) : [];
};

const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    items: loadWatchlist(),
  },
  reducers: {
    addToWatchlist: (state, action) => {
      const exists = state.items.find(movie => movie.imdbID === action.payload.imdbID);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('watchlist', JSON.stringify(state.items));
      }
    },
    removeFromWatchlist: (state, action) => {
      state.items = state.items.filter(movie => movie.imdbID !== action.payload);
      localStorage.setItem('watchlist', JSON.stringify(state.items));
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
