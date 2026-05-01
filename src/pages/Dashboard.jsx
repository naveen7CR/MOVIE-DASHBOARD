import React from 'react';
import { useSelector } from 'react-redux';
import RatingChart from '../components/RatingChart';
import MovieCard from '../components/MovieCard';
import { Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeFromWatchlist } from '../features/watchlist/watchlistSlice';

function Dashboard() {
  const watchlist = useSelector((state) => state.watchlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Analytics Dashboard</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
        <RatingChart />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Watchlist ({watchlist.length})</h2>
        
        {watchlist.length === 0 ? (
          <div className="text-center py-12">Your watchlist is empty. Add movies from the search page!</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {watchlist.map((movie) => (
              <div key={movie.imdbID} className="relative group">
                <MovieCard movie={movie} />
                <button
                  onClick={() => dispatch(removeFromWatchlist(movie.imdbID))}
                  className="absolute top-2 right-2 p-1 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
