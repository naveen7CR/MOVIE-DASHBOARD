import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, setSearchTerm, setYear, setSortBy } from '../features/movies/movieSlice';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';

function Home() {
  const dispatch = useDispatch();
  const { movies, totalResults, loading, error, searchTerm, year, sortBy } = useSelector(
    (state) => state.movies
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(searchMovies({ searchTerm: searchTerm || 'marvel', year, page: currentPage }));
  }, [dispatch, searchTerm, year, currentPage]);

  const handleSearch = (term, yr) => {
    dispatch(setSearchTerm(term));
    dispatch(setYear(yr));
    setCurrentPage(1);
  };

  const getSortedMovies = () => {
    if (!movies.length) return [];
    const sorted = [...movies];
    if (sortBy === 'title') {
      return sorted.sort((a, b) => a.Title.localeCompare(b.Title));
    } else if (sortBy === 'year') {
      return sorted.sort((a, b) => b.Year.localeCompare(a.Year));
    }
    return sorted;
  };

  const sortedMovies = getSortedMovies();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} />
        <div className="text-center py-12 text-red-600">
          Error: {error}. Please check your API key or try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar onSearch={handleSearch} />
      
      <div className="mb-6 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800"
        >
          <option value="rating">Sort by Rating</option>
          <option value="title">Sort by Title</option>
          <option value="year">Sort by Year</option>
        </select>
      </div>

      {movies.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No movies found. Try searching for something else!
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
          {totalResults > 10 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / 10)}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Home;
