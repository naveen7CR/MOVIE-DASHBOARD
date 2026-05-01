import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];
  for (let i = 1; i <= Math.min(totalPages, 10); i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border rounded-lg disabled:opacity-50"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? 'bg-red-600 text-white'
              : 'border hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border rounded-lg disabled:opacity-50"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Pagination;
