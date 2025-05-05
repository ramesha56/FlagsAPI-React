import React from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

function Pagination({ totalPages, currentPage, onPageChange }) {
  const pageNumbers = [];
  const maxButtons = 5;
  const start = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const end = Math.min(totalPages, currentPage + Math.floor(maxButtons / 2));

  if (start > 1) pageNumbers.push(1);
  if (start > 2) pageNumbers.push('...');

  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  if (end < totalPages - 1) pageNumbers.push('...');
  if (end < totalPages) pageNumbers.push(totalPages);

  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        <FaArrowLeft />
      </button>

      {pageNumbers.map((num, index) => (
        <button
          key={index}
          onClick={() => typeof num === 'number' && onPageChange(num)}
          style={{ backgroundColor: currentPage === num ? '#a5d6a7' : '' }}
        >
          {num}
        </button>
      ))}

      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <FaArrowRight />
      </button>
    </div>
  );
}

export default Pagination;
