import React, { useEffect } from 'react';
import { useBookContext } from '../hooks/useBookContext';
import CardGrid from '@/components/CardGrid';
import { Typography } from '@mui/material';
import { BookDTO } from '@/interfaces/Book';

const BooksPage: React.FC = () => {
  const { books, error } = useBookContext();

  useEffect(() => {
    if (error) {
      console.error('Error loading books:', error);
    }
  }, [error]);

  return (
    <CardGrid
      items={books}
      title="Books"
      linkPath={(book: BookDTO) => `/books/${book.id}`}
      renderItemContent={(book) => (
        <>
          <Typography variant="h6" className="font-bold text-gray-800 mb-2">
            {book.name}
          </Typography>
          <Typography variant="body2" className="text-gray-600 mb-4">
            ID: {book.id}
          </Typography>
        </>
      )}
      error={error}
    />
  );
};

export default BooksPage;
