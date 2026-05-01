import React, { useState } from 'react';
import { Search } from 'lucide-react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim(), year);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg bg-white dark:bg-gray-800"
          />
        </div>
        
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="px-4 py-3 border rounded-lg bg-white dark:bg-gray-800 md:w-40"
        />
        
        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
