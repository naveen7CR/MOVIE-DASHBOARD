import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWatchlist, removeFromWatchlist } from '../features/watchlist/watchlistSlice';
import { Star, BookmarkPlus, BookmarkCheck } from 'lucide-react';

function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const watchlist = useSelector((state) => state.watchlist.items);
  const isInWatchlist = watchlist.some(m => m.imdbID === movie.imdbID);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
        alt={movie.Title}
        className="w-full h-64 object-cover"
      />
      
      <div className="p-4">
        <h3 className="font-semibold truncate">{movie.Title}</h3>
        <p className="text-sm text-gray-500 mt-1">{movie.Year}</p>
        
        <button
          onClick={() =>
            isInWatchlist
              ? dispatch(removeFromWatchlist(movie.imdbID))
              : dispatch(addToWatchlist(movie))
          }
          className="mt-3 w-full py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 flex items-center justify-center gap-2 text-sm"
        >
          {isInWatchlist ? (
            <><BookmarkCheck className="w-4 h-4" /> In Watchlist</>
          ) : (
            <><BookmarkPlus className="w-4 h-4" /> Add to Watchlist</>
          )}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
