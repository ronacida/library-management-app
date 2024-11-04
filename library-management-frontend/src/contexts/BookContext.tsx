// contexts/BookContext.tsx
import React, { createContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { BookDTO } from '@/interfaces/Book';
import { fetchBooks, fetchBookDetails, ApiError } from '@/services/api';

interface BookContextType {
  books: BookDTO[];
  bookDetails: BookDTO | null;
  loadBooks: () => Promise<void>;
  loadBookDetails: (id: number) => Promise<void>;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<BookDTO[]>([]);
  const [bookDetails, setBookDetails] = useState<BookDTO | null>(null);

  const loadBooks = useCallback(async () => {
    try {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error loading books: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, []);

  const loadBookDetails = useCallback(async (id: number) => {
    try {
      const details = await fetchBookDetails(id);
      setBookDetails(details);
    } catch (error) {
      if (error instanceof ApiError) {
        console.error(`Error loading book details: ${error.message}`);
      } else {
        console.error('Unexpected error:', error);
      }
    }
  }, []);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const contextValue = useMemo(
    () => ({
      books,
      bookDetails,
      loadBooks,
      loadBookDetails,
    }),
    [books, bookDetails, loadBooks, loadBookDetails]
  );

  return <BookContext.Provider value={contextValue}>{children}</BookContext.Provider>;
};
