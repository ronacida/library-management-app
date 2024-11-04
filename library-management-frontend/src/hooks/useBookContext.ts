import { useContext, useState } from 'react';
import { BookContext } from '../contexts/BookContext';

export const useBookContext = () => {
  const context = useContext(BookContext);
  const [error, setError] = useState<string | null>(null);

  if (!context) {
    throw new Error('useBookContext must be used within a BookProvider');
  }

  return { ...context, error, setError };
};
