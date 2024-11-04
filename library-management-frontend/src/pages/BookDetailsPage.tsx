import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Button, Alert, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItemText, ListItemButton } from '@mui/material';
import { useBookContext } from '@/hooks/useBookContext';
import { useUserContext } from '@/hooks/useUserContext';
import { borrowBook } from '@/services/api';

const BookDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bookDetails, loadBookDetails, error } = useBookContext();
  const { users, loadUsers } = useUserContext();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      loadBookDetails(Number(id));
    }
    loadUsers();
  }, [id, loadBookDetails, loadUsers]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
  };

  const handleLendBook = async () => {
    if (selectedUserId !== null) {
      try {
        await borrowBook(selectedUserId, Number(id));
        alert('Book lent successfully');
        loadBookDetails(Number(id));
        handleCloseDialog();
      } catch (error) {
        alert('Failed to lend the book. Please try again later.');
      }
    } else {
      alert('Please select a user to lend the book.');
    }
  };

  return (
    <Paper elevation={3} className="p-8 bg-gradient-to-r from-blue-100 to-blue-50 shadow-md rounded-lg">
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <Typography variant="h4" className="text-center text-3xl font-bold mb-6 text-blue-600">
        Book Details
      </Typography>
      {bookDetails ? (
        <div className="space-y-4">
          <Typography variant="h6" className="flex gap-2 text-xl font-semibold text-gray-800">
            Name: <span className="text-blue-500">{bookDetails.name}</span>
          </Typography>
          <Typography variant="body1" className="flex gap-2 text-lg text-gray-700">
            Current Owner: <span className="text-blue-500">{bookDetails.currentOwner?.name ?? "None"}</span>
          </Typography>
          <Typography variant="body1" className="flex gap-2 text-lg text-gray-700">
            Average Rating:
            <span className="text-green-600">
              {bookDetails.score === -1 ? "No rated yet" : bookDetails.score?.toFixed(2)}
            </span>
          </Typography>
          <Button variant="contained" color="warning" onClick={handleOpenDialog}>
            Lend Book
          </Button>
        </div>
      ) : (
        <Typography className="text-center text-lg text-red-500">Loading...</Typography>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            backgroundColor: '#f0f4f8',
            borderRadius: '10px',
            padding: '16px',
          },
        }}
      >
        <DialogTitle>Select a User</DialogTitle>
        <DialogContent dividers style={{ maxHeight: '300px', overflowY: 'auto' }}>
          <List>
            {users.map((user) => (
              <ListItemButton key={user.id} onClick={() => handleUserSelect(user.id)} selected={selectedUserId === user.id}>
                <ListItemText primary={user.name} />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="error">
            Cancel
          </Button>
          <Button onClick={handleLendBook} color="success" disabled={!selectedUserId}>
            Confirm Lend
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default BookDetailsPage;
