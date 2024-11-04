import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, List, ListItem, ListItemText, Alert, Button, TextField } from '@mui/material';
import { BorrowRecordDTO } from '@/interfaces/User';
import { useUserContext } from '@/hooks/useUserContext';
import { returnBook } from '@/services/api';

const UserDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { userDetails, loadUserDetails, error } = useUserContext();
  const [returnScores, setReturnScores] = useState<{ [bookId: number]: number | '' }>({});

  useEffect(() => {
    if (id) {
      loadUserDetails(Number(id));
    }
  }, [id, loadUserDetails]);

  const handleScoreChange = (bookId: number, score: number | '') => {
    setReturnScores((prev) => ({ ...prev, [bookId]: score }));
  };

  const handleReturnBook = async (bookId: number) => {
    const score = returnScores[bookId];
    if (score === '' || score < 0 || score > 5) {
      alert('Please enter a valid score between 0 and 5.');
      return;
    }
    try {
      await returnBook(Number(id), bookId, score);
      loadUserDetails(Number(id));
      alert('Book returned successfully');
      setReturnScores((prev) => ({ ...prev, [bookId]: '' }));
    } catch (error) {
      alert('Failed to return the book. Please try again later.');
    }
  };

  return (
    <Paper elevation={3} className="p-8 bg-gradient-to-r from-purple-50 to-purple-100 shadow-md rounded-lg">
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <Typography variant="h4" className="text-center text-3xl font-bold mb-6 text-purple-600">
        User Details
      </Typography>
      {userDetails ? (
        <div className="space-y-6">
          <Typography variant="h6" className="text-xl font-semibold text-gray-800">
            Name: <span className="text-purple-500">{userDetails.user.name}</span>
          </Typography>
          <div>
            <Typography variant="h6" className="text-lg font-semibold text-gray-700">Currently Borrowed Books:</Typography>
            <List className="bg-white rounded-md shadow-md mt-2">
              {userDetails.books.current.map((book: BorrowRecordDTO) => (
                <ListItem key={book.id} className="border-b last:border-b-0 border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <ListItemText primary={book.book?.name ?? 'N/A'} className="text-gray-600 mb-2 sm:mb-0" />
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <TextField
                      type="number"
                      label="Score"
                      variant="outlined"
                      size="small"
                      value={returnScores[book.book?.id ?? 0] ?? ''}
                      onChange={(e) => handleScoreChange(book.book?.id ?? 0, Number(e.target.value))}
                      className="w-20"
                    />
                    <Button variant="outlined" color="secondary" onClick={() => handleReturnBook(book.book?.id ?? 0)}>
                      Return Book
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          </div>
          <div>
            <Typography variant="h6" className="text-lg font-semibold text-gray-700 mt-4">Previously Borrowed Books:</Typography>
            <List className="bg-white rounded-md shadow-md mt-2">
              {userDetails.books.past.map((book: BorrowRecordDTO) => (
                <ListItem key={book.id} className="border-b last:border-b-0 border-gray-200">
                  <ListItemText primary={`${book.book?.name ?? 'N/A'} (Score: ${book.rating ?? 'N/A'})`} className="text-gray-600" />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      ) : (
        <Typography className="text-center mt-4 text-lg text-red-500">Loading...</Typography>
      )}
    </Paper>
  );
};

export default UserDetailsPage;
